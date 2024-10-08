import { NextResponse } from "next/server";
import { Admin, Client, LeaseOrderProperty, LeaseOrderRoom, Owner, Property, Room, Chat, ChatParticipant } from "@/db/init";
import { createGroupChat, createPrivateChat } from "@/app/api/admin/chat/controller/createChatController";
import { sequelize } from "@/db/models/comment";

// export async function updateLeaseOrder(data) {
//     if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
//     if (!data.adminId || data.adminId.trim() === "") return NextResponse.json({ message: "No admin id provided" }, { status: 400 })
//     if (!data.id || data.id <= 0) return NextResponse.json({ message: "No order id provided" }, { status: 400 })
//     if (!data.date) return NextResponse.json({ message: "No date provided" }, { status: 400 })
//     if (!data.startDate) return NextResponse.json({ message: "No start date provided" }, { status: 400 })
//     if (!data.endDate) return NextResponse.json({ message: "No end date provided" }, { status: 400 })
//     if (!data.price || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 })
//     if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
//     if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
//     if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 })
//     if (!data.status || data.status !== "PENDING" && data.status !== "APPROVED" && data.status !== "REJECTED") return NextResponse.json({ message: "No status provided" }, { status: 400 })

//     try {
//         //Buscar y verificar que la orden exista
//         const leaseOrder = await LeaseOrder.findByPk(data.id)
//         if (!leaseOrder) return NextResponse.json({ message: "Lease order not found" }, { status: 404 })
//         //Buscar y verificar que el admin exista
//         const admin = await Admin.findByPk(data.adminId)
//         if (!admin) return NextResponse.json({ message: "Admin not found" }, { status: 404 })
//         //Buscar y verificar que la propiedad exista
//         const property = await Property.findByPk(data.propertyId)
//         if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 })
//         //Buscar y verificar que el dueño exista    
//         const owner = await Owner.findByPk(data.ownerId)
//         if (!owner) return NextResponse.json({ message: "Owner not found" }, { status: 404 })
//         //Buscar y verificar que el cliente exista
//         const client = await Client.findByPk(data.clientId)
//         if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 })

//         //Modificar la orden
//         const updatedLeaseOrder = await leaseOrder.update({ ...data })
//         return NextResponse.json(updatedLeaseOrder, { message: "Orden actualizada con exito" }, { status: 200 })
//     } catch (error) {
//         return NextResponse.json({ message: error.message }, { status: 500 })
//     }
// }

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
            const property = await Property.findByPk(data.propertyId, { include: { model: Chat, as: "chat" } }, { transaction });
            if (!property) {
                await transaction.rollback();
                return NextResponse.json({ message: "Property not found" }, { status: 404 });
            }

            if (data.action === "APPROVED") {
                leaseOrderProperty.status = "APPROVED";
                leaseOrderProperty.isActive = true;
                if (property.category === "HELLO_STUDIO") {
                    property.status = "FREE";
                } else {
                    property.status = "OCCUPIED";
                }
                await leaseOrderProperty.save({ transaction });
                await property.save({ transaction });

                // Crear chat con el dueño
                const chatPrivate = createPrivateChat({
                    type: "PRIVATE",
                    ownerId: property.ownerId,
                    receiverId: leaseOrderProperty.clientId,
                });

                //Crear participantes del chat
                const participantCLientPriv = await ChatParticipant.create({
                    participantId: leaseOrderProperty.clientId,
                    chatId: chatPrivate.id,
                    participantType: "CLIENT",
                })

                //Asignar al chat grupal de la propiedad
                if (property.chat) {
                    const participantOwnerPriv = await ChatParticipant.create({
                        participantId: leaseOrderProperty.clientId,
                        chatId: property.chat.id,
                        participantType: "CLIENT",
                    })
                }

                await transaction.commit();
                return NextResponse.json({ message: "Lease order property approved" }, { status: 200 });
            } else if (data.action === "REJECTED") {
                leaseOrderProperty.status = "REJECTED";
                leaseOrderProperty.isActive = false;
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
        const room = await Room.findByPk(data.roomId, { transaction });
        if (!room) {
            await transaction.rollback();
            return NextResponse.json({ message: "Room not found" }, { status: 404 });
        }
        const property = await Property.findByPk(room.propertyId, {
            include: {
                model: Room,
                as: "rooms",
            },
            transaction
        });
        const roomsAvailable = property.rooms.filter(room => room.status === "FREE");

        if (data.action === "APPROVED") {
            leaseOrderRoom.status = "APPROVED";
            leaseOrderRoom.isActive = true;
            room.status = "OCCUPIED";
            if (property.category === "HELLO_STUDIO") {
                property.status = "FREE";
            } else {
                property.status = roomsAvailable.length < 1 ? "OCCUPIED" : "FREE";
            }

            await leaseOrderRoom.save({ transaction });
            await room.save({ transaction });
            await property.save({ transaction });

            // Crear chat con el dueño
            const chatPrivate = createPrivateChat({
                type: "PRIVATE",
                ownerId: property.ownerId,
                receiverId: leaseOrderRoom.clientId,
            });

            await transaction.commit();
            return NextResponse.json({ message: "Lease order room approved" }, { status: 200 });
        } else if (data.action === "REJECTED") {
            leaseOrderRoom.status = "REJECTED";
            leaseOrderRoom.isActive = false;
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
