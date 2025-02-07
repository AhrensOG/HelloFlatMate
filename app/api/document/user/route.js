import { getDocumentsByUserId } from "./controller/getDocumentsByUderId";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("userId");

  return await getDocumentsByUserId(id);
}
