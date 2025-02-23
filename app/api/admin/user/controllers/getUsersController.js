import {
    Owner,
    Client,
    Admin,
    LeaseOrderProperty,
    LeaseOrderRoom,
    Property,
    ToDo,
    Document,
    Supply,
    Worker,
    Contract,
    Payment,
    RentPayment,
    Room,
} from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllUsers() {
    try {
        const owners = await Owner.findAll({
            include: [
                { model: Contract, as: "contracts" },
                { model: Document, as: "documents" },
            ],
        });
        const clients = await Client.findAll({
            include: [
                { model: Contract, as: "contracts" },
                { model: Document, as: "documents" },
                { model: Supply, as: "supplies" },
                { model: RentPayment, as: "rentPayments", required: false },
                { model: LeaseOrderRoom, as: "leaseOrdersRoom", include: [ { model: Room, as: "room", attributes: ["serial"] } ] },
            ],
        });

        // Iterar sobre cada cliente para buscar las órdenes de arrendamiento
        // for (const client of clients) {
        //     for (const payment of client.rentPayments) {
        //         if (payment.leaseOrderType === "ROOM") {
        //             // Buscar LeaseOrderRoom usando leaseOrderId
        //             const leaseOrderRoom = await LeaseOrderRoom.findByPk(payment.leaseOrderId, {
        //                 attributes: ["startDate", "endDate"],
        //                 include: {
        //                     model: Room,
        //                     as: "room",
        //                     attributes: ["serial"],
        //                 },
        //             });
        //             // Agregar dinámicamente la información al objeto RentPayment
        //             payment.dataValues.leaseOrderInfo = leaseOrderRoom;
        //         }
        //     }
        //     for (const supply of client.supplies) {
        //         if (supply.leaseOrderType === "ROOM") {
        //             // Buscar LeaseOrderRoom usando leaseOrderId
        //             const leaseOrderRoom = await LeaseOrderRoom.findByPk(supply.leaseOrderId, {
        //                 attributes: ["startDate", "endDate"],
        //                 include: { model: Room, as: "room", attributes: ["serial"] },
        //             });
        //             // Agregar dinámicamente la información al objeto RentPayment
        //             supply.dataValues.leaseOrderInfo = leaseOrderRoom;
        //         }
        //     }
        // }

        const admins = await Admin.findAll();
        const workers = await Worker.findAll();
        return NextResponse.json({ owners, clients, admins, workers });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getUserById(id) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    try {
        const user =
            (await Owner.findByPk(id, {
                include: [
                    {
                        model: LeaseOrderProperty,
                        as: "leaseOrdersProperty",
                        include: [
                            {
                                model: Property,
                                as: "property",
                            },
                        ],
                    },
                    {
                        model: LeaseOrderRoom,
                        as: "leaseOrdersRoom",
                    },
                    {
                        model: Property,
                        as: "properties",
                    },
                    {
                        model: ToDo,
                        as: "toDos",
                    },
                    {
                        model: Document,
                        as: "documents",
                    },
                ],
            })) ||
            (await Client.findByPk(id, {
                include: [
                    {
                        model: LeaseOrderProperty,
                        as: "leaseOrdersProperty",
                        include: [
                            {
                                model: Property,
                                as: "property",
                            },
                        ],
                    },
                    {
                        model: LeaseOrderRoom,
                        as: "leaseOrdersRoom",
                        include: [
                            {
                                model: Property,
                                as: "leaseOrderRoomProperty",
                            },
                        ],
                    },
                    {
                        model: ToDo,
                        as: "toDos",
                    },
                    {
                        model: Document,
                        as: "documents",
                    },
                    {
                        model: Supply,
                        as: "supplies",
                    },
                ],
            })) ||
            (await Admin.findByPk(id));

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
                const clients = await Client.findAll({
                    include: [
                        { model: Payment, as: "payments" },
                        { model: Supply, as: "supplies" },
                    ],
                });
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
