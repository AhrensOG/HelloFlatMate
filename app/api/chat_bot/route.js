import { handlerChatBot } from "./controller/handlerChatBot";

export async function POST(req) {
    const data = await req.json();
    return await handlerChatBot(data);
}
