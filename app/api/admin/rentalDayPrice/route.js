import { upsertRentalDayPrice } from "./controller/upsertRentalDayPrice";

export async function POST(req) {
  const data = await req.json();
  const result = await upsertRentalDayPrice(data);
  return result;
}
