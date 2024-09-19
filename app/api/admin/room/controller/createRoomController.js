import { RentalPeriod, Room } from "@/db/init";
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
        const addStatus = dataArray.map((room) => ({
            ...room,
            status: "FREE",
            amountOwner: (room.price - room.amountHelloflatmate || 0)
        }));

        const createdRooms = []; // Array para almacenar las habitaciones creadas

        if (Array.isArray(addStatus)) {
            for (const roomData of addStatus) {
                try {
                    // Crear la habitación
                    const room = await Room.create(roomData);

                    // Almacenar la habitación creada
                    createdRooms.push(room);

                    // Verificar si tiene períodos de alquiler asociados
                    if (roomData.rentalPeriod) {
                        // Crear los períodos de alquiler
                        const rentalPeriods = roomData.rentalPeriod.map((rental) => ({
                            startDate: new Date(rental.startDate),
                            endDate: new Date(rental.endDate),
                            status: "FREE",
                            rentalPeriodableId: room.id, // Usar el ID de la habitación recién creada
                            rentalPeriodableType: "ROOM",
                        }));

                        // Crear los períodos de alquiler en la base de datos
                        await RentalPeriod.bulkCreate(rentalPeriods);
                    }

                    console.log(`Room ${room.id} and its rental periods created successfully.`);
                } catch (error) {
                    console.error(`Error creating room or rental periods: ${error.message}`);
                    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
                }
            }
        } else {
            return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
        }

        // Retornar las habitaciones creadas en la respuesta
        return NextResponse.json(createdRooms, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error al crear las habitaciones", details: error.message }, { status: 500 });
    }
}
