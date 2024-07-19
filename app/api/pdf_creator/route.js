import { handleGetRequest } from "./controller/pdfController";

export async function GET(request) {
    return handleGetRequest(request);
}
