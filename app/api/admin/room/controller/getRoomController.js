import { Property, Room } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getAllRooms() {
    try {
        const rooms = await Room.findAll({
            attributes: ["id", "serial", "price", "name", "status", "couple", "floor", "door", "typology", "isActive"],
            include: [
                {
                    model: Property,
                    as: "property", // Esto es importante: Debe coincidir con el alias de la asociación
                    attributes: ["id", "city", "street", "streetNumber", "zone", "ownerId", "typology", "category"],
                },
            ],
            where: { status: { [Op.ne]: "DELETED" } },
        });
        if (!rooms) {
            return NextResponse.json({ error: "Habitaciones no encontradas" }, { status: 404 });
        }

        return NextResponse.json(rooms, { status: 200 });
    } catch (error) {
        console.error("Error al obtener las habitaciones:", error); // Muy importante para depurar
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
