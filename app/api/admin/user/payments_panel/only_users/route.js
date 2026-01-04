export const dynamic = "force-dynamic";
import { getOnlyClientsForPaymentsPanel } from "./controllers/getOnlyClientsForPaymentsPanel";

export async function GET(req) {
  const result = await getOnlyClientsForPaymentsPanel();
  return result;
}
