import { Client, LeaseOrderProperty, LeaseOrderRoom, Property, Room, Supply } from "@/db/init";
import { NextResponse } from "next/server";

export async function createSupply(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.title || data.title.trim() === "") return NextResponse.json({ error: "No title provided" }, { status: 400 });
    if (!data.amount || data.amount <= 0) return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ error: "No property id provided" }, { status: 400 });
    if (!data.typeSupply || (data.typeSupply !== "EXPENSES" && data.typeSupply !== "WATER" && data.typeSupply !== "GAS" && data.typeSupply !== "ELECTRICITY" && data.typeSupply !== "INTERNET" && data.typeSupply !== "OTHERS")) return NextResponse.json({ error: "Invalid type provided" }, { status: 400 });
    if (!data.expirationDate) return NextResponse.json({ error: "No expiration date provided" }, { status: 400 });

    try {
        const property = await Property.findByPk(data.propertyId, {
            include: [
                {
                    model: Room,
                    as: "rooms",
                    include: {
                        model: LeaseOrderRoom,
                        as: "leaseOrdersRoom",
                        include: {
                            model: Client,
                            as: "client"
                        }
                    }
                },
                {
                    model: LeaseOrderProperty,
                    as: "leaseOrdersProperty",
                    include: {
                        model: Client,
                        as: "client"
                    }
                }
            ]
        });

        if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });

        let supplies = [];

        if (property.category === "HELLO_ROOM" || property.category === "HELLO_COLIVING" || property.category === "HELLO_LANDLORD") {
            const clients = property.rooms.flatMap(room =>
                room.leaseOrdersRoom
                    .filter(leaseOrder => leaseOrder.isActive)
                    .map(leaseOrder => leaseOrder.client)
            );

            if (!clients || clients.length === 0) return NextResponse.json({ error: "No active clients found" }, { status: 404 });

            const price = data.amount / clients.length;

            for (let client of clients) {
                const supply = await Supply.create({
                    name: data.title,
                    amount: price,
                    date: new Date(),
                    status: "PENDING",
                    propertyId: data.propertyId,
                    clientId: client.id,
                    reference: data.reference || "",
                    type: data.typeSupply,
                    expirationDate: new Date(data.expirationDate)
                });
                supplies.push(supply.toJSON());
            }

            return NextResponse.json(supplies, { status: 200 });
        }

        const activeClients = property.leaseOrdersProperty.filter(leaseOrder => leaseOrder.isActive).map(leaseOrder => leaseOrder.client);
        if (!activeClients || activeClients.length === 0) return NextResponse.json({ error: "No active clients found" }, { status: 404 });

        const price = data.amount / activeClients.length;

        for (let client of activeClients) {
            const supply = await Supply.create({
                name: data.title,
                amount: price,
                date: new Date(),
                status: "PENDING",
                propertyId: data.propertyId,
                clientId: client.id,
                reference: data.reference || "",
                type: data.typeSupply,
                expirationDate: new Date(data.expirationDate)
            });
            supplies.push(supply.toJSON());
        }

        return NextResponse.json(supplies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
