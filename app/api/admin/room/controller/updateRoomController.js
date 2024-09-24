import { RentalPeriod, Room, RoomWithPrice } from "@/db/init";
import message from "@/db/models/message";
import { NextResponse } from "next/server";

export async function updateRoom(id, data) {
    console.log(data);

    if (!data) return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].name || data[i].name.trim() === '') return NextResponse.json({ error: "Se requieren nombre" }, { status: 400 });
            if (data[i].numberBeds <= 0 || data[i].numberBeds === '') return NextResponse.json({ error: "Se requieren numero de camas" }, { status: 400 });
            if (data[i].images.length === 0) return NextResponse.json({ error: "Se requieren imagen" }, { status: 400 });

            try {
                const room = await Room.findByPk(data[i].id);
                if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });
                //Actualizar fechas
                if (data[i].rentalPeriods.length > 0) {
                    data[i].rentalPeriods.forEach(async (period) => {
                        await RentalPeriod.update(period, {
                            where: {
                                id: period.id
                            }
                        })
                    })
                }

                //Crear Fechas en caso que agregaran nuevas
                if (data[i].newRentalPeriods.length > 0) {
                    data[i].newRentalPeriods.forEach(async (period) => {
                        await RentalPeriod.create({ startDate: new Date(period.startDate), endDate: new Date(period.endDate), rentalPeriodableId: data[i].id, rentalPeriodableType: "ROOM" })
                    })
                }

                //Borrar fechas
                if (data[i].deleteRentalPeriod.length > 0) {
                    data[i].deleteRentalPeriod.forEach(async (period) => {
                        await RentalPeriod.destroy({
                            where: {
                                id: period
                            }
                        })
                    })
                }
                await room.update(data[i]);
            } catch (error) {
                return NextResponse.json({ error: "Error al actualizar la habitacion" }, { status: 500 });
            }
        }
        return NextResponse.json({ message: "Habitaciones actualizadas" }, { status: 200 });
    }
    if (data.name.trim() === '') return NextResponse.json({ error: "Se requieren nombre" }, { status: 400 });
    if (data.numberBeds <= 0 || data.numberBeds === '') return NextResponse.json({ error: "Se requieren numero de camas" }, { status: 400 });
    if (data.images.length === 0) return NextResponse.json({ error: "Se requieren imagen" }, { status: 400 });

    try {

        const room = await Room.findByPk(id);

        if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });

        //Actualizar fechas
        if (data.rentalPeriods.length > 0) {
            data.rentalPeriods.forEach(async (period) => {
                await RentalPeriod.update(period, {
                    where: {
                        id: period.id
                    }
                })
            })
        }

        //Crear Fechas en caso que agregaran nuevas
        if (data.newRentalPeriods.length > 0) {
            data.newRentalPeriods.forEach(async (period) => {
                await RentalPeriod.create({ startDate: new Date(period.startDate), endDate: new Date(period.endDate), rentalPeriodableId: room.id, rentalPeriodableType: "ROOM" })
            })
        }

        //Borrar fechas
        if (data.deleteRentalPeriod.length > 0) {
            data.deleteRentalPeriod.forEach(async (period) => {
                await RentalPeriod.destroy({
                    where: {
                        id: period
                    }
                })
            })
        }

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

    if (!data || !data.ids || !data.propertyId) {
        return NextResponse.json({ error: "Se requiere la informacion" }, { status: 400 });
    }
    if (Array.isArray(data.ids)) {
        for (let i = 0; i < data.ids.length; i++) {
            try {
                const room = await Room.findByPk(data.ids[i]);
                if (!room) return NextResponse.json({ error: "Habitacion no encontrada" }, { status: 404 });
                room.propertyId = data.propertyId;
                await room.save();
            } catch (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
        }
        return NextResponse.json(data, { status: 200 });

    } else {
        return NextResponse.json({ error: "Se requiere la informacion" }, { status: 400 });
    }
}