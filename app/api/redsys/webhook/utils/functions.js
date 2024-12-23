import CryptoJS from "crypto-js";

// 1) Helper: decodifica Base64 -> WordArray
function decodeBase64(b64String) {
  return CryptoJS.enc.Base64.parse(b64String);
}

// 2) Helper: codifica WordArray -> Base64
function encodeBase64(wordArray) {
  return CryptoJS.enc.Base64.stringify(wordArray);
}

/**
 * Cifra (encripta) el Ds_Order con 3DES (modo CBC, IV=0, ZeroPadding)
 * Redsys llama a esto "diversificar la clave".
 * Retorna un string en Base64 (la ciphertext).
 */
function encrypt3DES_CBC_ZeroPadding(decodedKey, order) {
  // IV de 8 bytes a 0
  const iv = CryptoJS.lib.WordArray.create([0, 0], 2);
  // [0,0] => 2 "palabras" de 4 bytes = 8 bytes

  // El texto a cifrar (order) lo pasamos a WordArray
  const orderWordArray = CryptoJS.enc.Utf8.parse(order);

  // Encripta con 3DES modo CBC, ZeroPadding
  const encrypted = CryptoJS.TripleDES.encrypt(orderWordArray, decodedKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  // encrypted es un objeto con .ciphertext
  // toString() por default da Base64
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/**
 * Crea la firma de notificación
 * 1) Decodifica la clave base64
 * 2) Lee Ds_Order de Ds_MerchantParameters
 * 3) "Diversifica" la clave cifrando con 3DES(CBC,IV=0,ZeroPadding) el Ds_Order
 * 4) HMAC-SHA256 de Ds_MerchantParameters en Base64, usando la clave resultante
 * 5) Retorna la firma en Base64
 */
function createMerchantSignatureNotif(merchantKeyBase64, merchantParamsBase64) {
  // 1) Decodificar la clave base64
  const decodedKey = decodeBase64(merchantKeyBase64);

  // 2) Decodificar Ds_MerchantParameters Base64 para extraer Ds_Order
  const decodedParamsWA = decodeBase64(merchantParamsBase64);
  const decodedParamsJSON = CryptoJS.enc.Utf8.stringify(decodedParamsWA);
  const decodedParams = JSON.parse(decodedParamsJSON);

  const order = decodedParams.Ds_Order || decodedParams.DS_ORDER || "";

  // 3) Cifrar (diversificar) con 3DES
  const encryptedOrderBase64 = encrypt3DES_CBC_ZeroPadding(decodedKey, order);

  // Convierto ese Base64 (ciphertext) en WordArray para usarlo como "key" del HMAC
  const keyOrderEncryptedWA = decodeBase64(encryptedOrderBase64);

  // 4) HMAC-SHA256( Ds_MerchantParameters en texto Base64 )
  //    => Ojo: el input al HMAC es la string merchantParamsBase64 en UTF8
  const mpWordArray = CryptoJS.enc.Utf8.parse(merchantParamsBase64);
  const hmac = CryptoJS.HmacSHA256(mpWordArray, keyOrderEncryptedWA);

  // 5) Retorno la firma codificada en Base64
  return encodeBase64(hmac);
}

function decodeHtmlEntities(str) {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
}

export {
  decodeBase64,
  encodeBase64,
  encrypt3DES_CBC_ZeroPadding,
  createMerchantSignatureNotif,
  decodeHtmlEntities,
};
