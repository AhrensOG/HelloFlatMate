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
            isActive: true,
        }
    });
    return NextResponse.json(chats, { status: 200 });
}