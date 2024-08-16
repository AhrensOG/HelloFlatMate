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

export async function updateStatusRoom(data) {
    if (!data) {
        return NextResponse.json({ error: "Se requiere datos" }, { status: 400 });
    }
    if (!data.id || typeof data.id !== "number") {
        return NextResponse.json({ error: "Se requiere el id de la habitación" }, { status: 400 });
    }
    if (!data.status || typeof data.status !== "string") {
        return NextResponse.json({ error: "Se requiere el estado de la habitación" }, { status: 400 });
    }

    if (data.status !== "FREE" && data.status !== "RESERVED" && data.status !== "OCCUPIED") {
        return NextResponse.json({ error: "El estado de la habitación no es valido" }, { status: 400 });
    }
    try {
        const room = await Room.findByPk(data.id);
        if (!room) return NextResponse.json({ error: "Habitación no encontrada" }, { status: 404 });
        if (data.status === "RESERVED" && room.status === "RESERVED") {
            return NextResponse.json({ error: "Habitación ya reservada" }, { status: 400 });
        }
        room.status = data.status;
        await room.save()
        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar la habitación" }, { status: 500 });
    }
}