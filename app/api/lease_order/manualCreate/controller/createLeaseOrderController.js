import { NextResponse } from "next/server";
import { Chat, ChatParticipant, Client, LeaseOrderProperty, LeaseOrderRoom, Owner, Property, Room } from "@/db/init";
import { createPrivateChat } from "@/app/api/admin/chat/controller/createChatController";

export async function createLeasePropertyOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 });
    if (!data.date) return NextResponse.json({ message: "No date provided" }, { status: 400 });
    if (!data.startDate) return NextResponse.json({ message: "No start date provided" }, { status: 400 });
    if (!data.endDate) return NextResponse.json({ message: "No end date provided" }, { status: 400 });
    if (!data.price || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 });
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 });
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 });
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 });

    try {
        // Buscar y verificar que la propiedad exista
        const property = await Property.findByPk(data.propertyId, {
            include: [
                {
                    model: LeaseOrderProperty,
                    as: "leaseOrdersProperty",
                },
                {
                    model: Chat,
                    as: "chats",
                },
            ],
        });
        if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 });

        // Verificar que la propiedad no tenga conflictos de fechas con órdenes existentes
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const hasConflictingDates = property.leaseOrdersProperty.some((order) => {
            if (order.status === "IN_PROGRESS" || order.status === "APPROVED" || order.status === "PENDING") {
                const existingStartDate = new Date(order.startDate);
                const existingEndDate = new Date(order.endDate);

                // Verificar si hay solapamiento de fechas
                return startDate <= existingEndDate && endDate >= existingStartDate;
            }
            return false;
        });

        if (hasConflictingDates) {
            return NextResponse.json({ message: "Selected dates conflict with an existing lease order" }, { status: 400 });
        }

        // Verificar que la propiedad no tenga una orden de alquiler ya existente (si la categoría no es "HELLO_STUDIO")
        if (
            property.leaseOrdersProperty.filter(
                (order) => order.status === "IN_PROGRESS" || order.status === "APPROVED" || order.status === "PENDING"
            ).length > 0
        ) {
            return NextResponse.json({ message: "Property already has a lease order" }, { status: 400 });
        }

        // Buscar y verificar que el dueño exista
        const owner = await Owner.findByPk(data.ownerId);
        if (!owner) return NextResponse.json({ message: "Owner not found" }, { status: 404 });

        // Verificar que el dueño sea el dueño de la propiedad
        if (owner.id !== property.ownerId) return NextResponse.json({ message: "Owner is not the owner of the property" }, { status: 400 });

        // Buscar y verificar que el cliente exista
        const client = await Client.findByPk(data.clientId);
        if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 });

        // Crear la nueva orden de alquiler
        const leaseOrder = await LeaseOrderProperty.create({ ...data, status: data?.status || "IN_PROGRESS" });
        await property.save();
        await createPrivateChat({
            type: "PRIVATE",
            ownerId: data.ownerId,
            receiverId: data.clientId,
            relatedId: property.id,
            relatedType: "PROPERTY",
        });
        if (property.chats && property.chats.length > 0) {
            const chatGroup = property.chats.find((chat) => chat.type === "GROUP");

            if (chatGroup) {
                await ChatParticipant.create({
                    participantId: data.clientId,
                    chatId: chatGroup.id, // Usamos el id del chat de tipo GROUP
                    participantType: "CLIENT",
                });
            }
        }
        return NextResponse.json(leaseOrder, { message: "Orden creada con exito" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function createLeaseRoomOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 });
    if (!data.date) return NextResponse.json({ message: "No date provided" }, { status: 400 });
    if (!data.startDate) return NextResponse.json({ message: "No start date provided" }, { status: 400 });
    if (!data.endDate) return NextResponse.json({ message: "No end date provided" }, { status: 400 });
    if (!data.price || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 });
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 });
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 });
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 });
    if (!data.roomId || data.roomId <= 0) return NextResponse.json({ message: "No room id provided" }, { status: 400 });

    try {
        //Buscar y verificar que la propiedad exista
        const property = await Property.findByPk(data.propertyId, {
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
        });
        if (!property) return NextResponse.json({ message: "Propiedad no encontrada" }, { status: 404 });
        //Buscar y verificar que la habitacion exista
        const room = await Room.findByPk(data.roomId, {
            include: {
                model: LeaseOrderRoom,
                as: "leaseOrdersRoom",
            },
        });
        if (!room) return NextResponse.json({ message: "Habitación no encontrada" }, { status: 404 });

        // Verificar si hay conflictos de fechas
        const hasDateConflict = room.leaseOrdersRoom.some((order) => {
            // Ignorar órdenes con estado REJECTED
            if (order.status === "REJECTED" || order.status === "CANCELED" || order.status === "FINISHED" ) {
                return false; // No considerar esta orden
            }

            const existingStartDate = new Date(order.startDate);
            const existingEndDate = new Date(order.endDate);
            const newStartDate = new Date(data.startDate);
            const newEndDate = new Date(data.endDate);

            // Verificar conflicto de fechas
            return !(newStartDate > existingEndDate || newEndDate < existingStartDate);
        });

        if (hasDateConflict) {
            return NextResponse.json({ message: "La habitación ya está reservada en el período especificado" }, { status: 400 });
        }

        // Verificar que la habitación corresponda a la propiedad
        if (property.id !== room.propertyId) return NextResponse.json({ message: "La habitación no corresponde a la propiedad" }, { status: 404 });

        // Buscar y verificar que el dueño exista
        const owner = await Owner.findByPk(data.ownerId);
        if (!owner) return NextResponse.json({ message: "Dueño no encontrado" }, { status: 404 });

        // Verificar que la propiedad corresponda al dueño
        if (owner.id !== property.ownerId) return NextResponse.json({ message: "La propiedad no corresponde al dueño" }, { status: 404 });

        // Buscar y verificar que el cliente exista
        const client = await Client.findByPk(data.clientId);
        if (!client) return NextResponse.json({ message: "Cliente no encontrado" }, { status: 404 });

        // Crear la nueva orden de alquiler
        const leaseOrder = await LeaseOrderRoom.create({ ...data, status: data?.status || "IN_PROGRESS" });
        room.status = "RESERVED";
        await room.save();

        // Actualizar el estado de la propiedad si es necesario
        const roomsAvailable = property.rooms.filter((room) => room.status === "FREE");
        if (roomsAvailable.length === 1) {
            property.status = "RESERVED";
            await property.save();
        }
        await createPrivateChat({
            type: "PRIVATE",
            ownerId: data.ownerId,
            receiverId: data.clientId,
            relatedId: room.id,
            relatedType: "ROOM",
        });

        if (property.chats && property.chats.length > 0) {
            const chatGroup = property.chats.find((chat) => chat.type === "GROUP");

            if (chatGroup) {
                await ChatParticipant.create({
                    participantId: data.clientId,
                    chatId: chatGroup.id, // Usamos el id del chat de tipo GROUP
                    participantType: "CLIENT",
                });
            }
        }
        return NextResponse.json(leaseOrder, { message: "Orden creada con éxito" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
