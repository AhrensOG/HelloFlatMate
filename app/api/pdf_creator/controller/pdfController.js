import { NextResponse } from "next/server";
import pdfBuilder from "../utils/pdfBuilder";
import createPremiumContract from "../utils/premiunContract";
<<<<<<< HEAD
import { UAParser } from "ua-parser-js";

export async function handleGetRequest(request) {
  const userAgentString = request.headers.get("user-agent");
  const clientIp =
    request.headers.get("x-forwarded-for") || // Cuando hay proxy
    request.headers.get("x-real-ip") || // Otro posible header
    request.connection?.remoteAddress || // Fallback si no hay proxy
    request.ip ||
    "IP no disponible";

  // Utilizar UAParser para obtener los detalles del dispositivo, navegador y sistema operativo
  const parser = new UAParser();
  const result = parser.setUA(userAgentString).getResult();

  const device = result.device.type || false;
  const browserName = result.browser.name || false;
  const browserVersion = result.browser.version || false;
  const os = result.os.name || false;

  const userData = {
    IP: clientIp,
    device: device,
    browserName: browserName,
    browserVersion: browserVersion,
    OS: os,
  };

  // Lógica existente para obtener los valores y generar el PDF
  const { values, clientSignatureUrl, ownerSignatureUrl } =
    await request.json();
  const contractText = createPremiumContract(values);
=======
import helloroomContractTemplate from "../utils/helloroomContractTemplate";

export async function handleGetRequest(request) {
    const { values, clientSignatureUrl, ownerSignatureUrl } = await request.json();
    let contractText;
    if (values.propertyCategory === "HELLO_STUDIO") {
        contractText = createPremiumContract(values);
    }
    if (values.propertyCategory === "HELLO_ROOM") {
        contractText = helloroomContractTemplate(values);
    }
    if (values.propertyCategory === "HELLO_COLIVING") {
        contractText = helloroomContractTemplate(values);
    }
    if (values.propertyCategory === "HELLO_LANDLORD") {
        contractText = helloroomContractTemplate(values);
    }
>>>>>>> 3005cc37b1223a3c4f9dc3417f62b9a7dd76e6ac

    if (!clientSignatureUrl || !ownerSignatureUrl) {
        return NextResponse.json({ error: "Faltan las URLs de las firmas." }, { status: 400 });
    }

<<<<<<< HEAD
  try {
    // Aquí se construye el PDF
    const pdfStream = await pdfBuilder(
      clientSignatureUrl,
      ownerSignatureUrl,
      contractText,
      userData
    );
=======
    try {
        // Configurar la respuesta para enviar un PDF como archivo adjunto
        const pdfStream = await pdfBuilder(clientSignatureUrl, ownerSignatureUrl, contractText);
>>>>>>> 3005cc37b1223a3c4f9dc3417f62b9a7dd76e6ac

        return new NextResponse(pdfStream, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="contrato.pdf"',
            },
        });
    } catch (error) {
        console.error("Error generando el PDF:", error);
        return NextResponse.json({ error: "Error generando el PDF." }, { status: 400 });
    }
}
