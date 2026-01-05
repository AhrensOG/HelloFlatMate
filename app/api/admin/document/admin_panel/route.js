export const dynamic = "force-dynamic";
import { getAllDocuments_admin_panel } from "./controller/getAllDocuments_admin_panel";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Parámetros de paginación y filtro
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const userId = searchParams.get("userId") || null;

  return await getAllDocuments_admin_panel({
    page,
    limit,
    userId,
  });
}
