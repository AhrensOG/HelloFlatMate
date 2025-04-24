import { NextResponse } from "next/server";
import { getAllRooms } from "./controller/getRoomController";
import { createRoom } from "./controller/createRoomController";
import { setProperty, updateRoom } from "./controller/updateRoomController";
import { deleteRoom } from "./controller/deleteRoomController";

export async function GET() {
    const rooms = await getAllRooms();
    return rooms;
}

export async function POST(req) {
    const data = await req.json();
    const newRoom = await createRoom(data);
    return newRoom;
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        return await updateRoom(id, data);
    } catch (error) {
        return NextResponse.json({ error: "Error updating room", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    const data = await req.json();

    const result = await deleteRoom(data);
    return result;
}

export async function PATCH(req) {
    const data = await req.json();
    let result;
    if (data) {
        result = await setProperty(data);
    }
    return result;
}
