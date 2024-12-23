// app/api/redsys/notification/route.js

import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { createMerchantSignatureNotif, decodeBase64, decodeHtmlEntities } from "./utils/functions";
import { metadata } from "@/app/contacto/page";

const { MERCHANT_KEY_BASE64 } = process.env;

// Este endpoint recibe la notificación POST de Redsys
export async function POST(request) {
  try {
    // 1) Capturar los parámetros que Redsys envía en un POST "form-data"
    const formData = await request.formData();

    const version = formData.get("Ds_SignatureVersion");
    const params = formData.get("Ds_MerchantParameters");
    let signatureReceived = formData.get("Ds_Signature");

    // Por si llegan con "+" cambiados a espacios (depende de la config del servidor)
    if (signatureReceived) {
      signatureReceived = signatureReceived.replace(" ", "+");
    }

    // 2) Decodificamos Ds_MerchantParameters para inspeccionarlo
    const decodedParamsWA = decodeBase64(params);
    const decodedParamsJSON = CryptoJS.enc.Utf8.stringify(decodedParamsWA);
    const decodedParams = JSON.parse(decodedParamsJSON);

    // 3) Calculamos la firma con la misma lógica
    const signatureCalculated = createMerchantSignatureNotif(
      MERCHANT_KEY_BASE64,
      params
    );

    // A veces Redsys hace URL-safe base64 -> reemplaza '+'/'/' con '-'/'_'

    // Normalizas la firma recibida a Base64 "clásico"
    let normalizedSignatureReceived = signatureReceived
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    // Opcional: reponer "=" si es que el URL-safe base64 no trae padding al final
    while (normalizedSignatureReceived.length % 4 !== 0) {
      normalizedSignatureReceived += "=";
    }

    // 4) Comparamos ambas firmas (ojo con mayúsculas/minúsculas, etc.)
    if (signatureCalculated === normalizedSignatureReceived) {
      // FIRMA OK => procesamos la notificación

      const htmlString = decodedParams.Ds_MerchantData;

      // 1) Decodificas entidades
      const unescapedString = decodeHtmlEntities(htmlString);

      // 2) Parseas como JSON
      const metadata = JSON.parse(unescapedString);

      console.log(
        "Notificación Redsys OK. Ds_Response:",
        metadata
      );

      // Retornar HTTP 200, sin más HTML
      return NextResponse.json({ message: "Firma OK" });
    } else {
      // FIRMA KO => Rechazar
      console.log("Notificación Redsys firma inválida");
      return NextResponse.json({ error: "Firma KO" }, { status: 400 });
    }
  } catch (err) {
    console.error("Error procesando notificación Redsys:", err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
