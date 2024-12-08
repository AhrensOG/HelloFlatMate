import { Category, Client, Property, Supply } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateSupply(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.id || data.id <= 0) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    if (!data.amount || data.amount <= 0) return NextResponse.json({ error: "No amount provided" }, { status: 400 });
    if (!data.clientId || data.clientId <= 0) return NextResponse.json({ error: "No user id provided" }, { status: 400 });
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ error: "No property id provided" }, { status: 400 });

    try {
        const supply = await Supply.findByPk(data.id, {
            include: [
                {
                    model: Property,
                    as: "property",
                    include: {
                        model: Category,
                        as: "category",
                    },
                },
                {
                    model: Client,
                    as: "client",
                },
            ],
        });
        if (!supply) return NextResponse.json({ error: "Supply not found" }, { status: 404 });
        if (supply.property.id !== data.propertyId) return NextResponse.json({ error: "Supply not found" }, { status: 404 });
        if (supply.client.id !== data.clientId) return NextResponse.json({ error: "Supply not found" }, { status: 404 });

        supply.amount = data.amount;
        await supply.save();
        return NextResponse.json({ message: "Supply updated successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}

export async function updatePaidSupply(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.id || data.id <= 0) return NextResponse.json({ error: "No id provided" }, { status: 400 });

    try {
        const supply = await Supply.findByPk(data.id);
        if (!supply) return NextResponse.json({ error: "Supply not found" }, { status: 404 });
        supply.status = "PAID";
        supply.paymentDate = new Date();
        await supply.save();
        return NextResponse.json({ message: "Supply updated successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}
