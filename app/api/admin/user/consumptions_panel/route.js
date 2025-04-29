import { getClientsForConsumptionsPanel } from "./controllers/getClientsForConsumptionsPanel";

export async function GET(req) {
  const result = await getClientsForConsumptionsPanel();
  return result;
}
