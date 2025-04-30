import { getAllUsersForUsersPanel_SearchBar } from "./controllers/getAllUsersForUsersPanel_SearchBar";

export async function GET() {
  const result = await getAllUsersForUsersPanel_SearchBar();
  return result;
}
