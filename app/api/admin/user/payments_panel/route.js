import { getClientsForPaymentsPanel } from "./controllers/getClientsForPaymentsPanel";

export async function GET(req) {
  const result = await getClientsForPaymentsPanel();
  return result;
}
