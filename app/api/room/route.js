import { NextResponse } from "next/server";
import { getAllRooms } from "./controller/getRoomController";
import { createRoom } from "./controller/createRoomController";
import { setProperty, updateRoom } from "./controller/updateRoomController";
import { deleteRoom } from "./controller/deleteRoomController";

export async function GET() {
    const rooms = await getAllRooms();
    return NextResponse.json(rooms);
}

export async function POST(req) {
    try {
        const data = await req.json();
        const newRoom = await createRoom(data);
        return NextResponse.json(newRoom, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating room', details: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const updatedRoom = await updateRoom(id, data);
        return NextResponse.json(updatedRoom);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating room', details: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const data = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
            await deleteRoom(id);
        } else if (data.deleteRooms.length > 0) {
            await deleteRoom(data.deleteRooms);
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting room(s)', details: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const data = await req.json();
        let result;
        if (data) {
            result = await setProperty(data);
        }
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating property', details: error.message }, { status: 500 });
    }
}
