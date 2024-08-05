import { NextResponse } from "next/server";
import { getAllRooms } from "./controller/getRoomController";
import { createRoom } from "./controller/createRoomController";
import { updateRoom } from "./controller/updateRoomController";

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
    return updateRoom(data.id, data)
}