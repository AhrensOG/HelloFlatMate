import { Contract, LeaseOrderProperty, LeaseOrderRoom, Property, Room, Supply } from "@/db/init"
import { NextResponse } from "next/server"
export async function createContract(data) {

    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    if (!(data.propertyId > 0 || data.roomId > 0)) return NextResponse.json({ message: "No property id provided" }, { status: 400 })
    if (!data.name || data.name.trim() === "") return NextResponse.json({ message: "No contract name provided" }, { status: 400 })
    if (!data.url || data.url.trim() === "") return NextResponse.json({ message: "No contract url provided" }, { status: 400 })

    try {
        const transaction = await Contract.sequelize.transaction();
        try {
            let contractData
            let leaseOrder
            let room
            if (data.roomId) {
                room = await Room.findByPk(data.roomId)
                leaseOrder = await LeaseOrderRoom.findOne({ where: { roomId: data.roomId } })
                contractData = {
                    name: data.name,
                    url: data.url,
                    ownerId: data.ownerId,
                    clientId: data.clientId,
                    contractableId: data.roomId,
                    contractableType: "ROOM",
                    status: "APPROVED",
                }
            } else {
                leaseOrder = await LeaseOrderProperty.findOne({ where: { propertyId: data.propertyId } })
                contractData = {
                    name: data.name,
                    url: data.url,
                    ownerId: data.ownerId,
                    clientId: data.clientId,
                    contractableId: data.propertyId,
                    contractableType: "PROPERTY",
                    status: "APPROVED",
                }
            }

            if (leaseOrder) {
                leaseOrder.isSigned = true
                leaseOrder.inReview = false
                await leaseOrder.save()
                await transaction.commit();
            } else {
                await transaction.rollback();
                return NextResponse.json({ message: "Property or Room not found" }, { status: 400 })
            }
            const contract = await Contract.create(contractData)
            const currentDate = new Date();
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 5); // Establecer 5 días en el futuro

            await Supply.bulkCreate([
            {
                name: "Depósito",
                amount: 300,
                date: currentDate,
                status: "PENDING",
                propertyId: data.propertyId || room.propertyId,
                clientId: data.clientId,
                reference: data.reference || "",
                type: "EXPENSES",
                expirationDate: expirationDate
            },
            {
                name: "Suministros",
                amount: 200, 
                date: currentDate,
                status: "PENDING",
                propertyId: data.propertyId || room.propertyId,
                clientId: data.clientId,
                reference: data.reference || "",
                type: "ELECTRICITY",
                expirationDate: expirationDate
            },
            {
                name: "Wifi",
                amount: 80,
                date: currentDate,
                status: "PENDING",
                propertyId: data.propertyId || room.propertyId,
                clientId: data.clientId,
                reference: data.reference || "",
                type: "INTERNET",
                expirationDate: expirationDate
            },
            {
                name: "Tasa de la agencia",
                amount: 459.80, // 380€ + IVA
                date: currentDate,
                status: "PENDING",
                propertyId: data.propertyId || room.propertyId,
                clientId: data.clientId,
                reference: data.reference || "",
                type: "EXPENSES",
                expirationDate: expirationDate
            }
            ]);

            return NextResponse.json({ message: "Contract created successfully" }, { status: 200 })
        } catch (error) { await transaction.rollback(); return NextResponse.json({ message: "Contract not created" }, { status: 400 }) }
    } catch (error) {
        return NextResponse.json({ message: "Contract not created" }, { status: 400 })
    }
}