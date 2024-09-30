import { Admin, Chat, ChatParticipant, Client, Message, Owner } from "@/db/init";
import { NextResponse } from "next/server";

export async function getChats() {
    const chats = await Chat.findAll({
        include: [
            {
                model: Message,
                as: "messages",
            }
        ],
        where: {
            type: "SUPPORT",
        }
    });
    return NextResponse.json(chats, { status: 200 });
}