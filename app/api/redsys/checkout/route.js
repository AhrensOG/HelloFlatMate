"use server";
import { NextResponse } from "next/server";
import { createMerchantSignature, encodeBase64 } from "./utils/functions";


// Ajusta a tu caso real:
const {
  MERCHANT_CODE,
  MERCHANT_TERMINAL,
  MERCHANT_KEY_BASE64,
  CURRENCY,
  URL_TPV_TEST,
  MERCHANT_URL,
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
      DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_BASE_URL}${paymentMetaData.merchanUrlOK}`, // Retorno OK
      DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_BASE_URL}${paymentMetaData.merchanUrlKO}`, // Retorno KO
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
