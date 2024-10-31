import { Admin, Chat, ChatParticipant, Client, Message, Owner } from "@/db/init";
import { NextResponse } from "next/server";

export async function createMessage(data) {
    console.log(data);

    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    if (!data.chatId || parseInt(data.chatId) <= 0) {
        return NextResponse.json({ error: "No chat id provided" }, { status: 400 });
    }
    if (!data.body || data.body.trim() === "") {
        return NextResponse.json({ error: "No body provided" }, { status: 400 });
    }
    if (!data.userId || data.userId.trim() === "") {
        return NextResponse.json({ error: "No user id provided" }, { status: 400 });
    }

    try {
        const transaction = await Message.sequelize.transaction();
        try {
            const user = (await Client.findByPk(data.userId)) || (await Owner.findByPk(data.userId)) || (await Admin.findByPk(data.userId));
            if (!user) {
                await transaction.rollback();
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            const chatId = parseInt(data.chatId);
            const chat = await Chat.findOne(
                { where: { id: chatId } },
                {
                    include: {
                        model: ChatParticipant,
                        as: "participants",
                        where: {
                            participantId: user.id,
                        },
                    },
                }
            );

            if (!chat) {
                await transaction.rollback();
                return NextResponse.json({ error: "User not part of chat" }, { status: 404 });
            }

            const message = await Message.create({
                chatId: data.chatId,
                body: data.body,
                userId: data.userId,
                userName: user.name + " " + user.lastName,
                date: new Date(),
                userType: user.role,
            });
            return NextResponse.json({ message }, { status: 200 });
        } catch (error) {
            throw error;
        }
    } catch (error) {
        return NextResponse.json({ message: "Error creating message", error: error }, { status: 500 });
    }
}
