import { getAllLeasesByRoomId } from "./controller/getAllLeasesByRoomId";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");

  return await getAllLeasesByRoomId(roomId);
}
