import { Room, RoomWithPrice } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRoom(data) {

    if (!data) {
        return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    }

    const isArray = Array.isArray(data);
    const dataArray = isArray ? data : [data];
    const havePrice = dataArray.some(room => room.price !== undefined);

    const errors = dataArray.map((room, index) => {
        if (!room.name || room.name.trim() === '') return `Error en habitación ${index + 1}: Se requiere el nombre.`;
        if (room.numberBeds <= 0 || room.numberBeds === '') return `Error en habitación ${index + 1}: Se requiere un número válido de camas.`;
        if (!room.images || !Array.isArray(room.images) || room.images.length === 0) return `Error en habitación ${index + 1}: Se requiere una imagen.`;
        return null;
    }).filter(error => error);

    if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    try {
        const addStatus = dataArray.map((room) => ({ ...room, status: "FREE" }));

        let rooms;
        if (isArray) {
            if (havePrice) {
                rooms = await RoomWithPrice.bulkCreate(addStatus);
            } else {
                rooms = await Room.bulkCreate(addStatus);
            }
        } else {
            return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
        }

        console.log("Habitaciones creadas:", rooms);

        return Response.json({ message: "Habitaciones creadas" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al crear las habitaciones", details: error.message }, { status: 500 });
    }
}
