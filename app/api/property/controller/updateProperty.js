import { Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateProperty(id, data) {
    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }
    if (!id) {
        return NextResponse.json({ error: "El id no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.name || data.name.trim() === "") {
        return NextResponse.json({ error: "El nombre no puede estar vacío" }, { status: 400 });
    }
    if (!data.city || data.city.trim() === "") {
        return NextResponse.json({ error: "La ciudad no puede estar vacío" }, { status: 400 });
    }
    if (!data.street || data.street.trim() === "") {
        return NextResponse.json({ error: "La calle no puede estar vacío" }, { status: 400 });
    }
    if (!data.streetNumber || data.streetNumber <= 0) {
        return NextResponse.json({ error: "El número no puede estar vacío" }, { status: 400 });
    }
    if (!data.postalCode || data.postalCode.trim() === "") {
        return NextResponse.json({ error: "El Código Postal no puede estar vacío" }, { status: 400 });
    }
    if (!data.size || data.size <= 0) {
        return NextResponse.json({ error: "El tamaño no puede estar vacío" }, { status: 400 });
    }
    if (!data.roomsCount || typeof data.roomsCount !== "number" || data.bedrooms <= 0) {
        return NextResponse.json({ error: "El número de habitaciones no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.bathrooms || typeof data.bathrooms !== "number" || data.bathrooms <= 0) {
        return NextResponse.json({ error: "El número de baños no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.bed || typeof data.bed !== "number" || data.bed <= 0) {
        return NextResponse.json({ error: "El número de camas no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.maximunOccupants || typeof data.maximunOccupants !== "number" || data.maximunOccupants <= 0) {
        return NextResponse.json({ error: "El número máximo de ocupantes no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.images || data.images.length === 0) {
        return NextResponse.json({ error: "Las imágenes no pueden estar vacías" }, { status: 400 });
    }
    if (!data.amenities || data.amenities.length === 0) {
        return NextResponse.json({ error: "Las amenidades no pueden estar vacías" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];

    if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: "La categoría no es válida" }, { status: 400 });
    }
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }
        await property.update(data);
        return NextResponse.json(property, { status: 200 });
    } catch (error) {
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