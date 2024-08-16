import { Room, RoomWithPrice } from "@/db/init";
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


export async function setProperty(data) {
    console.log(data);

    if (!data || !data.ids || !data.propertyId || !data.category) {
        return NextResponse.json({ error: "Se requiere la informacion" }, { status: 400 });
    }
    if (Array.isArray(data.ids)) {
        if (data.category === "HELLO_ROOM" || data.category === "HELLO_COLIVING") {
            for (let i = 0; i < data.ids.length; i++) {
                try {
                    const room = await RoomWithPrice.findByPk(data.ids[i]);
                    if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });
                    room.propertyId = data.propertyId;
                    await room.save();
                } catch (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }
            }
            return NextResponse.json(data, { status: 200 });
        }
        if (data.category === "HELLO_STUDIO" || data.category === "HELLO_LANDLORD") {
            for (let i = 0; i < data.ids.length; i++) {
                try {
                    const room = await Room.findByPk(data.ids[i]);
                    if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });
                    room.propertyWithPriceId = data.propertyId;
                    await room.save();
                    return NextResponse.json(data, { status: 200 });
                } catch (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }
            }
            return NextResponse.json(data, { status: 200 });
        }
    } else {
        return NextResponse.json({ error: "Se requiere la informacion" }, { status: 400 });
    }
}