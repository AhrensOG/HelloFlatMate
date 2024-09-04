import { NextResponse } from "next/server";
import { LeaseOrderProperty, LeaseOrderRoom } from "@/db/init";

export async function getLeaserOrderById(id, type) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 })
    try {
        if (type === "property") {
            const LeaseOrder = await LeaseOrderProperty.findByPk(id)
            return NextResponse.json(LeaseOrder, { status: 200 })
        }

        const LeaseOrder = await LeaseOrderRoom.findByPk(id)
        return NextResponse.json(LeaseOrder, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}