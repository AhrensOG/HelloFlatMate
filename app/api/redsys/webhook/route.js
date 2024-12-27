import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { processReservation } from "./utils/reservationFunctions";
import { processMonthlyPayment } from "./utils/monthlyFunctions";

const { MERCHANT_KEY_BASE64, HFM_MAIL } = process.env;

// 🚀 1️⃣ Capturar parámetros de Redsys
export async function POST(request) {
  console.log("✅ Iniciando Webhook de Redsys");

  const formData = await request.formData();
  const version = formData.get("Ds_SignatureVersion");
  const params = formData.get("Ds_MerchantParameters");
  let signatureReceived = formData.get("Ds_Signature");

  if (!params || !signatureReceived) {
    console.error("❌ Faltan parámetros necesarios");
    return NextResponse.json(
      { error: "Faltan parámetros necesarios" },
      { status: 400 }
    );
  }

  signatureReceived = signatureReceived.replace(/ /g, "+");
  console.log("✅ Parámetros recibidos correctamente");
  console.log("🔹 Ds_SignatureVersion:", version);
  console.log("🔹 Ds_MerchantParameters:", params);

  // 🚀 2️⃣ Decodificar Ds_MerchantParameters
  let decodedParamsJSON;
  try {
    const decodedParamsString = Buffer.from(params, "base64").toString("utf-8");
    console.log("✅ Ds_MerchantParameters decodificado:", decodedParamsString);
    decodedParamsJSON = JSON.parse(decodedParamsString);
  } catch (error) {
    console.error(
      "❌ Error al decodificar Ds_MerchantParameters:",
      error.message
    );
    return NextResponse.json(
      { error: "Error al decodificar Ds_MerchantParameters" },
      { status: 400 }
    );
  }

  // 🚀 3️⃣ Validar la firma (HMAC-SHA256)
  let signatureCalculated;
  try {
    const order = decodedParamsJSON.Ds_Order || "";
    const cipher = CryptoJS.TripleDES.encrypt(
      CryptoJS.enc.Utf8.parse(order),
      CryptoJS.enc.Base64.parse(MERCHANT_KEY_BASE64),
      {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
        iv: CryptoJS.enc.Utf8.parse("\0\0\0\0\0\0\0\0"),
      }
    );

    const keyOrderEncrypted = cipher.ciphertext.toString(CryptoJS.enc.Base64);

    signatureCalculated = CryptoJS.HmacSHA256(
      params,
      CryptoJS.enc.Base64.parse(keyOrderEncrypted)
    );
    signatureCalculated = CryptoJS.enc.Base64.stringify(signatureCalculated);

    signatureReceived = signatureReceived
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(signatureReceived.length % 4, "=");

    if (signatureCalculated !== signatureReceived) {
      throw new Error("Firma no válida");
    }

    console.log("✅ Firma válida");
  } catch (error) {
    console.error("❌ Error en la validación de la firma:", error.message);
    return NextResponse.json({ error: "Firma no válida" }, { status: 400 });
  }

  // 🚀 4️⃣ Procesar Ds_MerchantData
  console.log(`✅ Before to read Ds_MerchantData`);

  if (!decodedParamsJSON.Ds_MerchantData) {
    console.error("❌ Ds_MerchantData is missing in the decodedParams.");
    return NextResponse.json(
      { error: "Ds_MerchantData is missing" },
      { status: 400 }
    );
  }

  console.log("✅ Ds_MerchantData exists:", decodedParamsJSON.Ds_MerchantData);

  let merchantDataString;
  try {
    let merchantData = decodedParamsJSON.Ds_MerchantData;

    // Decodificar posibles entidades HTML
    merchantData = decodeURIComponent(merchantData);
    merchantData = merchantData.replace(/&#(\d+);/g, (_, dec) =>
      String.fromCharCode(dec)
    );
    console.log("✅ Decoded Ds_MerchantData (HTML Entities):", merchantData);

    // Intentar parsear directamente como JSON
    try {
      merchantDataString = JSON.parse(merchantData);
      console.log("✅ Parsed Metadata as JSON:", merchantDataString);
    } catch (jsonError) {
      console.log("🔄 Not valid JSON, trying Base64 decoding...");

      // Si falla, intentar como Base64
      const base64Decoded = Buffer.from(merchantData, "base64").toString(
        "utf-8"
      );
      console.log("✅ Base64 Decoded Ds_MerchantData:", base64Decoded);

      merchantDataString = JSON.parse(base64Decoded);
      console.log("✅ Parsed Base64 Metadata as JSON:", merchantDataString);
    }
  } catch (error) {
    console.error("❌ Error parsing Ds_MerchantData JSON:", error.message);
    console.error("❌ Invalid JSON String:", merchantDataString);
    return NextResponse.json(
      { error: "Error parsing Ds_MerchantData JSON" },
      { status: 400 }
    );
  }

  // 🚀 5️⃣ Revisar estado del pago
  const dsResponseCode = parseInt(decodedParamsJSON.Ds_Response, 10);
  if (dsResponseCode < 0 || dsResponseCode > 99) {
    console.log(`❌ Pago denegado. Ds_Response: ${dsResponseCode}`);
    return NextResponse.json({ message: "Pago denegado" }, { status: 200 });
  }

  console.log("✅ Pago aprobado:", dsResponseCode);

  const {
    order,
    paymentType,
    roomId,
    leaseOrderId,
    supplyId,
    category,
    userEmail,
    price,
    paymentableType,
    paymentableId,
    clientId,
    leaseOrderType,
    quotaNumber,
    amount,
    month,
    propertySerial,
  } = merchantDataString;

  // 🚀 6️⃣ Responder con éxito
  switch (paymentType) {
    case "reservation":
      return await processReservation({
        leaseOrderId,
        roomId,
        userEmail,
        price,
        order,
        HFM_MAIL,
      });
    case "monthly":
      return await processMonthlyPayment({
        paymentableId,
        leaseOrderId,
        paymentableType,
        clientId,
        amount,
        quotaNumber,
        month,
        order,
        HFM_MAIL,
      });
    default:
      console.log(`Tipo de pago desconocido: ${paymentType}`);
  }
}
