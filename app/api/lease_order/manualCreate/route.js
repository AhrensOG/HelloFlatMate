import { createLeasePropertyOrder, createLeaseRoomOrder } from "./controller/createLeaseOrderController";

export async function POST(req) {
  const data = await req.json();

  if (data.roomId) {
      const result = await createLeaseRoomOrder(data);
      return result
  }
  const result = await createLeasePropertyOrder(data);
  return result
}