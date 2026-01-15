import { getFinancialDetailsByLeaseOrderId } from "./controller/getFinancialDetailsByLeaseOrderId";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const leaseOrderId = searchParams.get("leaseOrderId");

  return await getFinancialDetailsByLeaseOrderId(clientId, leaseOrderId);
}
