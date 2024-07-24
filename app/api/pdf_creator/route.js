import { handleGetRequest } from "./controller/pdfController";

export async function POST(request) {
    return handleGetRequest(request);
}


//prueba
// http://localhost:3000/api/pdf_creator?clientSignatureUrl=https://upload.wikimedia.org/wikipedia/commons/7/73/Firma_Lic.Len%C3%ADn_Moreno.png&ownerSignatureUrl=https://upload.wikimedia.org/wikipedia/commons/7/73/Firma_Lic.Len%C3%ADn_Moreno.png