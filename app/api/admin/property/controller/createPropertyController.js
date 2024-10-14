
import { Chat, ChatParticipant, Owner, Property, RentalPeriod, Room } from "@/db/init";
import rentalPeriod, { sequelize } from "@/db/models/rentalPeriod";
import { NextResponse } from 'next/server';

const createProperty = async (data) => {
    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];
    if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: "La categoría no es válida" }, { status: 400 });
    }

    try {
        const property = await Property.create({
            name: data.name || "Sin nombre",  // Valor predeterminado
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
            typology: data?.typology || "MIXED",
            zone: data.zone || null,
            price: (data.amountOwner || 0) + (data.amountHelloflatmate || 0),
            offer: data.offer || 0,
            IVA: data.IVA || 0,
            amountOwner: data.amountOwner || 0,
            amountHelloflatmate: data.amountHelloflatmate || 0,
            puntuation: [],
            isActive: true,
            isBussy: false,
            category: data.category,
            images: data.images || [],
            linkVideo: data.linkVideo || "",
            amenities: data.amenities || [],
            description: data.description || "Sin descripción",
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

        if (data.rentalPeriods && data.rentalPeriods.length > 0) {
            await RentalPeriod.bulkCreate(data.rentalPeriods.map((rentalPeriod) => {
                return {
                    startDate: new Date(rentalPeriod.startDate),
                    endDate: new Date(rentalPeriod.endDate),
                    status: "FREE",
                    rentalPeriodableId: property.id,
                    rentalPeriodableType: "PROPERTY"
                }
            }));
        }

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