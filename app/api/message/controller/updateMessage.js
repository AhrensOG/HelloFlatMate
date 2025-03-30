import { Message } from "@/db/init";
import { NextResponse } from "next/server";

export async function markMessageAsRead(messagesId) {
    console.log("📨 Marcando mensajes como leídos:", messagesId);

    if (!messagesId || messagesId.length === 0) {
        return NextResponse.json({ error: "No messages to update" }, { status: 400 });
    }

    try {
        const updatedMessages = await Message.update({ isRead: true }, { where: { id: messagesId } });

        return NextResponse.json({ message: "Messages marked as read", updatedMessages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
