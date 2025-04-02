import { Incidence } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteIncidence(id) {
    try {
        await Incidence.destroy({ where: { id } });
        return NextResponse.json("Incidence deleted successfully");
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
