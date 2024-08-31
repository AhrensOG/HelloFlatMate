import { NextResponse } from "next/server";
import { createGroupChat, createPrivateChat } from "./controller/createChatController";
import { getChatById, getChats } from "./controller/getChatController";

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

export async function GET(req) {
    console.log("getChats");

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id) {
        const result = await getChatById(id)
        return result
    }
    const result = await getChats()
    return result
}