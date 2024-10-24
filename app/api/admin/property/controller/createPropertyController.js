
import { Chat, ChatParticipant, Owner, Property, RentalItem, RentalPeriod, Room } from "@/db/init";
import rentalPeriod, { sequelize } from "@/db/models/rentalPeriod";
import { NextResponse } from 'next/server';

export async function createProperty(data) {
    console.log(data);
    
    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];
    if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: "La categoría no es válida" }, { status: 400 });
    }

    // Definir los campos importantes y validar el precio según la categoría
    let price = 0;
    let amountOwner = 0;
    let amountHelloflatmate = 0;
    let IVA = 0;

    // Si es HELLO_ROOM o HELLO_COLIVING, el precio y los valores relacionados pueden ser 0
    if (data.category === "HELLO_ROOM" || data.category === "HELLO_COLIVING") {
        price = data.price || 0;
        amountOwner = data.amountOwner || 0;
        amountHelloflatmate = data.amountHelloflatmate || 0;
        IVA = data.IVA || 0;
    }

    // Si es HELLO_STUDIO o HELLO_LANDLORD, el precio y los valores relacionados deben ser mayores que 0
    if (data.category === "HELLO_STUDIO" || data.category === "HELLO_LANDLORD") {
        price = data.price;
        amountOwner = data.amountOwner || 0;
        amountHelloflatmate = data.amountHelloflatmate || 0;
        IVA = data.IVA || 0;
    }

    // Definir si la propiedad está completa y debe estar activa
    const requiredFields = [
        data.name,
        data.serial,
        data.city,
        data.street,
        data.streetNumber,
        data.postalCode,
        data.size,
        data.roomsCount,
        data.bathrooms,
        data.bed,
        data.maximunOccupants,
        data.zone,
        price
    ];
    const isComplete = requiredFields.every(field => field !== undefined && field !== null && field !== "");

    try {
        const property = await Property.create({
            name: data.name || "Sin nombre",
            serial: data.serial || "Sin serial",
            city: data.city || "Sin ciudad",
            street: data.street || "Sin calle",
            streetNumber: data.streetNumber || 0,
            postalCode: data.postalCode || "0000",
            floor: data.floor || null,
            door: data.door || null,
            size: data.size || 0,
            roomsCount: data.roomsCount || 0,
            bathrooms: data.bathrooms || 0,
            bed: data.bed || 0,
            maximunOccupants: data.maximunOccupants || 0,
            zone: data.zone || null,
            price: price, // Precio ajustado según la categoría
            offer: data.offer || 0,
            IVA: IVA, // IVA ajustado según la categoría
            amountOwner: amountOwner, // Monto del dueño ajustado según la categoría
            amountHelloflatmate: amountHelloflatmate, // Monto de Helloflatmate ajustado según la categoría
            isActive: isComplete, // Si los campos requeridos están completos
            isBussy: false,
            category: data.category,
            images: data.images || [],
            linkVideo: data.linkVideo || "",
            amenities: data.amenities || [],
            description: data.description || "Sin descripción",
            ownerId: data.ownerId || "1",
            tags: data.tags || [],
            calendar: data.calendar || "SIMPLE",
            typology: data.typology || null,
            incomeConditionDescription: data.incomeConditionDescription || null,
            maintenanceDescription: data.maintenanceDescription || null,
            roomDescription: data.roomDescription || null,
            feeDescription: data.feeDescription || null,
            aboutUs: data.aboutUs || null,
            houseRules: data.houseRules || null,
            checkIn: data.checkIn || null,
            checkOut: data.checkOut || null,
        });

        // Crear períodos de alquiler si existen
        if (data.rentalPeriods && data.rentalPeriods.length > 0) {
            await RentalItem.bulkCreate(
                data.rentalPeriods.map((rentalPeriod) => ({
                relatedId: property.id,
                relatedType: "PROPERTY",
                rentalPeriodId: rentalPeriod,
                isFree:true
            })))
        }

        // Crear el grupo de chat si existe un propietario
        if (property.ownerId) {
            const chatGroup = await Chat.create({
                type: "GROUP",
                propertyId: property.id,
                ownerId: property.ownerId
            });

            await ChatParticipant.create({
                chatId: chatGroup.id,
                participantId: property.ownerId,
                participantType: "OWNER",
            });
        }

        return NextResponse.json({ message: "Propiedad cargada con éxito", property });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


export async function cloneProperty(data) {

    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    try {
        const transaction = await sequelize.transaction();
        try {
            const property = await Property.create({
                name: `${data.name} - CLON` || "Nombre predeterminado por CLON", // Usa un valor predeterminado si el nombre no está presente
                serial: data.serial || "", // Si no hay serial, lo dejamos vacío
                city: data.city || "Ciudad desconocida", // Valor por defecto si no se proporciona la ciudad
                street: data.street || "Calle desconocida",
                streetNumber: data.streetNumber ? parseInt(data.streetNumber) : null, // Convierte a número o deja en null
                postalCode: data.postalCode || "", // Dejar vacío si no hay código postal
                floor: data.floor ? parseInt(data.floor) : null, // Convierte a número o null si no existe
                door: data.door || "",
                size: data.size ? parseInt(data.size) : null, // Convierte a número o null
                roomsCount: data.roomsCount ? parseInt(data.roomsCount) : 0, // Valor por defecto 0 si no existe
                bathrooms: data.bathrooms ? parseInt(data.bathrooms) : 0, // Valor por defecto 0 si no existe
                bed: data.bed ? parseInt(data.bed) : 0, // Valor por defecto 0 si no existe
                maximunOccupants: data.maximunOccupants ? parseInt(data.maximunOccupants) : 1, // Mínimo de 1 ocupante
                typology: data.typology || null, // Si no hay tipología, será null
                zone: data.zone || "Zona desconocida", // Valor predeterminado si no hay zona
                price: data.price ? parseFloat(data.price) : 0, // Precio 0 si no existe
                offer: data.offer ? parseFloat(data.offer) : 0, // Oferta 0 si no existe
                IVA: data.IVA ? parseFloat(data.IVA) : 0, // IVA 0 si no existe
                amountOwner: data.amountOwner ? parseFloat(data.amountOwner) : 0, // Monto del dueño 0 si no existe
                amountHelloflatmate: data.amountHelloflatmate ? parseFloat(data.amountHelloflatmate) : 0, // Monto HelloFlatMate 0 si no existe
                puntuation: [], // Puntación vacía por defecto
                isActive: false, // Activo por defecto
                isBussy: false, // No ocupado por defecto
                category: data.category || "HELLO_ROOM", // Valor por defecto si no hay categoría
                images: data.images || [], // Lista vacía si no hay imágenes
                linkVideo: data.linkVideo || "", // Enlace vacío si no existe
                amenities: data.amenities || [], // Lista vacía si no hay amenities
                description: data.description || [], // Descripción vacía si no hay
                incomeConditionDescription: data.incomeConditionDescription || "", // Descripción de condiciones de ingreso
                maintenanceDescription: data.maintenanceDescription || "", // Descripción de mantenimiento
                roomDescription: data.roomDescription || "", // Descripción de la habitación
                feeDescription: data.feeDescription || "", // Descripción de tarifas
                aboutUs: data.aboutUs || "", // Descripción sobre nosotros
                houseRules: data.houseRules || "", // Normas de la casa
                checkIn: data.checkIn || "", // Información de check-in
                checkOut: data.checkOut || "", // Información de check-out
                ownerId: data.ownerId || "1", // Propietario por defecto
                tags: data.tags || null, // Lista vacía de etiquetas si no hay
              });

            if (data.rooms.length > 0) {
                await Room.bulkCreate(data.rooms.map((room) => {
                    return {
                        name: `${room.name} - CLON` || "Nombre predeterminado por CLON",
                        floor: parseInt(room.floor) || null,
                        door: room.door || null,
                        images: room.images || null,
                        numberBeds: parseInt(room.numberBeds) || 0,
                        couple: room.couple,
                        bathroom: room.bathroom,
                        serial: room.serial,
                        price: parseFloat(room.price) || null,
                        amountOwner: parseFloat(room.amountOwner) || null,
                        amountHelloflatmate: parseFloat(room.amountHelloflatmate) || null,
                        IVA: parseFloat(room.IVA) || null,
                        description: room.description || [],
                        typology: room.typology || "MIXED",
                        tags: room.tags || [],
                        propertyId: property.id
                    }
                }))
            }

            await transaction.commit();
            return NextResponse.json({ message: "Propiedad clonada con exito", property, status: 200 });
        } catch (error) {
            console.log(error);

            transaction.rollback();
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
