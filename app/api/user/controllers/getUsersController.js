import { Owner, Client, Admin, LeaseOrderProperty, LeaseOrderRoom, Property, ToDo, Document, Supply } from "@/db/init";
import { NextResponse } from "next/server";

export async function getUserById(id) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    try {
        const user = await Owner.findByPk(id, {
            include: [{
                model: LeaseOrderProperty,
                as: "leaseOrdersProperty",
                include: [{
                    model: Property,
                    as: "property"
                }]
            }, {
                model: LeaseOrderRoom,
                as: "leaseOrdersRoom"
            }, {
                model: Property,
                as: "properties"
            },
            {
                model: ToDo,
                as: "toDos"
            },
            {
                model: Document,
                as: "documents"
            }
            ]
        }) || await Client.findByPk(id, {
            include: [
                {
                    model: LeaseOrderProperty,
                    as: "leaseOrdersProperty",
                    include: [{
                        model: Property,
                        as: "property"
                    }]
                }, {
                    model: LeaseOrderRoom,
                    as: "leaseOrdersRoom",
                    include: [{
                        model: Property,
                        as: "leaseOrderRoomProperty"
                    }]
                },
                {
                    model: ToDo,
                    as: "toDos"
                },
                {
                    model: Document,
                    as: "documents"
                },
                {
                    model: Supply,
                    as: "supplies"
                }
            ]
        }) || await Admin.findByPk(id, {
            include: {
                model: ToDo,
                as: "toDos"
            }
        });

        return NextResponse.json(user);
    } catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
