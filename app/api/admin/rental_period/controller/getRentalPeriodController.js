import { RentalPeriod } from "@/db/init";
import { NextResponse } from "next/server";

export async function getRentalPeriods() {
    try {
        const rentalPeriods = await RentalPeriod.findAll();
        return NextResponse.json({ rentalPeriods }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error getting rental periods" }, { status: 500 })
    }
}
