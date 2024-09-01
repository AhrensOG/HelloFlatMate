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

export async function POST(req) {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const data = await req.json()

    if (type === "get") {
        if (data.type) {
            return await getDocumentsByType(data)
        }

        return await getDocumentsByUser(data)
    }

    const newDocument = await createDocument(data)
    return newDocument
}

export async function PUT(req) {
    const data = await req.json()
    const result = await updateDocument(data)
    return result
}

export async function PATCH(req) {
    const data = await req.json()
    const result = updateStateDocument(data)
    return result
}