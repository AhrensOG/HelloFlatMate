// app/api/redsys/notification/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";

function base64Decode(b64String) {
  return Buffer.from(b64String, "base64");
}
function base64Encode(data) {
  return Buffer.from(data).toString("base64");
}
function encrypt3DES(keyBuffer, order) {
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede3-cbc", keyBuffer, iv);
  cipher.setAutoPadding(true);

  let encrypted = cipher.update(order, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function createMerchantSignatureNotif(merchantKey, paramsBase64) {
  // 1) Decodificar la clave del módulo de administración
  const decodedKey = base64Decode(merchantKey);

  // 2) Decodificar params para extraer el "Ds_Order"
  const decodedParams = JSON.parse(base64Decode(paramsBase64).toString("utf8"));
  const order = decodedParams.Ds_Order; // Ojo, puede venir como DS_ORDER

  // 3) Diversificar la clave
  const encryptedOrder = encrypt3DES(decodedKey, order);
  const keyOrderEncrypted = base64Decode(encryptedOrder);

  // 4) Crear HMAC-SHA256
  const hmac = crypto.createHmac("sha256", keyOrderEncrypted);
  hmac.update(paramsBase64);

  // 5) Retornar en Base64
  return base64Encode(hmac.digest());
}

const MERCHANT_KEY = "XCw2GO1VDeCP8DAYosBvG/k7+MHYVmo/"; // Tu clave base64

export async function POST(request) {
  try {
    const formData = await request.formData();

    const version = formData.get("Ds_SignatureVersion");
    const params = formData.get("Ds_MerchantParameters");
    const signatureReceived = formData.get("Ds_Signature");

    // 1) Decodificamos para obtener data de notificación
    const decodedParams = JSON.parse(base64Decode(params).toString("utf8"));

    // 2) Calculamos firma con la misma lógica
    const signatureCalculated = createMerchantSignatureNotif(
      MERCHANT_KEY,
      params
    );

    // 3) Importante: en la firma, a veces Redsys reemplaza '+' con '-' o '_'.
    //    Asegúrate de normalizar: firma de Redsys vs firma calculada.
    //    O haz el replace: signatureReceived = signatureReceived.replace(' ', '+');
    //    (Depende si tu servidor recibe la firma con espacios, etc.)
    if (signatureCalculated === signatureReceived) {
      // FIRMA OK
      const dsResponse = decodedParams.Ds_Response; // 0-99 => transacción OK
      // Actualizar en BBDD el resultado, etc.

      console.log("Notificación Redsys OK, Ds_Response:", dsResponse);
      // Redsys obliga a devolver "HTTP 200" si todo está OK
      return NextResponse.json({ message: "Firma OK" });
    } else {
      // FIRMA KO
      console.log("Notificación Redsys firma inválida");
      return NextResponse.json({ error: "Firma KO" }, { status: 400 });
    }
  } catch (err) {
    console.error("Error procesando notificación Redsys:", err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
