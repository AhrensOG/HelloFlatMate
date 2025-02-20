import { Consumption } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllConsumption() {
    try {
        const consumptions = await Consumption.findAll();
        return NextResponse.json(consumptions, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function getConsupmtionById(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const consumption = await Consumption.findByPk(id);
        return NextResponse.json(consumption);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
