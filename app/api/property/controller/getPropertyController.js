import { Client, LeaseOrderProperty, LeaseOrderRoom, Property, Room } from "@/db/init";
import { NextResponse } from 'next/server';

export async function getPropertyByUserId(userId) {
    if (!userId) {
        const property = await Property.findAll({
            where: {

            }
        })
    }
}

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
