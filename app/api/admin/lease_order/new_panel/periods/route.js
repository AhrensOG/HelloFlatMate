import { getAllPeriodsForReservationsPanel } from "./controller/getAllPeriodsForReservationsPanel";

export async function GET(req) {
  const result = await getAllPeriodsForReservationsPanel();
  return result;
}
