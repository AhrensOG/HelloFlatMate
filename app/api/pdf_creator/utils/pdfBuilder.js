import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios';
import contractPremiun from './premiunContract';

export default async function pdfBuilder(clientSignatureUrl, ownerSignatureUrl) {
    try {
        // Crear un nuevo documento PDF
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        let page = pdfDoc.addPage();

        // Descargar las imágenes desde las URLs proporcionadas y obtenerlas como buffers
        const [clientSignatureResponse, ownerSignatureResponse] = await Promise.all([
            axios.get(clientSignatureUrl, { responseType: 'arraybuffer' }),
            axios.get(ownerSignatureUrl, { responseType: 'arraybuffer' })
        ]);

        const clientSignatureBuffer = Buffer.from(clientSignatureResponse.data, 'binary');
        const ownerSignatureBuffer = Buffer.from(ownerSignatureResponse.data, 'binary');

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

        // Dividir el contenido del contrato en líneas
        const lines = contractPremiun.split('\n');
        const fontSize = 12;
        const lineHeight = fontSize * 1.2;

        // Función para añadir una nueva página si es necesario
        const addNewPageIfNeeded = () => {
            if (yPosition < margin + lineHeight) {
                page = pdfDoc.addPage();
                yPosition = page.getHeight() - margin - 20;
            }
        };

        // Función para dividir el texto en líneas que se ajusten al ancho máximo
        const splitTextIntoLines = (text, maxWidth, fontSize, font) => {
            const words = text.split(' ');
            let lines = [];
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine + word + ' ';
                const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);

                if (testLineWidth > maxWidth) {
                    lines.push(currentLine.trim());
                    currentLine = word + ' ';
                } else {
                    currentLine = testLine;
                }
            }

            lines.push(currentLine.trim());
            return lines;
        };

        // Añadir el contenido línea por línea
        for (const line of lines) {
            let isTitle = line.startsWith('#'); // Suponiendo que los títulos comienzan con '#'
            let isListItem = line.startsWith('-'); // Suponiendo que los elementos de lista comienzan con '-'
            let currentFont = isTitle ? boldFont : font;
            let currentFontSize = isTitle ? fontSize + 2 : fontSize;
            let text = isListItem ? `• ${line.slice(1).trim()}` : line;

            const wrappedLines = splitTextIntoLines(text, maxWidth, currentFontSize, currentFont);

            for (const wrappedLine of wrappedLines) {
                addNewPageIfNeeded();
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

        // Añadir espacio antes de las firmas
        yPosition -= lineHeight * 3;

        // Verificar si hay suficiente espacio para las firmas en la página actual
        if (yPosition < margin + signatureHeight) {
            page = pdfDoc.addPage();
            yPosition = page.getHeight() - margin - 20;
        }

        // Ajustar las posiciones para firmas
        page.drawImage(clientSignatureImage, {
            x: margin,
            y: yPosition - signatureHeight,
            width: signatureWidth,
            height: signatureHeight,
        });

        page.drawText('Firma del Cliente', {
            x: margin + 40,
            y: yPosition - signatureHeight - 20,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
        });

        page.drawImage(ownerSignatureImage, {
            x: width - margin - signatureWidth,
            y: yPosition - signatureHeight,
            width: signatureWidth,
            height: signatureHeight,
        });

        page.drawText('Firma del Dueño', {
            x: width - margin - signatureWidth + 20,
            y: yPosition - signatureHeight - 20,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    } catch (error) {
        console.error('Error generando el PDF:', error);
        throw new Error('Error generando el PDF.');
    }
}
