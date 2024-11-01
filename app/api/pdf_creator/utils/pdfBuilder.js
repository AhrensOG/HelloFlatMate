import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";

export default async function pdfBuilder(
  clientSignatureUrl,
  ownerSignatureUrl,
  contractText
) {
  try {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let page = pdfDoc.addPage();

    // Descargar las imágenes de las firmas
    const [clientSignatureResponse, ownerSignatureResponse] = await Promise.all(
      [
        axios.get(clientSignatureUrl, { responseType: "arraybuffer" }),
        axios.get(ownerSignatureUrl, { responseType: "arraybuffer" }),
      ]
    );

    const clientSignatureBuffer = Buffer.from(
      clientSignatureResponse.data,
      "binary"
    );
    const ownerSignatureBuffer = Buffer.from(
      ownerSignatureResponse.data,
      "binary"
    );

    const clientSignatureImage = await pdfDoc.embedPng(clientSignatureBuffer);
    const ownerSignatureImage = await pdfDoc.embedPng(ownerSignatureBuffer);

    // Tamaño de las firmas
    const signatureWidth = 200;
    const signatureHeight = 100;

    // Añadir el contenido del contrato
    const { width, height } = page.getSize();
    const margin = 50;
    let yPosition = height - margin - 20;
    const maxWidth = width - 2 * margin; // Ancho máximo del texto
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;

    // Altura necesaria para las firmas
    const signatureSectionHeight = signatureHeight + 40; // Espacio para las firmas y texto de "Firma del Cliente/Dueño"

    // Función para dividir el texto en líneas que se ajusten al ancho máximo
    const splitTextIntoLines = (text, maxWidth, fontSize, font) => {
      const words = text.split(" ");
      let lines = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine + word + " ";
        const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testLineWidth > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine = testLine;
        }
      }

      lines.push(currentLine.trim());
      return lines;
    };

    // Función para añadir las firmas a la página actual
    const addSignaturesToPage = () => {
      page.drawImage(clientSignatureImage, {
        x: margin,
        y: margin,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText("Firma del Cliente", {
        x: margin + 40,
        y: margin - 20,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      page.drawImage(ownerSignatureImage, {
        x: width - margin - signatureWidth,
        y: margin,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText("Firma del Dueño", {
        x: width - margin - signatureWidth + 20,
        y: margin - 20,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    };

    // Añadir el contenido línea por línea, reservando espacio para las firmas
    const lines = contractText.split("\n");

    for (const line of lines) {
      let isTitle = line.startsWith("#"); // Suponiendo que los títulos comienzan con '#'
      let isListItem = line.startsWith("-"); // Suponiendo que los elementos de lista comienzan con '-'
      let currentFont = isTitle ? boldFont : font;
      let currentFontSize = isTitle ? fontSize + 2 : fontSize;
      let text = isListItem ? `• ${line.slice(1).trim()}` : line;

      const wrappedLines = splitTextIntoLines(
        text,
        maxWidth,
        currentFontSize,
        currentFont
      );

      for (const wrappedLine of wrappedLines) {
        // Reservar espacio para las firmas si se está cerca del final de la página
        if (yPosition < margin + lineHeight + signatureSectionHeight) {
          addSignaturesToPage(); // Añadir firmas a la página actual antes de crear una nueva
          page = pdfDoc.addPage();
          yPosition = page.getHeight() - margin - 20;
        }

        page.drawText(wrappedLine, {
          x: margin,
          y: yPosition,
          size: currentFontSize,
          lineHeight: lineHeight,
          font: currentFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }
    }

    // Añadir las firmas a la última página
    addSignaturesToPage();

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    throw new Error("Error generando el PDF.");
  }
}
