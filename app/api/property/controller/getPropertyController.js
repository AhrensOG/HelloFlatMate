import { Property, Room } from "@/db/init";
import { NextResponse } from 'next/server';


export async function getAllProperties() {
    try {
        const properties = await Property.findAll();
        return NextResponse.json(properties, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}

export async function getPropertyById(id) {
    try {
        const property = await Property.findByPk(id, {
            include: {
                model: Room,
                as: 'rooms'
            }
        });
        if (!property) return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });

        return NextResponse.json({ property }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener la propiedad" }, { status: 500 });
    }
}

export async function getPropertiesByStatus(status) {
    if (!status) { return NextResponse.json({ error: "Se requiere el estado" }, { status: 400 }); }
    if (status !== "FREE" && status !== "RESERVED" && status !== "OCCUPIED") { return NextResponse.json({ error: "El estado no es valido" }, { status: 400 }); }
    try {
        const properties = await Property.findAll({ where: { status: status } });
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}


export async function getPropertiesByCategory(category) {
    if (!category) return NextResponse.json({ error: "Se requiere la categoria" }, { status: 400 });
    try {
        const properties = await Property.findAll({ where: { category } });
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}