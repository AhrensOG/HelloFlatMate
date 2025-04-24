import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase/config";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function POST(request) {
  try {
    const {
      originalPdfUrl,
      ownerSignature,
      hfmSignature,
      ownerFdoData,
      hfmFdoData,
      startDate,
      endDate,
    } = await request.json();

    if (
      !originalPdfUrl ||
      !ownerSignature ||
      !hfmSignature ||
      !ownerFdoData ||
      !hfmFdoData ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        { error: "Faltan datos requeridos." },
        { status: 400 }
      );
    }

    // Obtener datos del navegador, IP, etc.
    const userAgentString = request.headers.get("user-agent");
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0]
      : request.headers.get("x-real-ip") ||
        request.socket?.remoteAddress ||
        "IP no disponible";

    const parser = new UAParser();
    const result = parser.setUA(userAgentString).getResult();

    const userData = {
      IP: clientIp,
      device: result.device.type || false,
      browserName: result.browser.name || false,
      browserVersion: result.browser.version || false,
      OS: result.os.name || false,
    };

    // Descargar PDF y firmas
    const [pdfRes, ownerSigRes, hfmSigRes] = await Promise.all([
      axios.get(originalPdfUrl, { responseType: "arraybuffer" }),
      axios.get(ownerSignature, { responseType: "arraybuffer" }),
      axios.get(hfmSignature, { responseType: "arraybuffer" }),
    ]);

    const pdfDoc = await PDFDocument.load(pdfRes.data);
    const ownerSigImg = await pdfDoc.embedPng(ownerSigRes.data);
    const hfmSigImg = await pdfDoc.embedPng(hfmSigRes.data);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const signatureWidth = 120;
    const signatureHeight = 60;
    const marginX = 50;
    const baseY = 90;

    const pages = pdfDoc.getPages();

    for (const page of pages) {
      const { width } = page.getSize();

      page.drawText("EL PROPIETARIO", {
        x: marginX,
        y: baseY + 110,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      page.drawText("EL INTERMEDIARIO", {
        x: width - marginX - 160,
        y: baseY + 110,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      page.drawText("HELLO FLATMATE, S.L.", {
        x: width - marginX - 160,
        y: baseY + 95,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawImage(ownerSigImg, {
        x: marginX,
        y: baseY + 25,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawImage(hfmSigImg, {
        x: width - marginX - signatureWidth,
        y: baseY + 25,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText(`Fdo:   ${ownerFdoData}`, {
        x: marginX,
        y: baseY,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Fdo: ${hfmFdoData}`, {
        x: width - marginX - 180,
        y: baseY,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText("Administrador", {
        x: width - marginX - 130,
        y: baseY - 12,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });

      // Datos técnicos
      let y = baseY - 30;
      if (userData.IP) {
        page.drawText(`IP: ${userData.IP}`, { x: marginX, y, size: 9, font });
        y -= 12;
      }
      if (userData.device) {
        page.drawText(`Dispositivo: ${userData.device}`, {
          x: marginX,
          y,
          size: 9,
          font,
        });
        y -= 12;
      }
      if (userData.browserName && userData.browserVersion) {
        page.drawText(
          `Navegador: ${userData.browserName} ${userData.browserVersion}`,
          { x: marginX, y, size: 9, font }
        );
        y -= 12;
      }
      if (userData.OS) {
        page.drawText(`SO: ${userData.OS}`, { x: marginX, y, size: 9, font });
      }
    }

    // Guardar PDF firmado
    const signedPdfBytes = await pdfDoc.save();
    const signedPdfBuffer = Buffer.from(signedPdfBytes);
    const timestamp = Date.now();

    const folderPath = `Contratos_Propietarios/${ownerFdoData}/${startDate}-${endDate}`;
    const fileRef = ref(
      storage,
      `${folderPath}/${ownerFdoData}_${timestamp}.pdf`
    );

    await uploadBytes(fileRef, signedPdfBuffer, {
      contentType: "application/pdf",
    });

    const signedUrl = await getDownloadURL(fileRef);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generando contrato firmado:", error);
    return NextResponse.json(
      { error: "Error generando contrato firmado." },
      { status: 500 }
    );
  }
}
