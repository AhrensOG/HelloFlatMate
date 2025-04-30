import { getAllUsersForUsersPanel } from "./controllers/getAllUsersForUsersPanel";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");
  const id = searchParams.get("userId");

  return await getAllUsersForUsersPanel({ page, limit, userId: id });
}
