import { getIncidencesWithToDosByOwnerId } from "./controller/getIncidencesWithToDosByOwnerId";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get("ownerId");
  const result = await getIncidencesWithToDosByOwnerId(ownerId);

  return result;
}
