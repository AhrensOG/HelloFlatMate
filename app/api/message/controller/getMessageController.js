import { Message } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllMessages() {
    const messages = await Message.findAll({});

    return NextResponse.json({ messages });
}

export async function getMessageById(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });

    try {
        const message = await Message.findByPk(id);

        if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });

        return NextResponse.json({ message });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getMessageByChat(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const messages = await Message.findAll({
            where: {
                chatId: id,
            },
            order: [["date", "ASC"]],
        });
        return NextResponse.json({ messages });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getMessageByUser(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const messages = await Message.findAll({
            where: {
                userId: id,
            },
        });
        return NextResponse.json({ messages });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
