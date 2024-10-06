import { Admin, Chat, ChatParticipant, Client, Message, Owner } from "@/db/init";
import { Sequelize, Op } from 'sequelize';
import { NextResponse } from "next/server";

export async function getChats() {
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
                { model: ChatParticipant, as: "participants", }
            ]
        });
        if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        return NextResponse.json(chat, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getChatByUser(userId) {
    console.log("User ID:", userId);

    if (!userId) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }

    try {
        // Encuentra todos los chats en los que el usuario está participando
        const chats = await Chat.findAll({
            include: [
                {
                    model: ChatParticipant,
                    as: 'participants',
                    include: [
                        { model: Client, as: 'client' },
                        { model: Admin, as: 'admin' },
                        { model: Owner, as: 'owner' }
                    ]
                },
                {
                    model: Message,
                    as: 'messages'
                }
            ],
            // Filtra los chats utilizando una subconsulta para que incluya al usuario como participante
            where: {
                id: {
                    [Op.in]: Sequelize.literal(`(
                        SELECT "chatId" FROM "ChatParticipant" WHERE "participantId" = '${userId}'
                    )`)
                }
            }
        });

        return NextResponse.json({ chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
