import { NextResponse } from "next/server";
import { createGroupChat, createPrivateChat, createSupportChat } from "./controller/createChatController";
import { getChatByUser, getChats } from "./controller/getChatController";
import { activateChat, assignSupport, desactivateChat } from "./controller/updateChatController";

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

export async function GET() {
    return await getChats();
}

export async function PATCH(req) {
    const data = await req.json();
    if (data.type === "assing") {
        return await assignSupport(data);
    }
}