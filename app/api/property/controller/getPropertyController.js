import { Property, PropertyWithPrice, Room, RoomWithPrice } from "@/db/init";
import { NextResponse } from 'next/server';


export async function getAllProperties() {
    try {
        const properties = await Property.findAll();
        const propertiesWithPrice = await PropertyWithPrice.findAll();
        return NextResponse.json([...properties, ...propertiesWithPrice], { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}

export async function getPropertyById(data) {
    console.log(data);

    try {
        let propertyWhitPrice
        let property
        if (data) {
            if (data.price) {
                propertyWhitPrice = await PropertyWithPrice.findByPk(data.id, {
                    include: {
                        model: Room,
                        as: 'rooms'
                    }
                }
                );

                if (propertyWhitPrice) {
                    return NextResponse.json({ propertyWhitPrice }, { status: 200 });
                }
            } else {
                property = await Property.findByPk(data.id, {
                    include: {
                        model: RoomWithPrice,
                        as: 'roomsWithPrice'
                    }
                });
                if (property) {
                    return NextResponse.json({ property }, { status: 200 });
                }
            }
        } else {
            return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
        }
        if (!property && !propertyWhitPrice) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }

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