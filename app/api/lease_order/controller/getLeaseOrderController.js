import { NextResponse } from "next/server";
import { LeaseOrder } from "@/db/init";

export async function getAllLeaseOrders() {
    try {
        const LeaseOrders = await LeaseOrder.findAll()
        return NextResponse.json(LeaseOrders, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function getLeaserOrderById(id) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 })
    try {
        const LeaseOrder = await LeaseOrder.findByPk(id)
        return NextResponse.json(LeaseOrder, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}