import { NextResponse } from "next/server";
import { createGroupChat, createPrivateChat } from "./controller/createChatController";
import { getChats } from "./controller/getChatController";

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

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function GET() {
    const result = await getChats()
    return result
}