import { Chat, ChatParticipant, Client, Message, Owner, Property, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getChats() {
    const chats = await Chat.findAll({
        include: [
            {
                model: Message,
                as: "messages",
            },
            {
                model: ChatParticipant,
                as: "participants",
                attributes: ["id", "participantId", "participantType", "chatId"],
                include: [
                    {
                        model: Client,
                        as: "client",
                        attributes: ["id", "name", "lastName"],
                    },
                    {
                        model: Owner,
                        as: "owner",
                        attributes: ["id", "name", "lastName"],
                    },
                ],
            },
            {
                model: Property,
                as: "property",
                attributes: ["id", "serial"]
            },
            {
                model: Room,
                as: "room",
                attributes: ["id", "serial"]
            }
        ],
        where: {
            isActive: true,
        },
    });
    return NextResponse.json(chats, { status: 200 });
}
