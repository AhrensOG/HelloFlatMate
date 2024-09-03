import { createDocument } from "./controller/createDocumentController";
import { getAllDocuments, getDocumentById, getDocumentsByType, getDocumentsByUser } from "./controller/getDocumentController";
import { updateDocument, updateStateDocument } from "./controller/updateDocumentController";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id) {
        return await getDocumentById(id)
    }
    return await getAllDocuments()
}

export async function PATCH(req) {
    const data = await req.json()
    const result = updateStateDocument(data)
    return result
}