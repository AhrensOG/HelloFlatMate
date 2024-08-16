import { Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRoom(data) {
    if (!data) return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });

    const errors = data.map((room, index) => {
        if (!room.name || room.name.trim() === '') return `Error en habitación ${index + 1}: Se requiere el nombre.`;
        if (room.numberBeds <= 0 || room.numberBeds === '') return `Error en habitación ${index + 1}: Se requiere un número válido de camas.`;
        if (!room.image || room.image.trim() === '') return `Error en habitación ${index + 1}: Se requiere una imagen.`;
        return null;
    }).filter(error => error);

    if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    try {
        console.log("Datos recibidos:", data);  // Imprimir datos para verificación
        let addStatus = data.map((room) => {
            return { ...room, status: "FREE" }
        })
        const rooms = await Room.bulkCreate(addStatus);
        return NextResponse.json({ rooms }, { status: 201 });
    } catch (error) {
        console.error("Error al crear habitaciones:", error);  // Registrar el error
        return NextResponse.json({ error: "Error al crear las habitaciones", details: error.message }, { status: 500 });
    }
}
