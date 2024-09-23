import { cloneProperty } from "../controller/createPropertyController";

export async function POST(req) {
    const data = await req.json();
    return await cloneProperty(data);
}