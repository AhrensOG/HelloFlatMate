import { LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteLeaseOrderForReservationPanel(id) {
  if (!id) {
    return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
  }
  try {
    const lo = await LeaseOrderRoom.findByPk(id);
    if (!lo) {
      return NextResponse.json(
        { message: "La orden no existe" },
        { status: 404 }
      );
    }
    await LeaseOrderRoom.destroy({ where: { id } });
    return NextResponse.json(
      { message: "Orden eliminada con exito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
