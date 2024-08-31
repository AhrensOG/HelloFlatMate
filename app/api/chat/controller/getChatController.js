import { Chat, ChatParticipant, Message } from "@/db/init";
import { NextResponse } from "next/server";

export async function getChats() {
    console.log("getChats");

    const chats = await Chat.findAll({
        include: [
            { model: Message, as: "messages" },
            { model: ChatParticipant, as: "participants" }
        ]
    });
    return NextResponse.json({ chats });
}

export async function getChatById(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const chat = await Chat.findByPk(id, {
            include: [
                { model: Message, as: "messages" },
                { model: ChatParticipant, as: "participants" }
            ]
        });
        if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        return NextResponse.json(chat, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getChatByUser(userId) {
    if (!userId) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const chats = await Chat.findAll({
            include: [
                { model: Message, as: "messages" },
                { model: ChatParticipant, as: "participants", where: { participantId: userId } }
            ]
        });
        return NextResponse.json({ chats });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}