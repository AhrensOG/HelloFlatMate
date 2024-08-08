import { NextResponse } from "next/server";
import { LeaseOrder } from "@/db/init";

export async function deleteLeaseOrder(id) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 })
    try {
        //Verificar que exista la orden
        if (await LeaseOrder.count({ where: { id } }) === 0) return NextResponse.json({ message: "La orden no existe" }, { status: 404 })

        //Eliminar la orden
        const leaseOrder = await LeaseOrder.destroy({ where: { id } })
        return NextResponse.json({ message: "Orden eliminada con exito" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}