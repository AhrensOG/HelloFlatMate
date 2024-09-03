import { NextResponse } from "next/server";
import { getAllRooms } from "./controller/getRoomController";

export async function GET() {
    const rooms = await getAllRooms();
    return NextResponse.json(rooms);
}

