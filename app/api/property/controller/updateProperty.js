import { Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateProperty(id, data) {
    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }
    if (!id) {
        return NextResponse.json({ error: "El id no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (data.name.trim() === "") {
        return NextResponse.json({ error: "El nombre no puede estar vacío" }, { status: 400 });
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
    if (typeof data.roomsCount !== "number" || data.bedrooms <= 0) {
        return NextResponse.json({ error: "El número de habitaciones no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (typeof data.bathrooms !== "number" || data.bathrooms <= 0) {
        return NextResponse.json({ error: "El número de baños no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (typeof data.bed !== "number" || data.bed <= 0) {
        return NextResponse.json({ error: "El número de camas no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (typeof data.maximunOccupants !== "number" || data.maximunOccupants <= 0) {
        return NextResponse.json({ error: "El número máximo de ocupantes no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (typeof data.price !== "number" || data.price <= 0) {
        return NextResponse.json({ error: "El precio no puede estar vacío o no es un número" }, { status: 400 });
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