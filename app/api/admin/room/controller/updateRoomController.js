import { RentalItem, RentalPeriod, Room, RoomWithPrice } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateRoom(id, data) {
        
    if (!data) return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });

    // Validar datos según la categoría
    const validateRoomData = (roomData) => {
        const isBaseComplete =
            roomData.name && roomData.name.trim() !== '' &&
            roomData.numberBeds && roomData.numberBeds > 0 &&
            roomData.images && roomData.images.length > 0 &&
            roomData.typology && roomData.zone !== undefined;

        // Validar campos relacionados con el precio según la categoría
        if (roomData.category === "HELLO_ROOM" || roomData.category === "HELLO_COLIVING") {
            return isBaseComplete;  // Para estas categorías, no se requiere precio mayor a 0
        } else if (roomData.category === "HELLO_STUDIO" || roomData.category === "HELLO_LANDLORD") {
            return isBaseComplete && roomData.price && roomData.price > 0 && roomData.IVA >= 0 && roomData.amountHelloflatmate >= 0;
        }
        return false; // Si la categoría no es válida o faltan campos obligatorios
    };

    if (Array.isArray(data) && data.length > 0) {
        console.log("entre al primer if");
        
        for (let i = 0; i < data.length; i++) {
            // Validación de cada habitación
            const isComplete = validateRoomData(data[i]);

            try {
                const room = await Room.findByPk(data[i].id);
                if (!room) return NextResponse.json({ error: "Habitación no encontrada" }, { status: 404 });
            
                // Manejar los rentalItems
                if (data[i].rentalPeriods?.length > 0) {
                    const rentalItemsRoom = await RentalItem.findAll({
                        where: {
                            relatedId: data[i].id,
                            relatedType: "ROOM"
                        }
                    });
            
                    const rentalIds = rentalItemsRoom.map((item) => item.rentalPeriodId);
            
                    // Crear nuevas RentalItems si es necesario
                    const createRentalItemPromises = data[i].rentalPeriods?.map(async (period) => {
                        if (!rentalIds.includes(period.id)) {
                            return await RentalItem.create({
                                rentalPeriodId: period.id,
                                relatedId: data[i].id,
                                relatedType: "ROOM",
                                isFree: true
                            });
                        }
                    });
            
                    await Promise.all(createRentalItemPromises);
                    
                }
            
                // Borrar fechas si es necesario
                if (data[i].deleteRentalPeriods?.length > 0) {
                    await Promise.all(data[i].deleteRentalPeriods.map(async (period) => {
                        await RentalItem.destroy({
                            where: {
                                id: period,
                                relatedType:"ROOM",
                                relatedId: data[i].id
                            }
                        });
                    }));
                }
            
                // Actualizar la habitación
                await room.update({ ...data[i], isActive: isComplete });
            } catch (error) {
                return NextResponse.json({ error: "Error al actualizar la habitación" }, { status: 500 });
            }
        }
        return NextResponse.json({ message: "Habitaciones actualizadas" }, { status: 200 });
    }

    // Validar los datos de la habitación individual
    const isComplete = validateRoomData(data);

    try {
        const room = await Room.findByPk(id);
        if (!room) return NextResponse.json({ error: "Habitación no encontrada" }, { status: 404 });
        // Actualizar fechas existentes

        // Crear nuevas fechas si se agregaron
        if (data.rentalPeriods?.length > 0) {
            const rentalItems = await RentalItem.findAll({
                where: {
                    relatedId: id,
                    relatedType: "ROOM"
                }
            })

            const rentalIds = rentalItems.map((item) => item.rentalPeriodId);

            const createRentalItemPromises = data.rentalPeriods.map(async (period) => {
                if (!rentalIds.includes(period.id)) {
                    return await RentalItem.create({
                        rentalPeriodId: period.id,
                        relatedId: id,
                        relatedType: "ROOM",
                        isFree: true
                    });
                }
            });
            await Promise.all(createRentalItemPromises);
        }


        // Borrar fechas si es necesario
        if (data.deleteRentalPeriods?.length > 0) {
            await Promise.all(data.deleteRentalPeriods?.map(async (period) => {
                await RentalItem.destroy({
                    where: {
                        rentalPeriodId: period,
                        relatedType:"ROOM",
                        relatedId: room.id
                    }
                })
            }));
        }

        // Actualizar la habitación y definir isActive según la validación
        await room.update({ ...data, isActive: isComplete });
        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar la habitación" }, { status: 500 });
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