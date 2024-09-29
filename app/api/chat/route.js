import { NextResponse } from "next/server";
import { createGroupChat, createPrivateChat, createSupportChat } from "./controller/createChatController";
import { getChatByUser, getChats } from "./controller/getChatController";
import { activateChat, desactivateChat } from "./controller/updateChatController";

export async function POST(req) {
    const data = await req.json();
    if (data.type === "PRIVATE") {
        const result = await createPrivateChat(data);
        return result
    }
    if (data.type === "GROUP") {
        const result = await createGroupChat(data);
        return result
    }
    if (data.type === "SUPPORT") {
        const result = await createSupportChat(data);
        return result
    }
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (userId) {
        const result = await getChatByUser(userId)
        return result
    }
    const result = await getChats()
    return result
}

export async function PATCH(req) {
    const searchParams = new URL(req.url).searchParams;
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    if (type === "act" && id) {
        const result = await activateChat(id);
        return result
    }
    if (type === "desac" && id) {
        const result = await desactivateChat(id);
        return result
    }
}