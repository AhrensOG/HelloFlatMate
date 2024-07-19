import PDFDocument from 'pdfkit';
import axios from 'axios';
import contractPremiun from './premiunContract';

export default async function pdfBuilder(clientSignatureUrl, ownerSignatureUrl) {
    return new Promise(async (resolve, reject) => {
        const doc = new PDFDocument();
        let buffers = [];

        // Recopilar los datos del PDF en un búfer
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        try {
            // Descargar las imágenes desde las URLs proporcionadas y obtenerlas como buffers
            const [clientSignatureResponse, ownerSignatureResponse] = await Promise.all([
                axios.get(clientSignatureUrl, { responseType: 'arraybuffer' }),
                axios.get(ownerSignatureUrl, { responseType: 'arraybuffer' })
            ]);

            const clientSignatureBuffer = Buffer.from(clientSignatureResponse.data, 'binary');
            const ownerSignatureBuffer = Buffer.from(ownerSignatureResponse.data, 'binary');

            // Añadir el contenido del contrato
            doc.fontSize(12).text('Contrato de Ejemplo', { align: 'center' });
            doc.moveDown();
            doc.text(contractPremiun, {
                align: 'justify'
            });

            // Tamaño de la página
            const pageWidth = doc.page.width;
            const margin = 50; // Margen desde el borde de la página

            // Tamaño de las firmas
            const signatureWidth = 200; // Ancho de las imágenes de las firmas
            const signatureHeight = 100; // Altura de las imágenes de las firmas
            const yPosition = doc.page.height - margin - signatureHeight; // Posición vertical para el texto

            // Firma del Cliente (izquierda)
            const clientSignatureX = margin;
            doc.image(clientSignatureBuffer, clientSignatureX, yPosition - signatureHeight, { width: signatureWidth });
            doc.text('Firma del Cliente', clientSignatureX + 40, yPosition, { align: 'left' });

            // Firma del Dueño (derecha)
            const ownerSignatureX = pageWidth - margin - signatureWidth;
            doc.image(ownerSignatureBuffer, ownerSignatureX, yPosition - signatureHeight, { width: signatureWidth });
            doc.text('Firma del Dueño', ownerSignatureX + 20, yPosition, { align: 'right' });

        } catch (error) {
            console.error('Error descargando las imágenes:', error);
            doc.text('Error descargando las imágenes', 100, 100);
        }

        doc.end();
    });
}
