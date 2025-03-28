import { NextResponse } from "next/server";
import { fastUpdateRoom } from "./controller/fastUpdateRoom";

export async function PUT(req) {
    try {
        const data = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const updatedRoom = await fastUpdateRoom(id, data);
        return updatedRoom;
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating room", details: error.message },
            { status: 500 }
        );
    }
}
