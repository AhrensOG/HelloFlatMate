
import { Chat, ChatParticipant, Owner, Property, RentalPeriod, Room } from "@/db/init";
import rentalPeriod, { sequelize } from "@/db/models/rentalPeriod";
import { NextResponse } from 'next/server';

const createProperty = async (data) => {
    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }
    if (data.name.trim() === "") {
        return NextResponse.json({ error: "El nombre no puede estar vacío" }, { status: 400 });
    }
    if (data.serial.trim() === "") {
        return NextResponse.json({ error: "El serial no puede estar vacío" }, { status: 400 });
    }
    if (data.city.trim() === "") {
        return NextResponse.json({ error: "La ciudad no puede estar vacío" }, { status: 400 });
    }
    if (data.street.trim() === "") {
        return NextResponse.json({ error: "La calle no puede estar vacío" }, { status: 400 });
    }
    if (!data.streetNumber) {
        return NextResponse.json({ error: "El número no puede estar vacío" }, { status: 400 });
    }
    if (data.postalCode.trim() === "") {
        return NextResponse.json({ error: "El Código Postal no puede estar vacío" }, { status: 400 });
    }
    if (data.size <= 0) {
        return NextResponse.json({ error: "El tamaño no puede estar vacío" }, { status: 400 });
    }
    if (data.roomsCount <= 0) {
        return NextResponse.json({ error: "El número de habitaciones no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (data.bathrooms <= 0 || typeof data.bathrooms !== "number") {
        return NextResponse.json({ error: "El número de baños no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (data.bed <= 0 || typeof data.bed !== "number") {
        return NextResponse.json({ error: "El número de camas no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (data.maximunOccupants <= 0 || typeof data.maximunOccupants !== "number") {
        console.log(typeof data.maximunOccupants);

        return NextResponse.json({ error: "El número máximo de ocupantes no puede estar vacío o no es un número" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];
    if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: "La categoría no es válida" }, { status: 400 });
    }
    if (data.images.length === 0) {
        return NextResponse.json({ error: "Las imágenes no pueden estar vacías" }, { status: 400 });
    }
    if (data.amenities.length === 0) {
        return NextResponse.json({ error: "Las amenidades no pueden estar vacías" }, { status: 400 });
    }
    if (data.description.length <= 0) {
        return NextResponse.json({ error: "La descripción no puede estar vacía" }, { status: 400 });
    }

    try {
        const property = await Property.create({
            name: data.name,
            serial: data.serial,
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber,
            postalCode: data.postalCode,
            floor: data.floor,
            door: data.door,
            size: data.size,
            roomsCount: data.roomsCount,
            bathrooms: data.bathrooms,
            bed: data.bed,
            maximunOccupants: data.maximunOccupants,
            typology: data?.typology || null,
            zone: data.zone,
            price: data.amountOwner + data.amountHelloflatmate || 0,
            offer: data.offer || 0,
            IVA: data.IVA || 0,
            amountOwner: data.amountOwner || 0,
            amountHelloflatmate: data.amountHelloflatmate || 0,
            puntuation: [],
            isActive: true,
            isBussy: false,
            category: data.category,
            images: data.images,
            linkVideo: data.linkVideo || "",
            amenities: data.amenities,
            description: data.description,
            incomeConditionDescription: data.incomeConditionDescription || "",
            maintenanceDescription: data.maintenanceDescription || "",
            roomDescription: data.roomDescription || "",
            feeDescription: data.feeDescription || "",
            aboutUs: data.aboutUs || "",
            houseRules: data.houseRules || "",
            checkIn: data.checkIn || "",
            checkOut: data.checkOut || "",
            ownerId: data.ownerId || "1",
            tags: data.tags || [],
            calendar: data.calendar || "SIMPLE"
        });

        if (data.rentalPeriods) {
            await RentalPeriod.bulkCreate(data.rentalPeriods.map((rentalPeriod) => {
                return {
                    startDate: new Date(rentalPeriod.startDate),
                    endDate: new Date(rentalPeriod.endDate),
                    status: "FREE",
                    rentalPeriodableId: property.id,
                    rentalPeriodableType: "PROPERTY"
                }
            }))
        }

        const chatGroup = await Chat.create({
            type: "GROUP",
            propertyId: property.id,
            ownerId: property.ownerId
        })

        const chatParticipant = await ChatParticipant.create({
            chatId: chatGroup.id,
            participantId: property.ownerId,
            participantType: "OWNER",
        })

        return NextResponse.json({ message: "Propiedad cargada con éxito", property });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function cloneProperty(data) {
    console.log(data);

    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    try {
        const transaction = await sequelize.transaction();
        try {
            const property = await Property.create({
                name: data.name,
                serial: data.serial,
                city: data.city,
                street: data.street,
                streetNumber: parseInt(data.streetNumber),
                postalCode: data.postalCode,
                floor: parseInt(data.floor) || null,
                door: data.door,
                size: parseInt(data.size),
                roomsCount: parseInt(data.roomsCount),
                bathrooms: parseInt(data.bathrooms),
                bed: parseInt(data.bed),
                maximunOccupants: parseInt(data.maximunOccupants),
                typology: data?.typology || null,
                zone: data.zone,
                price: parseFloat(data.price) || 0,
                offer: parseFloat(data.offer) || 0,
                IVA: parseFloat(data.IVA) || 0,
                amountOwner: parseFloat(data.amountOwner) || 0,
                amountHelloflatmate: parseFloat(data.amountHelloflatmate) || 0,
                puntuation: [],
                isActive: true,
                isBussy: false,
                category: data.category,
                images: data.images,
                linkVideo: data.linkVideo || "",
                amenities: data.amenities,
                description: data.description,
                incomeConditionDescription: data.incomeConditionDescription || "",
                maintenanceDescription: data.maintenanceDescription || "",
                roomDescription: data.roomDescription || "",
                feeDescription: data.feeDescription || "",
                aboutUs: data.aboutUs || "",
                houseRules: data.houseRules || "",
                checkIn: data.checkIn || "",
                checkOut: data.checkOut || "",
                ownerId: data.ownerId || "1",
                tags: data.tags || [],
                ownerId: data.ownerId
            })

            if (data.rooms.length > 0) {
                await Room.bulkCreate(data.rooms.map((room) => {
                    return {
                        name: room.name,
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
                        description: room.description,
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

export default createProperty;