import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function newBillBuilder(data) {
  try {
    // Armamos el objeto de datos de la factura a partir del objeto recibido
    const paymentData = {
      id: data.id,
      clienteName: data.clienteName,
      clienteDni: data.clienteDni,
      clienteAddress: data.clienteAddress,
      clienteCity: data.clienteCity,
      clientePhone: data.clientePhone,
      clienteEmail: data.clienteEmail,
      room: data.room,
      roomCode: data.roomCode,
      gender: data.gender,
      invoiceNumber: data.invoiceNumber,
      invoicePeriod: data.invoicePeriod,
      details: data.details,
      totalAmount: data.totalAmount,
      taxPercentage: 21, // IVA en porcentaje
    };

    // Cálculos básicos
    const subtotal =
      paymentData.totalAmount / (1 + paymentData.taxPercentage / 100);
    const taxAmount = paymentData.totalAmount - subtotal;
    const totalPagos = paymentData.details.reduce(
      (sum, detail) => sum + detail.amount,
      0
    );

    // Crear el documento PDF
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let page = pdfDoc.addPage([595, 842]); // Tamaño A4

    const { width, height } = page.getSize();
    const margin = 50;
    const logoX = margin;
    const logoY = height - margin - 50;

    // Cargar y embebir el logo
    const logoPath = path.resolve(
      process.cwd(),
      "public/documents/logo_pdf.png"
    );
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoWidth = 100; // Ajustar ancho del logo
    const logoHeight = (logoImage.height / logoImage.width) * logoWidth;

    // Dibujar el logo
    page.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });

    // Fecha en la parte superior derecha
    const headerInfoX = width - margin;
    const todayDate = new Date().toLocaleDateString("es-ES");
    page.drawText(`Fecha: ${todayDate}`, {
      x: headerInfoX - 150,
      y: logoY + 30,
      size: 10,
      font,
    });

    // Definir posiciones para cada sección de información
    const clientInfoX = margin;
    const middleInfoX = width / 2 - 60;
    const invoiceInfoX = width - margin - 110;

    // Datos del cliente (izquierda)
    const clientInfoYStart = height - margin - 100;
    let currentYPosition = drawTextWithWrap(
      page,
      `Cliente: ${paymentData.clienteName}`,
      clientInfoX,
      clientInfoYStart,
      middleInfoX - clientInfoX - 20,
      boldFont,
      10,
      margin
    );
    currentYPosition -= 15;
    page.drawText(`DNI: ${paymentData.clienteDni}`, {
      x: clientInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });
    currentYPosition -= 15;
    page.drawText(`Dirección: ${paymentData.clienteAddress}`, {
      x: clientInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });
    currentYPosition -= 15;
    page.drawText(`${paymentData.clienteCity}`, {
      x: clientInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });
    currentYPosition -= 15;
    page.drawText(`Teléfono: ${paymentData.clientePhone}`, {
      x: clientInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });
    currentYPosition -= 15;
    page.drawText(`Correo: ${paymentData.clienteEmail}`, {
      x: clientInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });

    // Datos intermedios (centro)
    currentYPosition = drawTextWithWrap(
      page,
      `Habitación: ${paymentData.room}`,
      middleInfoX,
      clientInfoYStart,
      invoiceInfoX - middleInfoX - 20,
      boldFont,
      10,
      margin
    );
    currentYPosition -= 15;
    page.drawText(`Código: ${paymentData.roomCode}`, {
      x: middleInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });
    currentYPosition -= 15;
    page.drawText(`Sexo: Alquiler ${paymentData.gender}`, {
      x: middleInfoX,
      y: currentYPosition,
      size: 10,
      font,
    });

    // Datos de la factura (derecha)
    page.drawText(`Factura: ${paymentData.invoiceNumber}`, {
      x: invoiceInfoX,
      y: clientInfoYStart,
      size: 10,
      font: boldFont,
    });
    page.drawText(`Fecha:`, {
      x: invoiceInfoX,
      y: clientInfoYStart - 15,
      size: 10,
      font,
    });
    page.drawText(`${paymentData.invoicePeriod}`, {
      x: invoiceInfoX,
      y: clientInfoYStart - 30,
      size: 10,
      font,
    });

    // Línea horizontal divisoria
    const lineY = currentYPosition - 80;
    page.drawLine({
      start: { x: margin, y: lineY },
      end: { x: width - margin, y: lineY },
      thickness: 1,
      color: rgb(0.75, 0.75, 0.75),
    });

    // Tabla de detalles
    // Se definen 4 columnas: Código, Fecha, Descripción y Monto
    const detailsStartY = lineY - 40;
    const rowHeight = 35;
    const paddingVertical = 3;
    const headers = ["Código", "Fecha", "Descripción", "Importe"];
    const availableWidth = width - margin * 2;
    // Distribución de anchos: Código: 80, Fecha: 80, Descripción: 215, Monto: lo restante
    const headerWidths = [80, 80, 215, availableWidth - (80 + 80 + 215)];

    let currentRowY = detailsStartY;

    // Dibujar encabezados de la tabla
    headers.forEach((header, index) => {
      const headerX =
        margin + headerWidths.slice(0, index).reduce((a, b) => a + b, 0) + 6;
      page.drawText(header, {
        x: headerX,
        y: currentRowY + paddingVertical + 2,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    });

    currentRowY -= rowHeight;
    let isWhiteBackground = true;
    // Dibujar cada fila de detalles
    paymentData.details.forEach((detail) => {
      const bgColor = isWhiteBackground
        ? rgb(1, 1, 1)
        : rgb(0xf2 / 255, 0xf2 / 255, 0xf2 / 255);
      if (currentRowY < margin + rowHeight) {
        page = pdfDoc.addPage([595, 842]);
        currentRowY = height - margin - 30;
      }
      page.drawRectangle({
        x: margin,
        y: currentRowY,
        width: availableWidth,
        height: rowHeight,
        color: bgColor,
        opacity: 1,
      });
      page.drawLine({
        start: { x: margin, y: currentRowY },
        end: { x: width - margin, y: currentRowY },
        thickness: 1,
        color: rgb(0.75, 0.75, 0.75),
      });
      // Columna 1: Código (detail.id)
      let cellX = margin + paddingVertical;
      page.drawText(detail.id.toString(), {
        x: cellX,
        y: currentRowY + rowHeight / 2 - 6,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        align: "left",
      });
      // Columna 2: Fecha
      cellX += headerWidths[0];
      page.drawText(new Date(detail.date).toLocaleDateString("es-ES"), {
        x: cellX + paddingVertical,
        y: currentRowY + rowHeight / 2 - 6,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        align: "left",
      });
      // Columna 3: Descripción
      cellX += headerWidths[1];
      page.drawText(detail.description || "", {
        x: cellX + paddingVertical,
        y: currentRowY + rowHeight / 2 - 6,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        align: "left",
      });
      // Columna 4: Monto
      cellX += headerWidths[2];
      page.drawText(`€ ${detail.amount.toFixed(2).toString()}`, {
        x: cellX + paddingVertical,
        y: currentRowY + rowHeight / 2 - 6,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        align: "left",
      });
      currentRowY -= rowHeight;
      isWhiteBackground = !isWhiteBackground;
    });

    currentRowY -= rowHeight;
    page.drawText("Total de pagos efectuados", {
      x: width - margin - 170,
      y: currentRowY + 40,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    currentRowY -= paddingVertical;
    const estimatedCharWidth = 5;
    const totalLabelWidth =
      "Total de pagos efectuados".length * estimatedCharWidth;
    const totalValueWidth =
      totalPagos.toFixed(2).toString().length * estimatedCharWidth;
    const totalLineWidth = Math.max(totalLabelWidth, totalValueWidth);
    page.drawLine({
      start: { x: width - margin - totalLineWidth * 1.4, y: currentRowY + 35 },
      end: { x: width - margin, y: currentRowY + 35 },
      thickness: 1,
      color: rgb(0.75, 0.75, 0.75),
    });
    currentRowY -= paddingVertical;
    page.drawText("Total: " + totalPagos.toFixed(2).toString(), {
      x: width - margin - 170,
      y: currentRowY + 25,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    currentRowY -= paddingVertical;
    page.drawLine({
      start: { x: width - margin - totalLineWidth * 1.4, y: currentRowY + 20 },
      end: { x: width - margin, y: currentRowY + 20 },
      thickness: 1,
      color: rgb(0.75, 0.75, 0.75),
    });
    currentRowY -= paddingVertical;
    const pdfBytes = await pdfDoc.save();
    const pdfStream = Buffer.from(pdfBytes);
    if (data.returnBytes) {
      return pdfBytes;
    }
    return pdfStream;
  } catch (error) {
    console.log(error);
    return new Error("Error al generar el PDF");
  }
}

// Función para dibujar texto con ajuste de línea
function drawTextWithWrap(page, text, x, y, maxWidth, font, size, margin) {
  if (!text || typeof text !== "string") return y;
  const words = text.split(" ");
  let line = "";
  let lineHeight = size * 1.2;
  for (const word of words) {
    const testLine = line + word + " ";
    const testWidth = font.widthOfTextAtSize(testLine.trim(), size);
    if (testWidth > maxWidth && line) {
      page.drawText(line.trim(), { x, y, size, font });
      line = word + " ";
      y -= lineHeight;
      if (y < margin) break;
    } else {
      line = testLine;
    }
  }
  if (line) {
    page.drawText(line.trim(), { x, y, size, font });
  }
  return y;
}
