import { NextResponse } from "next/server";
import { Client, LeaseOrderRoom, Property, Room, Chat, ChatParticipant, RentalPeriod, RentalItem } from "@/db/init";
import { sequelize } from "@/db/models/comment";
import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { preReservationTemplate } from "../utils/preReservationTemplate";

const { HFM_MAIL } = process.env;

export async function updateStatusLeaseOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 });
    if (!data.action || (data.action !== "REJECTED" && data.action !== "PENDING"))
        return NextResponse.json({ message: "No status provided" }, { status: 400 });
    if (!data.leaseOrderId || data.leaseOrderId <= 0) return NextResponse.json({ message: "No lease order id provided" }, { status: 400 });
    if (!data.propertyId && !data.roomId) return NextResponse.json({ message: "No property id or room id provided" }, { status: 400 });
    
    let transaction;
    try {
        // Iniciar la transacción
        transaction = await sequelize.transaction();
        
        const leaseOrderRoom = await LeaseOrderRoom.findByPk(data.leaseOrderId, { transaction });
        if (!leaseOrderRoom) {
            await transaction.rollback();
            return NextResponse.json({ message: "Lease order room not found" }, { status: 404 });
        }
        const userId = leaseOrderRoom.clientId
        const client = await Client.findByPk(userId)
        if (!client) {
            await transaction.rollback();
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }

        const room = await Room.findByPk(
            data.roomId,
            {
                include: {
                    model: RentalItem,
                    as: "rentalItems",
                    include: {
                        model: RentalPeriod,
                        as: "rentalPeriod",
                    },
                },
            },
            { transaction }
        );
        if (!room) {
            await transaction.rollback();
            return NextResponse.json({ message: "Room not found" }, { status: 404 });
        }
        const property = await Property.findByPk(room.propertyId, {
            include: [
                {
                    model: Room,
                    as: "rooms",
                },
                {
                    model: Chat,
                    as: "chats",
                },
            ],
            transaction,
        });
        const roomsAvailable = property.rooms.filter((room) => room.status === "FREE");

        const address = {
          street: property?.street,
          streetNumber: property?.streetNumber,
          floor: property?.floor,
        }

        if (data.action === "PENDING") {
            leaseOrderRoom.status = "PENDING";
            leaseOrderRoom.isActive = true;
            leaseOrderRoom.inReview = false;

            if (room.calendar === "SIMPLE") {
                if (
                    room.rentalItems.some((rentalPeriod) => {
                        return rentalPeriod.isFree;
                    })
                ) {
                    room.status = "FREE";
                } else {
                    room.status = "OCCUPIED";
                }
            } else {
                room.status = "FREE";
            }
            property.status = roomsAvailable.length > 0 ? "FREE" : "OCCUPIED";

            await leaseOrderRoom.save({ transaction });
            await room.save({ transaction });
            await property.save({ transaction });

            // Crear chat con el dueño
            const chatPrivate = await Chat.create({
                type: "PRIVATE",
                ownerId: property.ownerId,
                isActive: true,
                relatedType: "ROOM",
                relatedId: room.id,
            });

            await ChatParticipant.create({
                participantId: leaseOrderRoom.clientId,
                participantType: "CLIENT",
                chatId: chatPrivate.id,
            });
            await ChatParticipant.create({
                participantId: property.ownerId,
                participantType: "OWNER",
                chatId: chatPrivate.id,
            });

            const groupChatId = property.chats?.find((chat) => chat.type === "GROUP");
            await ChatParticipant.create({
                participantId: leaseOrderRoom.clientId,
                chatId: groupChatId.id,
                participantType: "CLIENT",
            });
            
            await sendMailFunction({
              to: client.email,
              subject: `Solicitud aceptada, ahora tienes que realizar el pago`,
              html: preReservationTemplate(client.name, client.lastName, address, room.serial),
              cc: HFM_MAIL,
            });

            await transaction.commit();
            return NextResponse.json({ message: "Lease order room PENDING" }, { status: 200 });
        } else if (data.action === "REJECTED") {
            leaseOrderRoom.status = "REJECTED";
            leaseOrderRoom.isActive = false;
            leaseOrderRoom.inReview = false;
            room.status = "FREE";
            property.status = roomsAvailable.length > 0 ? "OCCUPIED" : "FREE";

            await leaseOrderRoom.save({ transaction });
            await room.save({ transaction });
            await property.save({ transaction });

            await transaction.commit();
            return NextResponse.json({ message: "Lease order room rejected" }, { status: 200 });
        }
    } catch (error) {
        if (transaction) await transaction.rollback();
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
