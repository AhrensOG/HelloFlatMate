import { NextResponse } from "next/server";
import { Client, LeaseOrderProperty, LeaseOrderRoom, Owner, Property, Room } from "@/db/init";

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
            include: {
                model: LeaseOrderProperty,
                as: "leaseOrdersProperty",
            }
        });
        if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 });

        // Verificar que la propiedad no tenga conflictos de fechas con órdenes existentes
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const hasConflictingDates = property.leaseOrdersProperty.some(order => {
            if (order.status === "IN_PROGRESS" || order.status === "APPROVED" || order.status === "PENDING") {
                const existingStartDate = new Date(order.startDate);
                const existingEndDate = new Date(order.endDate);

                // Verificar si hay solapamiento de fechas
                return (startDate <= existingEndDate && endDate >= existingStartDate);
            }
            return false;
        });

        if (hasConflictingDates) {
            return NextResponse.json({ message: "Selected dates conflict with an existing lease order" }, { status: 400 });
        }

        // Verificar que la propiedad no tenga una orden de alquiler ya existente (si la categoría no es "HELLO_STUDIO")
        if (property.leaseOrdersProperty.filter(order => order.status === "IN_PROGRESS" || order.status === "APPROVED" || order.status === "PENDING").length > 0 && property.category !== "HELLO_STUDIO") {
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
        // Buscar la propiedad y la habitación relacionadas
        const property = await Property.findByPk(data.propertyId, {
            include: {
                model: Room,
                as: "rooms",
            },
        });
        if (!property) return NextResponse.json({ message: "Propiedad no encontrada" }, { status: 404 });

        const room = await Room.findByPk(data.roomId, {
            include: {
                model: LeaseOrderRoom,
                as: "leaseOrdersRoom",
            },
        });
        if (!room) return NextResponse.json({ message: "Habitación no encontrada" }, { status: 404 });

        // Verificar conflictos en las fechas con estado APPROVED
        const hasConflict = room.leaseOrdersRoom.some((order) => {
            const isDateConflict =
                (new Date(data.startDate) <= new Date(order.endDate) &&
                    new Date(data.endDate) >= new Date(order.startDate)) ||
                (new Date(order.startDate) <= new Date(data.endDate) &&
                    new Date(order.endDate) >= new Date(data.startDate));

            // Si hay conflicto de fechas, verificar el estado
            return isDateConflict && order.status === "APPROVED";
        });

        if (hasConflict) {
            return NextResponse.json({ message: "La habitación ya tiene una orden APROBADA en este periodo" }, { status: 400 });
        }

        // Validar que la habitación corresponda a la propiedad
        if (property.id !== room.propertyId) return NextResponse.json({ message: "La habitación no corresponde a la propiedad" }, { status: 404 });

        // Verificar que el dueño exista y corresponda a la propiedad
        const owner = await Owner.findByPk(data.ownerId);
        if (!owner) return NextResponse.json({ message: "Dueño no encontrado" }, { status: 404 });
        if (owner.id !== property.ownerId) return NextResponse.json({ message: "La propiedad no corresponde al dueño" }, { status: 404 });

        // Verificar que el cliente exista
        const client = await Client.findByPk(data.clientId);
        if (!client) return NextResponse.json({ message: "Cliente no encontrado" }, { status: 404 });

        // Crear la nueva orden
        const leaseOrder = await LeaseOrderRoom.create({
            ...data,
            status: data?.status || "IN_PROGRESS",
        });

        // Actualizar el estado de la habitación
        room.status = "RESERVED";
        await room.save();

        // Verificar y actualizar el estado de la propiedad
        const roomsAvailable = property.rooms.filter((r) => r.status === "FREE");
        if (roomsAvailable.length === 1) {
            property.status = "RESERVED";
            await property.save();
        }

        return NextResponse.json(leaseOrder, { message: "Orden creada con éxito" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
