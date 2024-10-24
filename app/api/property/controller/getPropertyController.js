import { Client, Document, LeaseOrderProperty, LeaseOrderRoom, Property, RentalItem, RentalPeriod, Room } from "@/db/init";
import { NextResponse } from 'next/server';
import { Op } from "sequelize";


export async function getAllProperties() {
    try {
        const properties = await Property.findAll({
            include: [{
                model: Room,
                as: 'rooms',
                include: [{
                    model: RentalItem,
                    as: 'rentalItems',
                    include: {
                        model: RentalPeriod,
                        as: 'rentalPeriod'
                    }
                }]
            }, {
                model: RentalItem,
                    as: 'rentalItems',
                    include: {
                        model: RentalPeriod,
                        as: 'rentalPeriod'
                    }
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
                include: [
                    {
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
                    },
                    {
                        model: RentalItem,
                    as: 'rentalItems',
                    include: {
                        model: RentalPeriod,
                        as: 'rentalPeriod'
                    }
                    }
                ]
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
                model: RentalItem,
                    as: 'rentalItems',
                    include: {
                        model: RentalPeriod,
                        as: 'rentalPeriod'
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

export async function getPropertiesByOwnerId(id) {
    try{
        const properties = await Property.findAll({
            attributes: [
                "name",
                "serial",
                "id",
                "category",
                "status",
                "street",
                "streetNumber",
                "city",
                "postalCode",
                "zone",
                "typology",
                "size",
                "roomsCount",
                "bathrooms",
                "isActive",
                "price",
                "ownerId"
              ],
              where: { status: { [Op.ne]: "DELETED" }, ownerId: id },
        })

        return NextResponse.json(properties, { status: 200 });
    }catch(error){

        return NextResponse.json({ error: "Error al obtener las propiedades" }, { status: 500 });
    }
}
