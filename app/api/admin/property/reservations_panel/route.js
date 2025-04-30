import { getPropertiesForReservationsPanel } from "./controllers/getPropertiesForReservationsPanel";

export async function GET(req) {
  const result = await getPropertiesForReservationsPanel();
  return result;
}
