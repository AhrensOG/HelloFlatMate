import { Consumption } from "@/db/init";
import { NextResponse } from "next/server";

export async function createConsumption(data) {
    if (!data) {
        return NextResponse.json({ error: "Need data" }, { status: 400 });
    }
    if (!data.leaseOrderId || data.leaseOrderId <= 0) {
        return NextResponse.json(
            { error: "Need leaseOrderId" },
            { status: 400 }
        );
    }
    if (!data.clientId || data.clientId.trim() === "") {
        return NextResponse.json({ error: "Need clientId" }, { status: 400 });
    }
    if (!data.amount || data.amount <= 0) {
        return NextResponse.json({ error: "Need amount" }, { status: 400 });
    }
    try {
        const consumption = await Consumption.create({
            date: new Date(),
            leaseOrderRoomId: data.leaseOrderId,
            amount: data.amount,
            url: data.url || null,
            clientId: data.clientId,
            type: data.type,
        });
        return NextResponse.json(consumption.toJSON(), { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
