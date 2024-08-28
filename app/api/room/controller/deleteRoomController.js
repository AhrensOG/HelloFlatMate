import { Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteRoom(data) {
    if (data) {
        if (Array.isArray(data.rooms) && data.rooms.length > 0) {
            for (let i = 0; i < data.rooms.length; i++) {
                try {
                    const room = await Room.findByPk(data.rooms[i])
                    if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });
                    await room.destroy();
                } catch (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }
            }
            return NextResponse.json("Habitaciones eliminadas", { status: 200 });
        } else {
            try {
                const room = await Room.findByPk(data);
                if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });
                await room.destroy();
                return NextResponse.json("Habitacion eliminada", { status: 200 });
            } catch (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
        }
    } else {
        return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    }
}