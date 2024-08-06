import { Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllRooms() {

    try {
        const rooms = await Room.findAll();
        return NextResponse.json(rooms, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las habitaciones" }, { status: 500 });
    }
}

export async function getRoomById(id) {
    try {
        const room = await Room.findByPk(id);
        if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });

        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener la habitacion" }, { status: 500 });
    }
}