import { getRoomsForFilterPage } from "./controller/getRoomsForFilterPage";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const query = {
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    zone: searchParams.get("zone"),
    category: searchParams.get("category"),
    typology: searchParams.get("typology"),
    rentalPeriod: searchParams.get("rentalPeriod"),
    bathroom: searchParams.get("bathroom"),
    couple: searchParams.get("couple"),
    order: searchParams.get("order"),
  };

  return await getRoomsForFilterPage(query);
}
