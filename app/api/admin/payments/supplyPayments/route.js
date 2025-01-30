import { createSupplyPayment } from "./controllers/createSupplyPayment";

export async function POST(req) {
  return await createSupplyPayment(req);
}
