import { RentalItem, RentalPeriod, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRoom(data) {
    if (!data) {
        return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    }

    const isArray = Array.isArray(data);
    const dataArray = isArray ? data : [data];  // Asegurarse de que sea un array

    try {
        const createdRooms = []; // Array para almacenar las habitaciones creadas

        for (const roomData of dataArray) {
            // Si el precio no está definido, asignar 0
            const price = roomData.price || 0;
            const amountHelloflatmate = roomData.amountHelloflatmate || 0;
            const amountOwner = price - amountHelloflatmate;

            // Verificar si todos los campos obligatorios están presentes
            const requiredFields = [
                roomData.name,
                roomData.serial,
                roomData.numberBeds,
                roomData.typology,
                roomData.zone,
                roomData.bathroom,
                roomData.couple,
            ];

            // Verificar si la habitación está completa
            const isComplete = requiredFields.every(field => field !== undefined && field !== null);

            try {
                // Crear la habitación
                const room = await Room.create({
                    ...roomData,
                    price: price,  // Precio ajustado, 0 si no está definido
                    amountOwner: amountOwner,  // Calculado si hay un precio
                    status: "FREE",  // Si no hay status, se asigna "FREE"
                    isActive: isComplete,  // Si los campos obligatorios no están completos, isActive será false
                });

                // Almacenar la habitación creada
                createdRooms.push(room);

                // Verificar si tiene períodos de alquiler asociados
                if (roomData.rentalPeriods && roomData.rentalPeriods?.length > 0) {
                    // Crear los períodos de alquiler si están presentes
                    const rentalPeriods = roomData.rentalPeriods.map((rental)=>{
                        return {
                            relatedId: room.id,
                            relatedType: "ROOM",
                            rentalPeriodId: rental
                        }
                    })

                    // Crear los períodos de alquiler en la base de datos
                    await RentalItem.bulkCreate(rentalPeriods);
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
