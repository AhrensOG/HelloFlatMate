import { getAllUsersForUsersPanel } from "./controllers/getAllUsersForUsersPanel";

export async function GET() {
  const result = await getAllUsersForUsersPanel();
  return result;
}
