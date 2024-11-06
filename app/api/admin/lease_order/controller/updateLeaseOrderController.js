import { NextResponse } from "next/server";
import { Admin, Client, LeaseOrderProperty, LeaseOrderRoom, Owner, Property, Room, Chat, ChatParticipant, RentalPeriod, RentalItem } from "@/db/init";
import { createGroupChat, createPrivateChat } from "@/app/api/admin/chat/controller/createChatController";
import { sequelize } from "@/db/models/comment";


export async function updateStatusLeaseOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 });
    if (!data.action || (data.action !== "REJECTED" && data.action !== "APPROVED")) return NextResponse.json({ message: "No status provided" }, { status: 400 });
    if (!data.leaseOrderId || data.leaseOrderId <= 0) return NextResponse.json({ message: "No lease order id provided" }, { status: 400 });
    if (!data.adminId || data.adminId <= 0) return NextResponse.json({ message: "No admin id provided" }, { status: 400 });
    if (!data.propertyId && !data.roomId) return NextResponse.json({ message: "No property id or room id provided" }, { status: 400 });
    if (!data.type || (data.type !== "PROPERTY" && data.type !== "ROOM")) return NextResponse.json({ message: "No type provided" }, { status: 400 });

    let transaction;
    try {
        // Iniciar la transacción
        transaction = await sequelize.transaction();

        const admin = await Admin.findByPk(data.adminId, { transaction }) || await Client.findByPk(data.adminId, { transaction });
        if (!admin) return NextResponse.json({ message: "Admin not found" }, { status: 404 });

        if (data.type === "PROPERTY") {
            // Buscar y verificar que la orden exista
            const leaseOrderProperty = await LeaseOrderProperty.findByPk(data.leaseOrderId, { transaction });
            if (!leaseOrderProperty) {
                await transaction.rollback();
                return NextResponse.json({ message: "Lease order property not found" }, { status: 404 });
            }
            const property = await Property.findByPk(data.propertyId, {
                include: {
                    model: RentalItem,
                    as: "rentalItems",
                    include: {
                        model: RentalPeriod,
                        as: "rentalPeriod",
                    }
                }
            }, { transaction });
            if (!property) {
                await transaction.rollback();
                return NextResponse.json({ message: "Property not found" }, { status: 404 });
            }

            if (data.action === "APPROVED") {
                leaseOrderProperty.status = "APPROVED";
                leaseOrderProperty.isActive = true;
                leaseOrderProperty.inReview = false;
                if (property.calendar === "SIMPLE") {
                    let isFree = property.rentalItems.some(rentalPeriod => {
                        return rentalPeriod.isFree;
                    })
                    property.status = isFree ? "FREE" : "OCCUPIED";
                } else {
                    property.status = "FREE";
                }
                await leaseOrderProperty.save({ transaction });
                await property.save({ transaction });

                // Crear chat con el dueño
                const chatPrivate = await createPrivateChat({
                    type: "PRIVATE",
                    ownerId: property.ownerId,
                    receiverId: leaseOrderProperty.clientId,
                });

                // //Crear participantes del chat
                // const participantCLientPriv = await ChatParticipant.create({
                //     participantId: leaseOrderProperty.clientId,
                //     chatId: chatPrivate.id,
                //     participantType: "CLIENT",
                // })

                await transaction.commit();
                return NextResponse.json({ message: "Lease order property approved" }, { status: 200 });
            } else if (data.action === "REJECTED") {
                leaseOrderProperty.status = "REJECTED";
                leaseOrderProperty.isActive = false;
                leaseOrderProperty.inReview = false;
                property.status = "FREE";
                await leaseOrderProperty.save({ transaction });
                await property.save({ transaction });

                await transaction.commit();
                return NextResponse.json({ message: "Lease order property rejected" }, { status: 200 });
            }
        }

        // EN CASO QUE SEA DE UNA HABITACIÓN
        const leaseOrderRoom = await LeaseOrderRoom.findByPk(data.leaseOrderId, { transaction });
        if (!leaseOrderRoom) {
            await transaction.rollback();
            return NextResponse.json({ message: "Lease order room not found" }, { status: 404 });
        }
        const room = await Room.findByPk(data.roomId, { include: {
            model: RentalItem,
            as: "rentalItems",
            include: {
                model: RentalPeriod,
                as: "rentalPeriod",
            }
        } }, { transaction });
        if (!room) {
            await transaction.rollback();
            return NextResponse.json({ message: "Room not found" }, { status: 404 });
        }
        const property = await Property.findByPk(room.propertyId, {
            include: [{
                model: Room,
                as: "rooms",
            }, {
                model: Chat,
                as: "chat",
            }],
            transaction
        });
        const roomsAvailable = property.rooms.filter(room => room.status === "FREE");

        if (data.action === "APPROVED") {
            leaseOrderRoom.status = "APPROVED";
            leaseOrderRoom.isActive = true;
            leaseOrderRoom.inReview = false;

            // if (room.rentalPeriods.some(rentalPeriod => {
            //     return rentalPeriod.status === "FREE";
            // })) {
            //     room.status = "FREE";
            // } else {
            //     room.status = roomsAvailable.length > 0 ? "FREE" : "OCCUPIED";
            // }

            if (room.calendar === "SIMPLE") {
                if (room.rentalItems.some(rentalPeriod => {
                    return rentalPeriod.isFree;
                })) {
                    room.status = "FREE";
                } else {
                    room.status = "OCCUPIED"
                }
            } else {
                room.status = "FREE";
            }
            property.status = roomsAvailable.length > 0 ? "FREE" : "OCCUPIED";

            await leaseOrderRoom.save({ transaction });
            await room.save({ transaction });
            await property.save({ transaction });

            // Crear chat con el dueño
            const chatPrivate = await createPrivateChat({
                type: "PRIVATE",
                ownerId: property.ownerId,
                receiverId: leaseOrderRoom.clientId,
            });

            //Asignar al chat grupal de la propiedad
            if (property.chat) {
                const participantOwnerPriv = await ChatParticipant.create({
                    participantId: leaseOrderRoom.clientId,
                    chatId: property.chat.id,
                    participantType: "CLIENT",
                })
            }

            await transaction.commit();
            return NextResponse.json({ message: "Lease order room approved" }, { status: 200 });
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