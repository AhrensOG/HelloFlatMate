import { Chat, ChatParticipant, Client, LeaseOrderProperty, LeaseOrderRoom, Property, Room } from "@/db/init";
import chatParticipant from "@/db/models/chatParticipant";
import { sequelize } from "@/db/models/comment";
import { NextResponse } from "next/server";

export async function assingChats() {
    try {
        const transaction = await sequelize.transaction();
        try {
            const clients = await Client.findAll({ transaction });
            const leaseOrdersRoom = await LeaseOrderRoom.findAll({
                transaction,
                include: {
                    model: Room,
                    as: "room",
                    attributes: ["id"],
                    include: { model: Property, as: "property", include: { model: Chat, as: "chat" } },
                },
            });
            const leaseOrdersProperty = await LeaseOrderProperty.findAll({
                transaction,
                include: { model: Property, as: "property", include: { model: Chat, as: "chat" } },
            });

            //Crear y asignar chats Privados
            leaseOrdersProperty.forEach(async (order) => {
                const chat = await Chat.create({
                    type: "PRIVATE",
                    propertyId: order.propertyId,
                    isActive: true,
                });
                const chatParticipants = await ChatParticipant.bulkCreate([
                    {
                        chatId: chat.id,
                        participantId: order.ownerId,
                        participantType: "OWNER",
                    },
                    {
                        chatId: chat.id,
                        participantId: order.clientId,
                        participantType: "CLIENT",
                    },
                ]);

                const chatGroupId = order.property.chat?.find((chat) => chat.type === "GROUP");
                if (!chatGroupId) {
                    const chatGroup = await Chat.create({
                        type: "GROUP",
                        propertyId: order.propertyId,
                        isActive: true,
                    });
                    const chatParticipantGroup = await ChatParticipant.create({
                        chatId: chatGroup.id,
                        participantId: order.ownerId,
                        participantType: "OWNER",
                    });
                    const chatParticipantGroup2 = await ChatParticipant.create({
                        chatId: chatGroup.id,
                        participantId: order.clientId,
                        participantType: "CLIENT",
                    });
                } else {
                    const chatParticipantGroup = await ChatParticipant.create({
                        chatId: chatGroupId.id,
                        participantId: order.clientId,
                        participantType: "CLIENT",
                    });
                }
            });

            leaseOrdersRoom.forEach(async (order) => {
                const chat = await Chat.create({
                    type: "PRIVATE",
                    propertyId: order.propertyId,
                    ownerId: order.ownerId,
                    isActive: true,
                });
                const chatParticipants = await ChatParticipant.bulkCreate([
                    {
                        chatId: chat.id,
                        participantId: order.ownerId,
                        participantType: "OWNER",
                    },
                    {
                        chatId: chat.id,
                        participantId: order.clientId,
                        participantType: "CLIENT",
                    },
                ]);

                const chatGroupId = order.room.property.chat?.filter((chat) => chat.type === "GROUP");

                if (!chatGroupId) {
                    const chatGroup = await Chat.create({
                        type: "GROUP",
                        propertyId: order.propertyId,
                        ownerId: order.ownerId,
                        isActive: true,
                    });
                    const chatParticipantGroup = await ChatParticipant.create({
                        chatId: chatGroup.id,
                        participantId: order.ownerId,
                        participantType: "OWNER",
                    });
                    const chatParticipantGroup2 = await ChatParticipant.create({
                        chatId: chatGroup.id,
                        participantId: order.clientId,
                        participantType: "CLIENT",
                    });
                } else {
                    const chatParticipantGroup = await ChatParticipant.create({
                        chatId: chatGroupId[0].id,
                        participantId: order.clientId,
                        participantType: "CLIENT",
                    });
                }
            });

            await transaction.commit();
            return NextResponse.json({ message: "Chats assigned successfully" }, { status: 200 });
        } catch (error) {
            await transaction.rollback();
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
