import { createMessage } from "./controller/createMessageControlles";
import { getAllMessages } from "./controller/getMessageController";

export async function POST(req) {
    const data = await req.json();
    const result = await createMessage(data)
    return result
}

export async function GET() {
    const result = await getAllMessages()
    return result
}