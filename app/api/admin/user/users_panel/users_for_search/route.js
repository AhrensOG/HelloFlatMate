import { getAllUsersForUsersPanel_SearchBar } from "./controllers/getAllUsersForUsersPanel_SearchBar";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await getAllUsersForUsersPanel_SearchBar();
  return result;
}
