import { getClientsForReservationsPanel } from "./controllers/getClientsForReservationsPanel";

export async function GET(req) {
  const result = await getClientsForReservationsPanel();
  return result;
}
