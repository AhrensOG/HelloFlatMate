import { Owner, Client, Admin, LeaseOrderProperty, LeaseOrderRoom, Property, ToDo, Document, Supply, Room, Contract, Chat, ChatParticipant } from "@/db/init";
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
            },
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
                        model: Room,
                        as: "room",
                        include: [{
                            model: Property,
                            as: "property"
                        }]
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
                },
                {
                    model: Contract,
                    as: "contracts"
                }, {
                    model: ChatParticipant,
                    as: "chats",
                }
            ]
        }) || await Admin.findByPk(id, {
            include: [{
                model: ToDo,
                as: "toDos"
            },]
        });

        return NextResponse.json(user);
    } catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getOwnerByProperty(id) {
    if (!id) {
        return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    }
    try {
        const owner = await Owner.findOne({
            include: {
                model: Property,
                as: "properties",
                where: {
                    id
                }
            }
        });
        return NextResponse.json(owner, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
