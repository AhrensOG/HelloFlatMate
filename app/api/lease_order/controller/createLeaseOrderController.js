import { NextResponse } from "next/server";
import { Client, LeaseOrder, Owner, Property } from "@/db/init";

export async function createLeaseOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (data.date == null) return NextResponse.json({ message: "No date provided" }, { status: 400 })
    if (data.startDate == null) return NextResponse.json({ message: "No start date provided" }, { status: 400 })
    if (data.endDate == null) return NextResponse.json({ message: "No end date provided" }, { status: 400 })
    if (data.price == null || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 })
    if (data.ownerId == null || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    if (data.clientId == null || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    if (data.propertyId == null || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 })

    try {

        //Buscar y verificar que la propiedad exista
        const property = await Property.findByPk(data.propertyId)
        if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 })
        //Buscar y verificar que el dueño exista    
        const owner = await Owner.findByPk(data.ownerId)
        if (!owner) return NextResponse.json({ message: "Owner not found" }, { status: 404 })
        //Buscar y verificar que el cliente exista
        const client = await Client.findByPk(data.clientId)
        if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 })

        const leaseOrder = await LeaseOrder.create({ ...data, status: "PENDING" })
        return NextResponse.json(leaseOrder, { message: "Orden creada con exito" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}