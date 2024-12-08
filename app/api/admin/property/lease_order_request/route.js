import { getPropertyById } from "./controller/getPropertyController";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const simple = searchParams.get("simple");
  if (id) {
    const result = await getPropertyById(id);
    return result;
  }
}
