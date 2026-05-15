import { getAllRooms } from "./controller/getRoomController";

export async function GET() {
    return await getAllRooms();
}

