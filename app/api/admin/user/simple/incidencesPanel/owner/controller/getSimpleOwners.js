import { Owner } from "@/db/init";
import { NextResponse } from "next/server";

export async function getSimpleOwners() {
    try {
        const owners = await Owner.findAll({
            attributes: ["id", "name", "lastName", "email"],
        });

        return NextResponse.json(owners);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
