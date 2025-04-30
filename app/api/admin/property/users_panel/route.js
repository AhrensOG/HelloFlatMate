import { getPropertiesForUsersPanel } from "./controllers/getPropertiesForUsersPanel";

export async function GET(req) {
  const result = await getPropertiesForUsersPanel();
  return result;
}
