import { getPropertiesForChatsPanel } from "./controllers/getPropertiesForChatsPanel";

export async function GET(req) {
  const result = await getPropertiesForChatsPanel();
  return result;
}
