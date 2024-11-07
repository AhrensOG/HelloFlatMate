import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";

export default async function pdfBuilder(
  clientSignatureUrl,
  ownerSignatureUrl,
  contractText,
  userData
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
    const signatureWidth = 150;
    const signatureHeight = 75;

    // Añadir el contenido del contrato
    const { width, height } = page.getSize();
    const margin = 50;
    let yPosition = height - margin - 20;
    const maxWidth = width - 2 * margin; // Ancho máximo del texto
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;

    // Altura necesaria para las firmas y datos del usuario
    const signatureSectionHeight = signatureHeight + 100; // Espacio ajustado para firmas y userData

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

    // Función para añadir las firmas y los datos de userData (si existen) a la página actual
    const addSignaturesAndUserDataToPage = () => {
      // Añadir las firmas
      page.drawImage(clientSignatureImage, {
        x: margin,
        y: margin + 60, // Ajustado para dejar más espacio
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText("Firma ARRENDATARIA", {
        x: margin + 40,
        y: margin + 40, // Ajustado para dejar más espacio
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      page.drawImage(ownerSignatureImage, {
        x: width - margin - signatureWidth,
        y: margin + 60,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText("Firma ARRENDADORA", {
        x: width - margin - signatureWidth + 20,
        y: margin + 40,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      // Añadir los datos de userData si existen
      if (userData) {
        let yUserData = margin + 10; // Añadir espacio adicional entre las firmas y los datos

        if (userData.IP) {
          page.drawText(`IP: ${userData.IP}`, {
            x: margin,
            y: yUserData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yUserData -= lineHeight;
        }

        if (userData.device) {
          page.drawText(`Dispositivo: ${userData.device}`, {
            x: margin,
            y: yUserData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yUserData -= lineHeight;
        }

        if (userData.browserName && userData.browserVersion) {
          page.drawText(
            `Navegador: ${userData.browserName} ${userData.browserVersion}`,
            {
              x: margin,
              y: yUserData,
              size: fontSize,
              font: font,
              color: rgb(0, 0, 0),
            }
          );
          yUserData -= lineHeight;
        }

        if (userData.OS) {
          page.drawText(`SO: ${userData.OS}`, {
            x: margin,
            y: yUserData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
        }
      }
    };

    // Añadir el contenido línea por línea, reservando espacio para las firmas y los datos
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
        // Reservar espacio para las firmas y datos si se está cerca del final de la página
        if (yPosition < margin + lineHeight + signatureSectionHeight) {
          addSignaturesAndUserDataToPage(); // Añadir firmas y datos a la página actual antes de crear una nueva
          page = pdfDoc.addPage();
          yPosition = page.getHeight() - margin - 20;
        }

        // Dibujar el texto en la página
        page.drawText(wrappedLine, {
          x: margin,
          y: yPosition,
          size: currentFontSize,
          font: currentFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }
    }

    // Añadir las firmas y los datos de userData a la última página
    addSignaturesAndUserDataToPage();

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    throw new Error("Error generando el PDF.");
  }
}
