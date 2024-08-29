import { Client, LeaseOrderProperty, LeaseOrderRoom, Property, Room } from "@/db/init";
import { NextResponse } from 'next/server';


export async function getAllProperties() {
    try {
        const properties = await Property.findAll({
            include: {
                model: Room,
                as: 'rooms',
            }
        });
        return NextResponse.json(properties, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}

export async function getPropertyById(id) {
    try {
        const property = await Property.findByPk(id, {
            include: [{
                model: Room,
                as: 'rooms',
                include: {
                    model: LeaseOrderRoom,
                    as: 'leaseOrdersRoom',
                    include: {
                        model: Client,
                        as: 'client'
                    }
                }
            },
            {
                model: LeaseOrderProperty,
                as: 'leaseOrdersProperty',
                include: {
                    model: Client,
                    as: 'client'
                }
            }]
        });
        if (!property) return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });

        return NextResponse.json({ property }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: "Error al obtener la propiedad" }, { status: 500 });
    }
}

export async function getPropertiesActive() {
    try {
        const properties = await Property.findAll({ where: { isActive: true } });
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}

export async function getPropertiesInactive() {
    try {
        const properties = await Property.findAll({ where: { isActive: false } });
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