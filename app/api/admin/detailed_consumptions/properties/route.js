import { getAllSerialPropertiesWithRooms } from "./controller/getAllSerialPropertiesWithRooms";

export async function GET() {
  return await getAllSerialPropertiesWithRooms();
}
