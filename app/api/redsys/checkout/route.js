"use server";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

/**
 * 1) Decodifica clave Base64 -> WordArray para crypto-js
 */
function decodeBase64(base64String) {
  return CryptoJS.enc.Base64.parse(base64String);
}

/**
 * 2) Codifica string UTF8 -> Base64 (para Ds_MerchantParameters)
 */
function encodeBase64(utf8String) {
  const wordArray = CryptoJS.enc.Utf8.parse(utf8String);
  return CryptoJS.enc.Base64.stringify(wordArray);
}

/**
 * 3) Función para "diversificar" la clave con 3DES (CBC, IV=0)
 *    - Se cifra el 'order' con la clave decodificada.
 *    - Retorna el resultado en formato WordArray (listo para HMAC).
 */
function diversifyKey3DES(decodedKey, order) {
  // IV de 8 bytes en 0
  const iv = CryptoJS.lib.WordArray.create([0, 0], 2); // 2 palabras * 4 bytes = 8 bytes

  // Encriptar con 3DES modo CBC, sin padding (o ZeroPadding)
  // *OJO*: Redsys usa 3DES con "padding=0" => ZeroPadding
  //        (También puede funcionar PKCS7, pero lo habitual es ZeroPadding).
  const encrypted = CryptoJS.TripleDES.encrypt(order, decodedKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  // Obtenemos la parte en crudo (ciphertext en base64)
  const encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

  // Lo convertimos a WordArray para usarlo en el HMAC
  return CryptoJS.enc.Base64.parse(encryptedBase64);
}

/**
 * 4) Crear firma:
 *    1. Decodificar la clave base64
 *    2. Cifrar con 3DES el Ds_Order
 *    3. HMAC-SHA256 con Ds_MerchantParameters
 *    4. Codificar en Base64
 */
function createMerchantSignature(
  merchantKeyBase64,
  order,
  merchantParamsBase64
) {
  // 1) Decodifica la clave
  const decodedKey = decodeBase64(merchantKeyBase64);

  // 2) Diversificar clave con 3DES (usando 'order')
  const keyOrderEncrypted = diversifyKey3DES(decodedKey, order);

  // 3) Calcular HMAC-SHA256 sobre el merchantParamsBase64
  //    (Atención: 'merchantParamsBase64' es un string, la clave es WordArray)
  const hmac = CryptoJS.HmacSHA256(merchantParamsBase64, keyOrderEncrypted);

  // 4) Codificar en base64 la firma
  return CryptoJS.enc.Base64.stringify(hmac);
}

// ----------------------------------------------------------------------------------
// A PARTIR DE AQUÍ, el endpoint que devuelve:
//   Ds_SignatureVersion, Ds_MerchantParameters y Ds_Signature
// ----------------------------------------------------------------------------------

// Ajusta a tu caso real:
const {
  MERCHANT_CODE,
  MERCHANT_TERMINAL,
  MERCHANT_KEY_BASE64,
  CURRENCY,
  URL_TPV_TEST,
  MERCHANT_URL,
  URL_OK,
  URL_KO,
  TRANSACTIONTYPE,
} = process.env;

export async function POST(request) {
  try {
    // 1) Leemos el body (o podrías harcodear datos de prueba):
    const { amount, order, paymentMetaData } = await request.json();

    // 2) Montar objeto Ds_MerchantParameters
    const merchantParamsObject = {
      DS_MERCHANT_AMOUNT: String(amount),
      DS_MERCHANT_ORDER: order,
      DS_MERCHANT_MERCHANTCODE: MERCHANT_CODE,
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TERMINAL: MERCHANT_TERMINAL,
      DS_MERCHANT_TRANSACTIONTYPE: TRANSACTIONTYPE,
      DS_MERCHANT_MERCHANTURL: MERCHANT_URL, // Webhook
      DS_MERCHANT_URLOK: URL_OK, // Retorno OK
      DS_MERCHANT_URLKO: URL_KO, // Retorno KO
      DS_MERCHANT_MERCHANTDATA: paymentMetaData, // METADATA 
      DS_MERCHANT_MERCHANTNAME: paymentMetaData.merchantName,
      DS_MERCHANT_PRODUCTDESCRIPTION: paymentMetaData.merchantDescription,
    };

    // 3) Convertir a JSON y codificar en Base64 (paso previo a la firma)
    const merchantParamsJson = JSON.stringify(merchantParamsObject);
    const merchantParamsBase64 = encodeBase64(merchantParamsJson);

    // 4) Crear firma con la clave (pasos 1,2,3,4 descritos)
    const signature = createMerchantSignature(
      MERCHANT_KEY_BASE64,
      order,
      merchantParamsBase64
    );

    // 5) Devolverlo al front (o al que invoque este endpoint):
    //    - Ds_SignatureVersion (fijo: "HMAC_SHA256_V1")
    //    - Ds_MerchantParameters (en base64)
    //    - Ds_Signature (firma calculada en base64)
    //    - redsysUrl (la URL del TPV)
    return NextResponse.json({
      Ds_SignatureVersion: "HMAC_SHA256_V1",
      Ds_MerchantParameters: merchantParamsBase64,
      Ds_Signature: signature,
      redsysUrl: URL_TPV_TEST,
    });
  } catch (err) {
    console.error("Error generando firma Redsys:", err);
    return NextResponse.json(
      { error: "Error generando firma" },
      { status: 500 }
    );
  }
}
