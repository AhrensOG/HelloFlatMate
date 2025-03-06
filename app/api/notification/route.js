import { createNotification } from "./controller/createNotification";

export async function POST(req) {
    const data = await req.json();
    return await createNotification(data);
}
