import { NextResponse } from 'next/server';
import pdfBuilder from '../utils/pdfBuilder';

export async function handleGetRequest(request) {
    const { searchParams } = new URL(request.url);
    const clientSignatureUrl = searchParams.get('clientSignatureUrl');
    const ownerSignatureUrl = searchParams.get('ownerSignatureUrl');

    if (!clientSignatureUrl || !ownerSignatureUrl) {
        return NextResponse.json({ error: 'Faltan las URLs de las firmas.' }, { status: 400 });
    }

    try {
        // Configurar la respuesta para enviar un PDF como archivo adjunto
        const pdfStream = await pdfBuilder(clientSignatureUrl, ownerSignatureUrl);

        return new NextResponse(pdfStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="contrato.pdf"',
            },
        });

    } catch (error) {
        console.error('Error generando el PDF:', error);
        return NextResponse.json({ error: 'Error generando el PDF.' }, { status: 500 });
    }
}