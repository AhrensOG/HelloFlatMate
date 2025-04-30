import { getClientsAndOwnersForChatsPanel } from "./controllers/getClientsAndOwnersForChatsPanel";

export async function GET(req) {
  const result = await getClientsAndOwnersForChatsPanel();
  return result;
}
