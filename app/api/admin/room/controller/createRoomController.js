import { RentalItem, RentalPeriod, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRoom(data) {
    if (!data) {
        return NextResponse.json({ error: "Se requieren datos" }, { status: 400 });
    }

    const isArray = Array.isArray(data);
    const dataArray = isArray ? data : [data]; // Asegurarse de que sea un array

    try {
        const createdRooms = []; // Array para almacenar las habitaciones creadas

        for (const roomData of dataArray) {
            // Si el precio no está definido, asignar 0
            const price = roomData.price || 0;
            const amountHelloflatmate = roomData.amountHelloflatmate || 0;
            const amountOwner = price - amountHelloflatmate;

            // Transformar los campos de tipo ARRAY para asegurarse de que sean válidos
            const description = Array.isArray(roomData.description) ? roomData.description : [];
            const images = Array.isArray(roomData.images) ? roomData.images : [];
            const tags = Array.isArray(roomData.tags) ? roomData.tags : [];

            // Crear la habitación
            const room = await Room.create({
                ...roomData,
                price: price, // Precio ajustado, 0 si no está definido
                amountOwner: amountOwner, // Calculado si hay un precio
                status: "FREE", // Si no hay status, se asigna "FREE"
                isActive: roomData.isActive || false, // Default false si no está definido
                description: description, // Asegurar que sea un array
                images: images, // Asegurar que sea un array
                tags: tags, // Asegurar que sea un array
            });

            // Almacenar la habitación creada
            createdRooms.push(room);

            // Verificar si tiene períodos de alquiler asociados
            if (roomData?.rentalPeriods && roomData.rentalPeriods?.length > 0) {
                const rentalPeriods = roomData.rentalPeriods.map((rental) => ({
                    relatedId: room.id,
                    relatedType: "ROOM",
                    rentalPeriodId: rental,
                }));

                await RentalItem.bulkCreate(rentalPeriods);
            }

            console.log(`Room ${room.id} and its rental periods created successfully.`);
        }

        return NextResponse.json(createdRooms, { status: 201 });
    } catch (error) {
        console.error(`Error al crear las habitaciones: ${error.message}`);
        return NextResponse.json({ error: "Error al crear las habitaciones", details: error.message }, { status: 500 });
    }
}
