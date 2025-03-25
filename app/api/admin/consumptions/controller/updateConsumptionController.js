import { Consumption } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateConsumption(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    try {
        const consumption = await Consumption.update(data, { where: { id: data.id } });
        return NextResponse.json(consumption, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
