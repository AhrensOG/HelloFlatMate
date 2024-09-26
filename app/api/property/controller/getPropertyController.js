import { Client, Document, LeaseOrderProperty, LeaseOrderRoom, Property, RentalPeriod, Room } from "@/db/init";
import { NextResponse } from 'next/server';


export async function getAllProperties() {
    try {
        const properties = await Property.findAll({
            include: [{
                model: Room,
                as: 'rooms',
                include: [{
                    model: RentalPeriod,
                    as: 'rentalPeriods'
                }]
            }, {
                model: RentalPeriod,
                as: 'rentalPeriods'
            }, {
                model: LeaseOrderProperty,
                as: 'leaseOrdersProperty'
            }]
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
                        as: 'client',
                        include: {
                            model: Document,
                            as: 'documents'
                        }
                    }
                }
            },
            {
                model: LeaseOrderProperty,
                as: 'leaseOrdersProperty',
                include: {
                    model: Client,
                    as: 'client',
                    include: {
                        model: Document,
                        as: 'documents'
                    }
                }
            },
            {
                model: RentalPeriod,
                as: 'rentalPeriods'
            }]
        });
        if (!property) return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });

        return NextResponse.json({ property }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: "Error al obtener la propiedad" }, { status: 500 });
    }
}
