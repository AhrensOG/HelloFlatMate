import { getToDosByOwnerId } from "./controller/getToDosByOwnerId";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get("ownerId");
  const result = await getToDosByOwnerId(ownerId);

  return result;
}
