import { NextResponse } from "next/server";
import { Client, LeaseOrderProperty, LeaseOrderRoom, Owner, Property, Room } from "@/db/init";

export async function createLeasePropertyOrder(data) {

    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.date) return NextResponse.json({ message: "No date provided" }, { status: 400 })
    if (!data.startDate) return NextResponse.json({ message: "No start date provided" }, { status: 400 })
    if (!data.endDate) return NextResponse.json({ message: "No end date provided" }, { status: 400 })
    if (!data.price || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 })
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 })

    try {
        //Buscar y verificar que la propiedad exista
        const property = await Property.findByPk(data.propertyId, {
            include: {
                model: LeaseOrderProperty,
                as: "leaseOrdersProperty",
            }
        })
        if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 })
        if (property.leaseOrdersProperty.length > 0) return NextResponse.json({ message: "Property already has a lease order" }, { status: 400 })
        //Buscar y verificar que el dueño exista    
        const owner = await Owner.findByPk(data.ownerId)
        if (!owner) return NextResponse.json({ message: "Owner not found" }, { status: 404 })
        //Verificar que el dueño sea el dueño de la propiedad
        if (owner.id !== property.ownerId) return NextResponse.json({ message: "Owner is not the owner of the property" }, { status: 400 })
        //Buscar y verificar que el cliente exista
        const client = await Client.findByPk(data.clientId)
        if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 })
        const leaseOrder = await LeaseOrderProperty.create({ ...data, status: "IN_PROGRESS" })
        property.status = "RESERVED"
        await property.save()
        return NextResponse.json(leaseOrder, { message: "Orden creada con exito" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function createLeaseRoomOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.date) return NextResponse.json({ message: "No date provided" }, { status: 400 })
    if (!data.startDate) return NextResponse.json({ message: "No start date provided" }, { status: 400 })
    if (!data.endDate) return NextResponse.json({ message: "No end date provided" }, { status: 400 })
    if (!data.price || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 })
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 })
    if (!data.roomId || data.roomId <= 0) return NextResponse.json({ message: "No room id provided" }, { status: 400 })

    try {
        //Buscar y verificar que la propiedad exista
        const property = await Property.findByPk(data.propertyId, {
            include: {
                model: Room,
                as: "rooms"
            }
        })
        if (!property) return NextResponse.json({ message: "Propiedad no encontrada" }, { status: 404 })
        //Buscar y verificar que la habitacion exista
        const room = await Room.findByPk(data.roomId, {
            include: {
                model: LeaseOrderRoom,
                as: "leaseOrdersRoom"
            }
        })
        if (!room) return NextResponse.json({ message: "Habitacion no encontrada" }, { status: 404 })
        if (room.leaseOrdersRoom.length > 0) return NextResponse.json({ message: "La habitacion ya tiene una orden de arriendo" }, { status: 400 })
        //Verificar que la habitacion corresponda al la propiedad
        if (property.id !== room.propertyId) return NextResponse.json({ message: "La habitacion no corresponde a la propiedad" }, { status: 404 })
        //Buscar y verificar que el dueño exista    
        const owner = await Owner.findByPk(data.ownerId)
        if (!owner) return NextResponse.json({ message: "Dueño no encontrado" }, { status: 404 })
        //Verificar que la propiedad corresponda al dueño
        if (owner.id !== property.ownerId) return NextResponse.json({ message: "La propiedad no corresponde al dueño" }, { status: 404 })
        //Buscar y verificar que el cliente exista
        const client = await Client.findByPk(data.clientId)
        if (!client) return NextResponse.json({ message: "Cliente no encontrado" }, { status: 404 })

        const leaseOrder = await LeaseOrderRoom.create({ ...data, status: "IN_PROGRESS" })
        const roomsAvaibles = property.rooms.filter(room => room.status === "FREE")
        if (roomsAvaibles.length === 0) {
            property.status = "RESERVED"
            await property.save()
        }
        return NextResponse.json(leaseOrder, { message: "Orden creada con exito" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}