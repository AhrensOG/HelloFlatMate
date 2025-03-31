import { Property, Consumption, Room, LeaseOrderRoom, Client } from "@/db/init";
import { NextResponse } from "next/server";

export async function createPropertyConsumption(data) {
    if (!data || !data.propertyId || data.amount <= 0) {
        return NextResponse.json(
            { error: "Datos incompletos" },
            { status: 400 }
        );
    }

    try {
        const property = await Property.findByPk(data.propertyId, {
            attributes: ["id"],
            include: [
                {
                    model: Room,
                    as: "rooms",
                    attributes: ["id"],
                    include: [
                        {
                            model: LeaseOrderRoom,
                            as: "leaseOrdersRoom",
                            attributes: ["id", "isActive"],
                            include: [
                                {
                                    model: Client,
                                    as: "client",
                                    attributes: ["id"],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!property) {
            return NextResponse.json(
                { error: "Propiedad no encontrada" },
                { status: 404 }
            );
        }

        const activeLeaseOrders = [];

        if (!property.rooms || property.rooms?.length === 0) {
            return NextResponse.json(
                { error: "No hay habitaciones en esta propiedad" },
                { status: 400 }
            );
        }

        for (const room of property.rooms) {
            const activeOrder = room.leaseOrdersRoom?.find(
                (order) => order.isActive
            );
            if (activeOrder && activeOrder.client?.id) {
                activeLeaseOrders.push({
                    leaseOrderId: activeOrder.id,
                    clientId: activeOrder.client.id,
                });
            }
        }

        if (activeLeaseOrders.length === 0) {
            return NextResponse.json(
                { error: "No hay inquilinos activos en esta propiedad" },
                { status: 400 }
            );
        }

        const splitAmount = Number(
            (data.amount / activeLeaseOrders.length).toFixed(2)
        );
        const consumptions = [];

        for (const { leaseOrderId, clientId } of activeLeaseOrders) {
            const consumption = await Consumption.create({
                date: new Date(),
                leaseOrderRoomId: leaseOrderId,
                amount: splitAmount,
                url: data.url || null,
                period: data.period || null,
                startDate: data.startDate || null,
                endDate: data.endDate || null,
                clientId,
                type: data.type,
            });
            consumptions.push(consumption.toJSON());
        }

        return NextResponse.json(
            { message: "Consumos creados", consumptions },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creando consumos:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
