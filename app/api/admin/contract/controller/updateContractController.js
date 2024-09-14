import { Contract } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateStatusContract(data) {

    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 })
    if (!data.contractId || data.contractId <= 0) return NextResponse.json({ message: "No contract id provided" }, { status: 400 })
    if (!data.status || data.status.trim() === "" || data.status !== "APPROVED" && data.status !== "REJECTED") return NextResponse.json({ message: "No status provided" }, { status: 400 })

    try {
        const transaction = await Contract.sequelize.transaction();
        try {
            const contract = await Contract.findByPk(data.contractId)
            contract.status = data.status
            await contract.save()
            await transaction.commit();
            return NextResponse.json({ message: "Contract updated successfully" }, { status: 200 })
        } catch (error) { await transaction.rollback(); return NextResponse.json({ message: "Contract not updated" }, { status: 400 }) }
    } catch (error) { return NextResponse.json({ message: "Contract not updated" }, { status: 400 }) }
}