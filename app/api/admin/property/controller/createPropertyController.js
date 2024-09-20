import { Owner, Property, RentalPeriod } from "@/db/init";
import rentalPeriod from "@/db/models/rentalPeriod";
import { NextResponse } from 'next/server';

const createProperty = async (data) => {
    console.log(data);

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
        console.log(typeof data.roomsCount);

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

        return NextResponse.json({ message: "Propiedad cargada con éxito", property });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export default createProperty;