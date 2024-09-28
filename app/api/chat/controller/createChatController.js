import { Admin, Client, Owner, Chat, ChatParticipant } from "@/db/init";
import { NextResponse } from "next/server";

export async function createPrivateChat(data) {
    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    if (!data.type || data.type !== "PRIVATE") {
        return NextResponse.json({ error: "No type provided or invalid" }, { status: 400 });
    }
    if (!data.ownerId || data.ownerId.trim() === "") {
        return NextResponse.json({ error: "No owner id provided" }, { status: 400 });
    }
    if (!data.receiverId || data.receiverId.trim() === "") {
        return NextResponse.json({ error: "No receiver id provided" }, { status: 400 });
    }

    const transaction = await Chat.sequelize.transaction();
    try {
        const owner = await Owner.findByPk(data.ownerId, { transaction }) || await Admin.findByPk(data.ownerId, { transaction });

        if (!owner) {
            await transaction.rollback();
            return NextResponse.json({ error: "owner not found" }, { status: 404 });
        }

        const receiver = await Client.findByPk(data.receiverId, { transaction }) ||
            await Owner.findByPk(data.receiverId, { transaction }) ||
            await Admin.findByPk(data.receiverId, { transaction });

        if (!receiver) {
            await transaction.rollback();
            return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
        }

        const chat = await Chat.create({ type: data.type }, { transaction });

        await ChatParticipant.bulkCreate([
            { participantId: owner.id, participantType: owner.role, chatId: chat.id },
            { participantId: receiver.id, participantType: receiver.role, chatId: chat.id },
        ], { transaction });

        await transaction.commit();
        return NextResponse.json({ message: "Chat created successfully", chat }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return NextResponse.json({ error: "Error creating chat", details: error.message }, { status: 500 });
    }
}

export async function createGroupChat(data) {
    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    if (!data.type || data.type !== "GROUP") {
        return NextResponse.json({ error: "No type provided or invalid" }, { status: 400 });
    }
    if (!data.ownerId || data.ownerId.trim() === "") {
        return NextResponse.json({ error: "No owner id provided" }, { status: 400 });
    }
    if (!data.receiverIds || data.receiverIds.length === 0 || Array.isArray(data.receiverIds) === false) {
        return NextResponse.json({ error: "No receivers id provided" }, { status: 400 });
    }

    try {
        const transaction = await Chat.sequelize.transaction();
        try {
            const owner = await Owner.findByPk(data.ownerId, { transaction }) || await Admin.findByPk(data.ownerId, { transaction });
            if (!owner) {
                await transaction.rollback();
                return NextResponse.json({ error: "Owner not found" }, { status: 404 });
            }

            const clients = await Client.findAll({ where: { id: data.receiverIds }, transaction });
            const owners = await Owner.findAll({ where: { id: data.receiverIds }, transaction });
            const admins = await Admin.findAll({ where: { id: data.receiverIds }, transaction });

            const receivers = [...clients, ...owners, ...admins]

            if (!receivers) {
                await transaction.rollback();
                return NextResponse.json({ error: "Receivers not found" }, { status: 404 });
            }

            const chat = await Chat.create({ type: data.type, ownerId: data.ownerId }, { transaction });

            const participants = receivers.map((receiver) => {
                return {
                    participantId: receiver.id,
                    participantType: receiver.role,
                    chatId: chat.id
                }
            })
            participants.push({
                participantId: owner.id,
                participantType: owner.role,
                chatId: chat.id
            })

            await ChatParticipant.bulkCreate(participants, { transaction });

            await transaction.commit();
            return NextResponse.json({ message: "Chat created successfully", chat }, { status: 200 });
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Error creating chat", err }, { status: 500 });
    }

}
