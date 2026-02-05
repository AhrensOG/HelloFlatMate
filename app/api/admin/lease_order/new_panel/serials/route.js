import { getAllSerialsForReservationsPanel } from "./controller/getAllSerialsForReservationsPanel";

export async function GET(req) {
  const result = await getAllSerialsForReservationsPanel();
  return result;
}
