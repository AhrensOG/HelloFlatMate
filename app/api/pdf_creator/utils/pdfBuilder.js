import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";

export default async function pdfBuilder(
  clientSignatureUrl,
  ownerSignatureUrl,
  contractText,
  hfmData,
  userData
) {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let page = pdfDoc.addPage();

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

    const signatureWidth = 130;
    const signatureHeight = 65;
    const { width, height } = page.getSize();
    const margin = 50;
    let yPosition = height - margin - 10;
    const maxWidth = width - 2 * margin;
    const fontSize = 9;

    const lineHeight = fontSize * 1.1;

    const emptyLineSpacing = fontSize * 0.8;

    const signatureSectionHeight = signatureHeight + 70;

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

    const addSignaturesAndUserDataToPage = () => {
      page.drawImage(clientSignatureImage, {
        x: margin,
        y: margin + 60,
        width: signatureWidth,
        height: signatureHeight,
      });
      page.drawText("Firma ARRENDATARIA", {
        x: margin + 10,
        y: margin + 40,
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
      if (userData) {
        let yData = margin + 20;
        if (userData.IP) {
          page.drawText(`IP: ${userData.IP}`, {
            x: margin,
            y: yData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yData -= lineHeight;
        }
        if (userData.device) {
          page.drawText(`Dispositivo: ${userData.device}`, {
            x: margin,
            y: yData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yData -= lineHeight;
        }
        if (userData.browserName && userData.browserVersion) {
          page.drawText(
            `Navegador: ${userData.browserName} ${userData.browserVersion}`,
            {
              x: margin,
              y: yData,
              size: fontSize,
              font: font,
              color: rgb(0, 0, 0),
            }
          );
          yData -= lineHeight;
        }
        if (userData.OS) {
          page.drawText(`SO: ${userData.OS}`, {
            x: margin,
            y: yData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
        }
      }
      if (hfmData) {
        let yData = margin + 20;
        const xDataRight = width - margin - signatureWidth;
        if (hfmData.IP) {
          page.drawText(`IP: ${hfmData.IP}`, {
            x: xDataRight,
            y: yData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yData -= lineHeight;
        }
        if (hfmData.device) {
          page.drawText(`Dispositivo: ${hfmData.device}`, {
            x: xDataRight,
            y: yData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yData -= lineHeight;
        }
        if (hfmData.browserName && hfmData.browserVersion) {
          page.drawText(
            `Navegador: ${hfmData.browserName} ${hfmData.browserVersion}`,
            {
              x: xDataRight,
              y: yData,
              size: fontSize,
              font: font,
              color: rgb(0, 0, 0),
            }
          );
          yData -= lineHeight;
        }
        if (hfmData.OS) {
          page.drawText(`SO: ${hfmData.OS}`, {
            x: xDataRight,
            y: yData,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
        }
      }
    };

    const lines = contractText.split("\n");

    for (const line of lines) {
      if (line.trim() === "") {
        if (yPosition < margin + emptyLineSpacing + signatureSectionHeight) {
          addSignaturesAndUserDataToPage();
          page = pdfDoc.addPage();
          yPosition = page.getHeight() - margin - 20;
        }
        yPosition -= emptyLineSpacing;
        continue;
      }

      let isTitle = line.startsWith("#");
      let isListItem = line.startsWith("-");
      let currentFont = isTitle ? boldFont : font;
      let currentFontSize = isTitle ? fontSize + 2 : fontSize;
      let text = isListItem
        ? `• ${line.slice(1).trim()}`
        : line.replace("#", "").trim();

      const wrappedLines = splitTextIntoLines(
        text,
        maxWidth,
        currentFontSize,
        currentFont
      );

      wrappedLines.forEach((wrappedLine, index) => {
        const isLastLineOfParagraph = index === wrappedLines.length - 1;

        if (yPosition < margin + lineHeight + signatureSectionHeight) {
          addSignaturesAndUserDataToPage();
          page = pdfDoc.addPage();
          yPosition = page.getHeight() - margin - 20;
        }

        if (isTitle || isListItem || isLastLineOfParagraph) {
          page.drawText(wrappedLine, {
            x: margin,
            y: yPosition,
            size: currentFontSize,
            font: currentFont,
            color: rgb(0, 0, 0),
          });
        } else {
          const words = wrappedLine.split(" ");
          const numWords = words.length;
          const numGaps = numWords - 1;

          if (numGaps <= 0) {
            page.drawText(wrappedLine, {
              x: margin,
              y: yPosition,
              size: currentFontSize,
              font: currentFont,
              color: rgb(0, 0, 0),
            });
          } else {
            let totalWordWidth = 0;
            words.forEach((word) => {
              totalWordWidth += currentFont.widthOfTextAtSize(
                word,
                currentFontSize
              );
            });

            const remainingSpace = maxWidth - totalWordWidth;
            const spacePerGap = remainingSpace / numGaps;

            let currentX = margin;
            words.forEach((word) => {
              page.drawText(word, {
                x: currentX,
                y: yPosition,
                size: currentFontSize,
                font: currentFont,
                color: rgb(0, 0, 0),
              });
              currentX +=
                currentFont.widthOfTextAtSize(word, currentFontSize) +
                spacePerGap;
            });
          }
        }

        yPosition -= lineHeight;
      });

      if (isTitle) {
        yPosition -= lineHeight * 0.5;
      }
    }

    addSignaturesAndUserDataToPage();

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    throw new Error("Error generando el PDF.");
  }
}
