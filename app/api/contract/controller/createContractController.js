import { Contract } from "@/db/init"
import { NextResponse } from "next/server"
export async function createContract(data) {
    console.log(data);

    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.ownerId || data.ownerId.trim() === "") return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    if (!data.clientId || data.clientId.trim() === "") return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ message: "No property id provided" }, { status: 400 })
    if (!data.name || data.name.trim() === "") return NextResponse.json({ message: "No contract name provided" }, { status: 400 })
    if (!data.url || data.url.trim() === "") return NextResponse.json({ message: "No contract url provided" }, { status: 400 })

    try {
        const transaction = await Contract.sequelize.transaction();
        try {
            const contract = await Contract.create({
                name: data.name,
                url: data.url,
                ownerId: data.ownerId,
                clientId: data.clientId,
                propertyId: data.propertyId
            })
            return NextResponse.json({ message: "Contract created successfully" }, { status: 200 })
        } catch (error) { await transaction.rollback(); return NextResponse.json({ message: "Contract not created" }, { status: 400 }) }
    } catch (error) {
        return NextResponse.json({ message: "Contract not created" }, { status: 400 })
    }
}