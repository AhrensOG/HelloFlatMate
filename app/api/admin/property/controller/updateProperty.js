import { Chat, ChatParticipant, Property, RentalItem, RentalPeriod, Room } from "@/db/init";
import { NextResponse } from "next/server";
import { sequelize } from "@/db/models/comment";

export async function updateProperty(id, data) {
    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }
    if (!id) {
        return NextResponse.json({ error: "El id no puede estar vacío o no es un número" }, { status: 400 });
    }

    // Validación de los campos requeridos
    const requiredFields = {
        name: data.name,
        serial: data.serial,
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber,
        postalCode: data.postalCode,
        size: data.size,
        roomsCount: data.roomsCount,
        bathrooms: data.bathrooms,
        bed: data.bed,
        maximunOccupants: data.maximunOccupants,
        zone: data.zone,
    };

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];

    if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: "La categoría no es válida" }, { status: 400 });
    }

    // Verificar si alguno de los campos requeridos está vacío o incompleto
    const isComplete = Object.values(requiredFields).every(value => {
        return value !== undefined && value !== null && value !== "" && (typeof value !== "number" || value > 0);
    });

    try {
        const property = await Property.findByPk(id, { include: [{ model: Chat, as: "chats" }, { model: Room, as: "rooms", include: {model: Chat, as: "chats"} }] });
        if (!property) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }
        // Crear nuevas fechas de alquiler
        if (data.newRentalPeriods?.length > 0) {
            const alreadyRentalItems= await RentalItem.findAll({
                where: {
                    relatedId: property.id,
                    relatedType: "PROPERTY",
                }
            });

            const rentalPeriodIds= alreadyRentalItems.map((item)=>{
                return item.rentalPeriodId
            });
            

            const createRentalItems= data.newRentalPeriods?.map(async (item) => {
                if (!rentalPeriodIds.includes(item.id)) {
                    const rentalItem = await RentalItem.create({
                        relatedId: property.id,
                        relatedType: "PROPERTY",
                        rentalPeriodId: item.id,
                        isFree: true
                    });
                }
            })

            await Promise.all(createRentalItems);
        }

        /// Borrar fechas si es necesario
        if (data.deleteRentalPeriods?.length > 0) {

            await Promise.all(data.deleteRentalPeriods?.map(async (period) => {
                await RentalItem.destroy({
                    where: {
                        relatedId: property.id,
                        rentalPeriodId: period,
                        relatedType:"PROPERTY"
                    }
                })
            }));
        };

        if (data.ownerId && data.ownerId !== property.ownerId) {
            // Verificar si la propiedad tiene chats
            if (property.chats && property.chats.length > 0) {
                const chatPromises = property.chats.map(async (chat) => {
                    // Eliminar al antiguo propietario del chat
                    await ChatParticipant.destroy({
                        where: {
                            participantId: chat.ownerId,
                            chatId: chat.id,
                        },
                    });
        
                    // Agregar el nuevo propietario al chat
                    await ChatParticipant.create({
                        chatId: chat.id,
                        participantId: data.ownerId,
                        participantType: "OWNER",
                    });
        
                    // Actualizar el ownerId del chat
                    chat.ownerId = data.ownerId;
                    await chat.save();
                });
        
                // Ejecutar todas las promesas para modificar los chats
                await Promise.all(chatPromises);
            }
        
            // Verificar si la propiedad tiene cuartos
            if (property.rooms && property.rooms.length > 0) {
                const roomChatPromises = property.rooms.map(async (room) => {
                if (room.chats && room.chats.length > 0) {
                    const roomChats = room.chats.map(async (roomChat) => {
                        // Eliminar al antiguo propietario del chat del room
                        await ChatParticipant.destroy({
                            where: {
                                participantId: roomChat.ownerId,
                                chatId: roomChat.id,
                            },
                        });

                        // Agregar el nuevo propietario al chat del room
                        await ChatParticipant.create({
                            chatId: roomChat.id,
                            participantId: data.ownerId,
                            participantType: "OWNER",
                        });

                        // Actualizar el ownerId del chat del room
                        roomChat.ownerId = data.ownerId;
                        await roomChat.save();
                    });
                    return Promise.all(roomChats);
                }
            });
        
            // Ejecutar todas las promesas para los chats de las rooms
            await Promise.all(roomChatPromises);
            }
        }
        

        // Actualizar la propiedad y establecer isActive en función de si está completa o no
        await property.update({ ...data, isActive: isComplete });

        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 });
    }
}

export async function updateStatusProperty(data) {
    if (!data) {
        return NextResponse.json({ error: "Need data" }, { status: 400 })
    }
    if (!data.propertyId || data.propertyId.trim() === "") {
        return NextResponse.json({ error: "Need propertyId" }, { status: 400 })
    }
    if (!data.status || data.status.trim() === "") {
        return NextResponse.json({ error: "Need status" }, { status: 400 })
    }
    if (!data.status || data.status !== "FREE" && data.status !== "RESERVED" && data.status !== "OCCUPIED") {
        return NextResponse.json({ error: "Status not valid" }, { status: 400 })
    }

    const property = await Property.findByPk(data.propertyId);
    if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    if (property.status === "RESERVED" && data.status === "RESERVERD") {
        return NextResponse.json({ error: "Property already reserved" }, { status: 400 })
    }
    property.status = data.status;
    await property.save();
    return NextResponse.json(property, { status: 200 })
}

export async function cascadeUpdateByCategory(data) {
    if (!data) {
        return NextResponse.json({ error: "Need data" }, { status: 400 });
    }
    if (!data.categories || data.categories.length === 0) {
        return NextResponse.json({ error: "Need categories" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];

    // Validar que las categorías sean válidas
    if (data.categories.some(category => !validCategories.includes(category))) {
        return NextResponse.json({ error: "Category not valid" }, { status: 400 });
    }

    try {
        const transaction = await sequelize.transaction();
        try {
            // Iterar sobre las categorías y realizar las actualizaciones
            for (const category of data.categories) {
                const properties = await Property.findAll({ where: { category }, transaction });

                delete data.categories;
                const accData = { ...data }

                // Ejecutar las actualizaciones en paralelo usando Promise.all
                await Promise.all(
                    properties.map(property =>
                        property.update({ description: accData.descriptions, ...accData }, { transaction })
                    )
                );
            }

            // Si todo va bien, confirmar la transacción
            await transaction.commit();
            return NextResponse.json({ message: "Update successful" }, { status: 200 });
        } catch (error) {
            // Si ocurre un error, deshacer la transacción
            await transaction.rollback();
            console.error(error);
            return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al iniciar la transacción" }, { status: 500 });
    }
}

export async function activateProperty(id) {
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }
        property.isActive = true;
        await property.save();
        return NextResponse.json({ message: "Propiedad activada correctamente" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al activar la propiedad" }, { status: 500 });
    }
}
