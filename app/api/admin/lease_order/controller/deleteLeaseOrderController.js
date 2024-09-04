import { NextResponse } from "next/server";
import { LeaseOrderProperty, LeaseOrderRoom } from "@/db/init";

export async function deleteLeaseOrder(data) {
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 })
    if (!data.type || data.type.trim() === "") {
        return NextResponse.json({ error: "Se requiere el tipo" }, { status: 400 })
    }
    try {
        //Verificar que exista la orden
        if (data.type === "property") {
            const leaseOrder = await LeaseOrderProperty.findByPk(data.id)
            if (!leaseOrder) return NextResponse.json({ message: "La orden no existe" }, { status: 404 })

            await LeaseOrderProperty.destroy({ where: { id: data.id } })
            return NextResponse.json({ message: "Orden eliminada con exito" }, { status: 200 })
        }

        await LeaseOrderRoom.destroy({ where: { id: data.id } })
        return NextResponse.json({ message: "Orden eliminada con exito" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}