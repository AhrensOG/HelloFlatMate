import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function billBuilder(data) {
    try {
        // Datos estáticos para la factura
        const paymentData = {
            id: data.id,
            location: "Bogota, Colombia",
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
            companyName: "Biils",
            companyAddress: "Avenida Real 456",
            companyPhone: "+34 987 654 321",
            details: data.details,
            totalAmount: data.totalAmount,
            taxPercentage: 21, // IVA en porcentaje
        };

        const subtotal = paymentData.totalAmount / (1 + paymentData.taxPercentage / 100);
        const taxAmount = paymentData.totalAmount - subtotal;

        // Calcular el total de pagos efectuados
        const totalPagos = paymentData.details.reduce((sum, detail) => sum + detail.amount, 0);

        // Crear documento PDF
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        let page = pdfDoc.addPage([595, 842]); // Tamaño A4 (ancho x alto)

        // Ajustes básicos
        const { width, height } = page.getSize();
        const margin = 50; // Espacio para el logo a la izquierda
        const logoX = margin;
        const logoY = height - margin - 50;

        // Cargar y embebir el logo
        const logoPath = path.resolve(process.cwd(), "public/documents/logo_pdf.png");
        const logoBytes = fs.readFileSync(logoPath);
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoWidth = 100; // Ajustar ancho
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth; // Mantener proporción

        // Dibujar logo
        page.drawImage(logoImage, { x: logoX, y: logoY, width: logoWidth, height: logoHeight });

        // Fecha arriba a la derecha
        const headerInfoX = width - margin;
        const todayDate = new Date().toLocaleDateString("es-ES"); // dd/mm/aaaa
        page.drawText(`Fecha: ${todayDate}`, { x: headerInfoX - 150, y: logoY + 30, size: 10, font });

        // Definir posiciones X para las tres columnas
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

        currentYPosition -= 15; // Espacio para DNI
        page.drawText(`DNI: ${paymentData.clienteDni}`, { x: clientInfoX, y: currentYPosition, size: 10, font });

        currentYPosition -= 15; // Espacio para dirección
        page.drawText(`Dirección: ${paymentData.clienteAddress}`, { x: clientInfoX, y: currentYPosition, size: 10, font });

        currentYPosition -= 15; // Espacio para ciudad
        page.drawText(`${paymentData.clienteCity}`, { x: clientInfoX, y: currentYPosition, size: 10, font });

        currentYPosition -= 15; // Espacio para teléfono
        page.drawText(`Teléfono: ${paymentData.clientePhone}`, { x: clientInfoX, y: currentYPosition, size: 10, font });

        currentYPosition -= 15; // Espacio para correo
        page.drawText(`Correo: ${paymentData.clienteEmail}`, { x: clientInfoX, y: currentYPosition, size: 10, font });

        // Datos intermedios (en el centro)

        currentYPosition = drawTextWithWrap(
            page,
            `Habitación : ${paymentData.room}`,
            middleInfoX,
            clientInfoYStart,
            invoiceInfoX - middleInfoX - 20,
            boldFont,
            10,
            margin
        );

        currentYPosition -= 15; // Espacio para el código de habitación
        page.drawText(`Código : ${paymentData.roomCode}`, { x: middleInfoX, y: currentYPosition, size: 10, font });

        currentYPosition -= 15; // Espacio para el sexo
        page.drawText(`Sexo : Alquiler ${paymentData.gender}`, { x: middleInfoX, y: currentYPosition, size: 10, font });

        // Datos de la factura (derecha)
        page.drawText(`Factura : ${paymentData.invoiceNumber}`, { x: invoiceInfoX, y: clientInfoYStart, size: 10, font: boldFont });

        // Ajuste para la fecha en dos líneas
        page.drawText(`Fecha :`, { x: invoiceInfoX, y: clientInfoYStart - 15, size: 10, font });
        page.drawText(`${paymentData.invoicePeriod}`, { x: invoiceInfoX, y: clientInfoYStart - 30, size: 10, font });

        // Línea horizontal divisoria
        const lineY = currentYPosition - 80; // Ajustar la posición de la línea horizontal
        page.drawLine({ start: { x: margin, y: lineY }, end: { x: width - margin, y: lineY }, thickness: 1, color: rgb(0.75, 0.75, 0.75) });

        // Tabla de detalles
        const detailsStartY = lineY - 40;
        const rowHeight = 35;
        const paddingVertical = 8;

        // Encabezados de la tabla
        const headers = ["Código", "Fecha", "Pagos", "Subtotal"];
        const headerWidths = [130, 160, 140, 125];
        let currentRowY = detailsStartY;

        headers.forEach((header, index) => {
            page.drawText(header, {
                x: margin + headerWidths.slice(0, index).reduce((a, b) => a + b, 0) + 6,
                y: currentRowY + paddingVertical + 2,
                size: 10,
                font: boldFont,
                color: rgb(0, 0, 0),
                align: "center",
            });
        });

        currentRowY -= rowHeight;

        let isWhiteBackground = true;

        paymentData.details.forEach((detail) => {
            let color = isWhiteBackground ? rgb(1, 1, 1) : rgb(0xf2 / 255, 0xf2 / 255, 0xf2 / 255);

            if (currentRowY < margin + rowHeight) {
                page = pdfDoc.addPage([595, 842]);
                currentRowY = height - margin - 30;
            }

            page.drawRectangle({ x: margin, y: currentRowY, width: width - margin * 2, height: rowHeight, color, opacity: 1 });

            page.drawLine({
                start: { x: margin, y: currentRowY },
                end: { x: width - margin, y: currentRowY },
                thickness: 1,
                color: rgb(0.75, 0.75, 0.75),
            });

            page.drawText(detail.id.toString(), {
                x: margin + paddingVertical,
                y: currentRowY + rowHeight / 2 - 6,
                size: 12,
                font,
                color: rgb(0, 0, 0),
                align: "center",
            });
            page.drawText(new Date(detail.date).toLocaleDateString("es-ES"), {
                x: margin + headerWidths[0] + paddingVertical,
                y: currentRowY + rowHeight / 2 - 6,
                size: 12,
                font,
                color: rgb(0, 0, 0),
                align: "center",
            });
            page.drawText(detail.status === "APPROVED" ? "Confirmado" : "N/A", {
                x: margin + headerWidths[0] + headerWidths[1] + paddingVertical,
                y: currentRowY + rowHeight / 2 - 6,
                size: 12,
                font,
                color: rgb(0, 0, 0),
                align: "center",
            });
            page.drawText(detail.amount.toFixed(2).toString(), {
                x: margin + headerWidths[0] + headerWidths[1] + headerWidths[2] + paddingVertical,
                y: currentRowY + rowHeight / 2 - 6,
                size: 12,
                font,
                color: rgb(0, 0, 0),
                align: "center",
            });

            currentRowY -= rowHeight;
            isWhiteBackground = !isWhiteBackground;
        });

        currentRowY -= rowHeight;

        page.drawText("Total de pagos efectuados:", {
            x: width - margin - 170,
            y: currentRowY + 40,
            size: 10,
            font: boldFont,
            color: rgb(0, 0, 0),
            align: "right",
        });
        currentRowY -= paddingVertical;

        const estimatedCharWidth = 5;
        const totalLabelWidth = "Total de pagos efectuados:".length * estimatedCharWidth;
        const totalValueWidth = totalPagos.toFixed(2).toString().length * estimatedCharWidth;
        const totalLineWidth = Math.max(totalLabelWidth, totalValueWidth);

        page.drawLine({
            start: { x: width - margin - totalLineWidth * 1.4, y: currentRowY + 35 },
            end: { x: width - margin, y: currentRowY + 35 },
            thickness: 1,
            color: rgb(0.75, 0.75, 0.75),
        });

        currentRowY -= paddingVertical;

        page.drawText("Total:" + totalPagos.toFixed(2).toString(), {
            x: width - margin - 170,
            y: currentRowY + 25,
            size: 10,
            font: boldFont,
            color: rgb(0, 0, 0),
            align: "right",
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
            return pdfBytes
        }
        return pdfStream;
    } catch (error) {
        console.log(error);
        return new Error("Error al generar el PDF");
    }
}

// Función para dibujar texto con ajuste de línea
function drawTextWithWrap(page, text, x, y, maxWidth, font, size, margin) {
    if (!text || typeof text !== "string") return y; // Verificar si el texto es válido

    const words = text.split(" ");
    let line = "";
    let lineHeight = size * 1.2; // Ajustar altura de línea según sea necesario

    for (const word of words) {
        const testLine = line + word + " ";
        const testWidth = font.widthOfTextAtSize(testLine.trim(), size);

        if (testWidth > maxWidth && line) {
            page.drawText(line.trim(), { x, y, size, font });
            line = word + " "; // Comienza una nueva línea con la palabra actual
            y -= lineHeight; // Mueve hacia abajo para la siguiente línea

            if (y < margin) break; // Evitar que se dibuje fuera del margen inferior
        } else {
            line = testLine; // Continúa agregando palabras a la línea actual
        }
    }
    if (line) {
        page.drawText(line.trim(), { x, y, size, font });
    }
    return y; // Retornar nueva posición Y después de dibujar el texto
}
