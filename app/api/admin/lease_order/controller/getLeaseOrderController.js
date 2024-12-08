import { NextResponse } from "next/server";
import { Admin, Category, Client, LeaseOrderProperty, LeaseOrderRoom, Payment, Property, RentPayment, Room, Supply } from "@/db/init";

export async function getAllLeaseOrders() {
    try {
        //Obtener todas las ordene
        const LeaseOrdersProperty = await LeaseOrderProperty.findAll({
            include: [
                {
                    model: Property,
                    as: "property",
                    attributes: ["id", "serial", "ownerId"],
                    include: {
                        model: Category,
                        as: "category",
                    },
                },
                {
                    model: Client,
                    as: "client",
                    attributes: ["id", "name", "lastName", "email"],
                    include: [
                        { model: Supply, as: "supplies" },
                        { model: Payment, as: "payments" },
                        { model: RentPayment, as: "rentPayments" },
                    ],
                },
            ],
        });
        const LeaseOrdersRoom = await LeaseOrderRoom.findAll({
            include: [
                {
                    model: Property,
                    as: "property",
                    attributes: ["id", "serial", "ownerId"],
                    include: {
                        model: Category,
                        as: "category",
                    },
                },
                { model: Room, as: "room", attributes: ["id", "serial"] },
                {
                    model: Client,
                    as: "client",
                    attributes: ["id", "name", "lastName", "email"],
                    include: [
                        { model: Supply, as: "supplies" },
                        { model: Payment, as: "payments" },
                        { model: RentPayment, as: "rentPayments" },
                    ],
                },
            ],
        });
        const mapPropertyOrders = LeaseOrdersProperty.map((order) => {
            return { ...order.dataValues, type: "property" };
        });
        const mapRoomOrders = LeaseOrdersRoom.map((order) => {
            return { ...order.dataValues, type: "room" };
        });
        const LeaseOrders = [...mapPropertyOrders, ...mapRoomOrders];
        return NextResponse.json(LeaseOrders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function getLeaserOrderById(id, type) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    try {
        if (type === "property") {
            const LeaseOrder = await LeaseOrderProperty.findByPk(id);
            return NextResponse.json(LeaseOrder, { status: 200 });
        }

        const LeaseOrder = await LeaseOrderRoom.findByPk(id);
        return NextResponse.json(LeaseOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
