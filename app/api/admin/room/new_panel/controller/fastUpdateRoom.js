import { Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function fastUpdateRoom(id, data) {
    if (!data)
        return NextResponse.json(
            { error: "Se requieren datos" },
            { status: 400 }
        );

    try {
        const room = await Room.findByPk(id);
        if (!room)
            return NextResponse.json(
                { error: "Habitación no encontrada" },
                { status: 404 }
            );

        await room.update({
            isActive: data.isActive,
            name: data.name,
            price: data.price,
        });
        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar la habitación" },
            { status: 500 }
        );
    }
}
