import { NextResponse } from "next/server";
import { Admin, Client, LeaseOrder, Owner, Property } from "@/db/init";

export async function updateLeaseOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.adminId || data.adminId.trim() === "") return NextResponse.json({ message: "No admin id provided" }, { status: 400 })
    if (!data.id || data.id <= 0) return NextResponse.json({ message: "No order id provided" }, { status: 400 })
    if (!data.date) return NextResponse.json({ message: "No date provided" }, { status: 400 })
    if (!data.startDate) return NextResponse.json({ message: "No start date provided" }, { status: 400 })
    if (!data.endDate) return NextResponse.json({ message: "No end date provided" }, { status: 400 })
    if (!data.price || data.price <= 0) return NextResponse.json({ message: "No price provided" }, { status: 400 })
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 })
    if (!data.status || data.status !== "PENDING" && data.status !== "APPROVED" && data.status !== "REJECTED") return NextResponse.json({ message: "No status provided" }, { status: 400 })

    try {
        //Buscar y verificar que la orden exista
        const leaseOrder = await LeaseOrder.findByPk(data.id)
        if (!leaseOrder) return NextResponse.json({ message: "Lease order not found" }, { status: 404 })
        //Buscar y verificar que el admin exista
        const admin = await Admin.findByPk(data.adminId)
        if (!admin) return NextResponse.json({ message: "Admin not found" }, { status: 404 })
        //Buscar y verificar que la propiedad exista
        const property = await Property.findByPk(data.propertyId)
        if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 })
        //Buscar y verificar que el dueño exista    
        const owner = await Owner.findByPk(data.ownerId)
        if (!owner) return NextResponse.json({ message: "Owner not found" }, { status: 404 })
        //Buscar y verificar que el cliente exista
        const client = await Client.findByPk(data.clientId)
        if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 })

        //Modificar la orden
        const updatedLeaseOrder = await leaseOrder.update({ ...data })
        return NextResponse.json(updatedLeaseOrder, { message: "Orden actualizada con exito" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function updateStatusLeaseOrder(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.action || data.status !== "REJECTED" && data.status !== "APPROVED") return NextResponse.json({ message: "No status provided" }, { status: 400 })
    if (!data.leaseOrderId || data.leaseOrderId <= 0) return NextResponse.json({ message: "No lease order id provided" }, { status: 400 })
    if (!data.adminId || data.adminId <= 0) return NextResponse.json({ message: "No admin id provided" }, { status: 400 })

    try {
        //Buscar y verificar que la orden exista
        const leaseOrder = await LeaseOrder.findByPk(data.leaseOrderId)
        if (!leaseOrder) return NextResponse.json({ message: "Lease order not found" }, { status: 404 })
        //Buscar y verificar que el admin exista
        const admin = await Admin.findByPk(data.adminId)
        if (!admin) return NextResponse.json({ message: "Admin not found" }, { status: 404 })

        //Cambiar el estado de la orden
        const approvedLeaseOrder = await leaseOrder.update({ status: data.status })
        return NextResponse.json(approvedLeaseOrder, { message: "Orden rechazada con exito" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}