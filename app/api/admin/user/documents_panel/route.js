import { getClientsForDocumentsPanel } from "./controllers/getClientsForDocumentsPanel";

export async function GET(req) {
  const result = await getClientsForDocumentsPanel();
  return result;
}
