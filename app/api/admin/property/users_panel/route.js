import { getPropertiesForUsersPanel } from "./controllers/getPropertiesForUsersPanel";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const result = await getPropertiesForUsersPanel();
  return result;
}
