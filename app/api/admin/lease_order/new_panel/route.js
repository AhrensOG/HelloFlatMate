import { getAllLeaseOrdersForReservationsPanel } from "./controller/getAllLeaseOrdersForReservationsPanel";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");
  const startDate = searchParams.get("startDate") || null;
  const status = searchParams.get("status") || null;
  const clientId = searchParams.get("clientId") || null

  const result = await getAllLeaseOrdersForReservationsPanel(
    page,
    limit,
    startDate,
    status,
    clientId
  );
  return result;
}
