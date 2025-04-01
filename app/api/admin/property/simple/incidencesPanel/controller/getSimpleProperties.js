import { Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function getSimpleProperties() {
    try {
        const properties = await Property.findAll({
            attributes: ["id", "serial", "ownerId"],
        });

        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
