import { RentalPeriod, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRoom(data) {
    if (!data) {
        return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    }

    console.log(data);

    const isArray = Array.isArray(data);
    const dataArray = isArray ? data : [data];  // Asegurarse de que sea un array

    try {
        // Mapeamos las habitaciones a crear, agregando valores predeterminados si faltan
        const addStatus = dataArray.map((room) => ({
            ...room,
            status: "FREE",  // Si no hay status, se asigna "FREE"
            amountOwner: room.price ? (room.price - room.amountHelloflatmate || 0) : 0,  // Calculo básico del dueño
        }));

        const createdRooms = []; // Array para almacenar las habitaciones creadas

        for (const roomData of addStatus) {
            try {
                // Crear la habitación
                const room = await Room.create(roomData);  // Crea la habitación con los datos disponibles

                // Almacenar la habitación creada
                createdRooms.push(room);

                // Verificar si tiene períodos de alquiler asociados
                if (roomData.rentalPeriods && roomData.rentalPeriods.length > 0) {
                    // Crear los períodos de alquiler si están presentes
                    const rentalPeriods = roomData.rentalPeriods.map((rental) => ({
                        startDate: new Date(rental.startDate),
                        endDate: new Date(rental.endDate),
                        status: "FREE",
                        rentalPeriodableId: room.id, // Asignar el ID de la habitación creada
                        rentalPeriodableType: "ROOM",
                    }));

                    // Crear los períodos de alquiler en la base de datos
                    await RentalPeriod.bulkCreate(rentalPeriods);
                }

                console.log(`Room ${room.id} and its rental periods created successfully.`);
            } catch (error) {
                console.error(`Error creating room or rental periods: ${error.message}`);
                throw error;  // Manejar el error si es necesario
            }
        }

        // Retornar las habitaciones creadas en la respuesta
        return NextResponse.json(createdRooms, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error al crear las habitaciones", details: error.message }, { status: 500 });
    }
}
