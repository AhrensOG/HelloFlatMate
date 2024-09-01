import { Owner, Client, Admin, LeaseOrderProperty, LeaseOrderRoom, Property, ToDo, Document } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllUsers() {
    try {
        const owners = await Owner.findAll();
        const clients = await Client.findAll();
        const admins = await Admin.findAll();
        return NextResponse.json({ owners, clients, admins });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
                    as: "leaseOrdersProperty"
                }, {
                    model: LeaseOrderRoom,
                    as: "leaseOrdersRoom"
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

export async function getUsersByRole(role) {
    if (!role || !["OWNER", "CLIENT", "ADMIN"].includes(role)) return NextResponse.json({ error: "Se requiere el rol" }, { status: 400 });
    try {
        switch (role) {
            case "OWNER": {
                const owners = await Owner.findAll();
                return NextResponse.json(owners);
            }
            case "CLIENT": {
                const clients = await Client.findAll();
                return NextResponse.json(clients);
            }
            case "ADMIN": {
                const admins = await Admin.findAll();
                return NextResponse.json(admins);
            }
            default: {
                return NextResponse.json({ error: "Rol no valido" }, { status: 400 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}