import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { NextResponse } from "next/server";

export async function billBuilder() {
    try {
        // Datos estáticos para prueba
        const paymentData = {
            id: "12345",
            location: "Madrid, España",
            clienteName: "Juan Pérez",
            clienteAddress: "Calle Falsa 123",
            clientePhone: "+34 123 456 789",
            companyName: "Mi Empresa S.L.",
            companyAddress: "Avenida Real 456",
            companyPhone: "+34 987 654 321",
            details: [
                { description: "Servicio de limpieza", amount: 50.0 },
                { description: "Reparación eléctrica", amount: 100.0 },
                { description: "Mantenimiento general", amount: 75.0 },
            ],
            totalAmount: 225.0,
            taxPercentage: 21, // IVA en porcentaje
        };

        const subtotal = paymentData.totalAmount / (1 + paymentData.taxPercentage / 100);
        const taxAmount = paymentData.totalAmount - subtotal;

        // Crear documento PDF
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const page = pdfDoc.addPage([595, 842]); // Tamaño A4 (ancho x alto)

        // Ajustes básicos
        const { width, height } = page.getSize();
        const margin = 50;

        // Header
        const logoX = margin;
        const logoY = height - margin - 50;
        const headerInfoX = width - margin;

        // Información del encabezado (derecha)
        page.drawText(`Factura N°: ${paymentData.id}`, {
            x: headerInfoX - 150,
            y: logoY + 30,
            size: 10,
            font: boldFont,
            color: rgb(0, 0, 0),
            align: "right",
        });
        page.drawText(`Fecha: ${new Date().toLocaleDateString()}`, {
            x: headerInfoX - 150,
            y: logoY + 15,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
            align: "right",
        });
        page.drawText(`Lugar: ${paymentData.location}`, {
            x: headerInfoX - 150,
            y: logoY,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
            align: "right",
        });

        // Información del cliente (izquierda)
        const clientInfoY = height - margin - 100;
        page.drawText(`Cliente: ${paymentData.clienteName}`, {
            x: logoX,
            y: clientInfoY,
            size: 10,
            font: boldFont,
        });
        page.drawText(`Dirección: ${paymentData.clienteAddress}`, {
            x: logoX,
            y: clientInfoY - 15,
            size: 10,
            font: font,
        });
        page.drawText(`Teléfono: ${paymentData.clientePhone}`, {
            x: logoX,
            y: clientInfoY - 30,
            size: 10,
            font: font,
        });

        // Información de la empresa (derecha)
        const companyInfoX = headerInfoX - 150;
        page.drawText(`Empresa: ${paymentData.companyName}`, {
            x: companyInfoX,
            y: clientInfoY,
            size: 10,
            font: boldFont,
            align: "right",
        });
        page.drawText(`Dirección: ${paymentData.companyAddress}`, {
            x: companyInfoX,
            y: clientInfoY - 15,
            size: 10,
            font: font,
            align: "right",
        });
        page.drawText(`Teléfono: ${paymentData.companyPhone}`, {
            x: companyInfoX,
            y: clientInfoY - 30,
            size: 10,
            font: font,
            align: "right",
        });

        // Línea horizontal
        page.drawLine({
            start: { x: margin, y: clientInfoY - 50 },
            end: { x: width - margin, y: clientInfoY - 50 },
            thickness: 1,
            color: rgb(0.75, 0.75, 0.75),
        });

        // Tabla de detalles de la factura
        const tableStartY = clientInfoY - 100;
        const column1X = margin;
        const column2X = width - margin;

        page.drawText("Detalles", {
            x: column1X,
            y: tableStartY,
            size: 12,
            font: boldFont,
        });
        page.drawText("Monto", {
            x: column2X - 100,
            y: tableStartY,
            size: 12,
            font: boldFont,
            align: "right",
        });

        let currentY = tableStartY - 20;

        paymentData.details.forEach((detail) => {
            page.drawText(detail.description, {
                x: column1X,
                y: currentY,
                size: 10,
                font: font,
            });
            page.drawText(`$${detail.amount.toFixed(2)}`, {
                x: column2X - 100,
                y: currentY,
                size: 10,
                font: font,
                align: "right",
            });
            currentY -= 15;
        });

        // Línea horizontal antes del total
        page.drawLine({
            start: { x: margin, y: currentY - 10 },
            end: { x: width - margin, y: currentY - 10 },
            thickness: 1,
            color: rgb(0.75, 0.75, 0.75),
        });

        // Subtotal e IVA
        currentY -= 25;
        page.drawText("Subtotal:", {
            x: column2X - 150,
            y: currentY,
            size: 10,
            font: boldFont,
            align: "right",
        });
        page.drawText(`$${subtotal.toFixed(2)}`, {
            x: column2X - 50,
            y: currentY,
            size: 10,
            font: font,
            align: "right",
        });

        currentY -= 15;
        page.drawText(`IVA (${paymentData.taxPercentage}%):`, {
            x: column2X - 150,
            y: currentY,
            size: 10,
            font: boldFont,
            align: "right",
        });
        page.drawText(`$${taxAmount.toFixed(2)}`, {
            x: column2X - 50,
            y: currentY,
            size: 10,
            font: font,
            align: "right",
        });

        // Total resaltado
        currentY -= 25;
        page.drawText("Total:", {
            x: column2X - 150,
            y: currentY,
            size: 12,
            font: boldFont,
            color: rgb(0, 0, 1), // Azul oscuro
            align: "right",
        });
        page.drawText(`$${paymentData.totalAmount.toFixed(2)}`, {
            x: column2X - 50,
            y: currentY,
            size: 12,
            font: boldFont,
            color: rgb(0.1, 0.6, 1), // Celeste claro
            align: "right",
        });

        // Guardar el archivo PDF
        const pdfBytes = await pdfDoc.save();
        const pdfStream = Buffer.from(pdfBytes);

        // Retornar el PDF como respuesta
        return new NextResponse(pdfStream, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=factura_${paymentData.id}.pdf`,
            },
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
