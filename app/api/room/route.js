import { NextResponse } from "next/server";
import { getAllRooms } from "./controller/getRoomController";
import { createRoom } from "./controller/createRoomController";
import { updateRoom } from "./controller/updateRoomController";
import { deleteRoom } from "./controller/deleteRoomController";

export async function GET() {
    return getAllRooms();
}

export async function POST(req) {
    const data = await req.json();
    console.log(data);

    return createRoom(data);
}

export async function PUT(req) {
    const data = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    return updateRoom(id, data)
}

export async function DELETE(req) {
    const data = await req.json();
    console.log(data.deleteRooms);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
        return deleteRoom(id)
    } else if (data.deleteRooms.length > 0) {
        console.log("estoy aca");

        return deleteRoom(data.deleteRooms)
    }
}