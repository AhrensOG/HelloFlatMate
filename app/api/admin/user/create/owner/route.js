import { createOwner } from "../../controllers/createOwnerController";

export async function POST(req) {
    const data = await req.json();
    const result = await createOwner(data);
    return result;
}
