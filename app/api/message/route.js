import { createMessage } from "./controller/createMessageControlles";
import { getAllMessages, getMessageByChat } from "./controller/getMessageController";
import { markMessageAsRead } from "./controller/updateMessage";

export async function POST(req) {
    const data = await req.json();
    const result = await createMessage(data);
    return result;
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");
    const userId = searchParams.get("userId");
    if (chatId) {
        const result = await getMessageByChat(chatId);
        return result;
    }
    const result = await getAllMessages();
    return result;
}

export async function PATCH(req) {
    const data = await req.json();
    const result = await markMessageAsRead(data);
    return result;
}
