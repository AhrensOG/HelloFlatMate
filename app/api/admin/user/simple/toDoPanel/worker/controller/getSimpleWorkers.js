import { Worker } from "@/db/init";
import { NextResponse } from "next/server";

export async function getSimpleWorkers() {
    try {
        const workers = await Worker.findAll({
            attributes: ["id", "name", "lastName", "email"],
        });

        return NextResponse.json(workers);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
