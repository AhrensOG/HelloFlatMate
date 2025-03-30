import {
    Chat,
    ChatParticipant,
    Client,
    LeaseOrderRoom,
    Property,
    Room,
} from "@/db/init";
import { NextResponse } from "next/server";

export async function createGroupChats() {
    try {
        const properties = await Property.findAll({
            attributes: ["id", "ownerId"],
            include: [
                {
                    model: Room,
                    as: "rooms",
                    attributes: ["id"],
                    include: [
                        {
                            model: LeaseOrderRoom,
                            as: "leaseOrdersRoom",
                            attributes: ["id", "isActive"],
                            include: [
                                {
                                    model: Client,
                                    as: "client",
                                    attributes: ["id"],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const createdChats = [];

        for (const property of properties) {
            const chat = await Chat.create({
                type: "GROUP",
                ownerId: property.ownerId,
                isActive: true,
                relatedType: "PROPERTY",
                relatedId: property.id,
            });

            const participants = new Set();

            for (const room of property.rooms || []) {
                for (const leaseOrder of room.leaseOrdersRoom || []) {
                    if (leaseOrder.isActive && leaseOrder.client) {
                        participants.add(leaseOrder.client.id);
                    }
                }
            }
            // Crear los participantes CLIENT
            for (const clientId of participants) {
                await ChatParticipant.create({
                    chatId: chat.id,
                    participantId: clientId,
                    participantType: "CLIENT",
                });
            }

            // Agregar al propietario
            if (property.ownerId) {
                await ChatParticipant.create({
                    chatId: chat.id,
                    participantId: property.ownerId,
                    participantType: "OWNER",
                });
            }

            createdChats.push(chat);
        }

        return NextResponse.json({ success: true, chats: createdChats });
    } catch (error) {
        console.error(
            "Error al crear chats de grupo con participantes:",
            error
        );
        return NextResponse.json(
            { success: false, error: "Error al crear chats de grupo." },
            { status: 500 }
        );
    }
}

export async function createPrivateChats() {
    try {
        const rooms = await Room.findAll({
            attributes: ["id"],
            include: [
                {
                    model: Property,
                    as: "property",
                    attributes: ["ownerId"],
                },
                {
                    model: LeaseOrderRoom,
                    as: "leaseOrdersRoom",
                    attributes: ["id", "isActive"],
                    include: [
                        {
                            model: Client,
                            as: "client",
                            attributes: ["id"],
                        },
                    ],
                },
            ],
        });

        const createdChats = [];

        for (const room of rooms) {
            const ownerId = room.property?.ownerId;
            if (!ownerId) continue;

            // Buscar una orden activa con cliente
            const activeOrder = (room.leaseOrdersRoom || []).find(
                (order) => order.isActive && order.client
            );

            if (!activeOrder) continue;

            const clientId = activeOrder.client.id;

            const chat = await Chat.create({
                type: "PRIVATE",
                ownerId,
                isActive: true,
                relatedType: "ROOM",
                relatedId: room.id,
            });

            // Participante: CLIENT
            await ChatParticipant.create({
                chatId: chat.id,
                participantId: clientId,
                participantType: "CLIENT",
            });

            // Participante: OWNER
            await ChatParticipant.create({
                chatId: chat.id,
                participantId: ownerId,
                participantType: "OWNER",
            });

            createdChats.push(chat);
        }

        return NextResponse.json({ success: true, chats: createdChats });
    } catch (error) {
        console.error("Error al crear chats privados desde rooms:", error);
        return NextResponse.json(
            { success: false, error: "Error al crear chats desde rooms." },
            { status: 500 }
        );
    }
}

export async function createSupportChats() {
    try {
        const clients = await Client.findAll({
            attributes: ["id"],
        });

        const createdChats = [];

        for (const client of clients) {
            const chat = await Chat.create({
                type: "SUPPORT",
                isActive: true,
                ownerId: null,
                relatedType: null,
                relatedId: null,
            });

            await ChatParticipant.create({
                participantId: client.id,
                participantType: "CLIENT",
                chatId: chat.id,
            });

            createdChats.push(chat);
        }

        return NextResponse.json({ success: true, chats: createdChats });
    } catch (error) {
        console.error("Error al crear chats de soporte:", error);
        return NextResponse.json(
            { success: false, error: "Error al crear chats de soporte." },
            { status: 500 }
        );
    }
}
