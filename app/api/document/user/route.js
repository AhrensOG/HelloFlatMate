import { createOrUpdateUserDocuments } from "./controller/createOrUpdateUserDocuments";
import { getDocumentsByUserId } from "./controller/getDocumentsByUderId";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId");

    return await getDocumentsByUserId(id);
}

export async function POST(req) {
    const data = await req.json();

    return await createOrUpdateUserDocuments(data);
}
