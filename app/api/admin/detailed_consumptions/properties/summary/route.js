import { getSummaryPropertyById } from "./controller/getSummaryPropertyById";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");

  return await getSummaryPropertyById(propertyId);
}
