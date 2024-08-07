import { Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateRoom(id, data) {

    if (!data) return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    if (data.name.trim() === '') return NextResponse.json({ error: "Se requieren nombre" }, { status: 400 });
    if (data.numberBeds <= 0 || data.numberBeds === '') return NextResponse.json({ error: "Se requieren numero de camas" }, { status: 400 });
    if (data.image.trim() === '') return NextResponse.json({ error: "Se requieren imagen" }, { status: 400 });

    try {
        const room = await Room.findByPk(id);
        if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });

        await room.update(data);
        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar la habitacion" }, { status: 500 });
    }
}