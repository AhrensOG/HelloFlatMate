import { Room, RoomWithPrice } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRoom(data) {
    console.log(data);

    if (!data) {
        return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    }

    const isArray = Array.isArray(data);
    const dataArray = isArray ? data : [data];

    const errors = dataArray.map((room, index) => {
        if (!room.name || room.name.trim() === '') return `Error en habitación ${index + 1}: Se requiere el nombre.`;
        if (room.numberBeds <= 0 || room.numberBeds === '') return `Error en habitación ${index + 1}: Se requiere un número válido de camas.`;
        if (!room.images || !Array.isArray(room.images) || room.images.length === 0) return `Error en habitación ${index + 1}: Se requiere una imagen.`;
        if (room.couple !== true && room.couple !== false) return `Error en habitación ${index + 1}: Se requiere saber si admite parejas.`;
        if (room.bathroom !== true && room.bathroom !== false) return `Error en habitación ${index + 1}: Se requiere saber si tiene baño privado.`;
        return null;
    }).filter(error => error);

    if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    try {
        const addStatus = dataArray.map((room) => ({ ...room, status: "FREE", amountOwner: (room.price - room.amountHelloflatmate || 0) }));

        if (isArray) {
            const rooms = await Room.bulkCreate(addStatus);
            return NextResponse.json(rooms, { status: 200 });
        } else {
            return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error al crear las habitaciones", details: error.message }, { status: 500 });
    }
}
