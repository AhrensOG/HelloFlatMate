export const dynamic = "force-dynamic";
import { getAllPayments } from "./controllers/getAllPayments";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 100;
  const userId = searchParams.get("userId") || null;
  const description = searchParams.get("description") || null;
  const type = searchParams.get("type") || null;
  const status = searchParams.get("status") || null;

  return await getAllPayments({
    page,
    limit,
    userId,
    description,
    type,
    status,
  });
}
