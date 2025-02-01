import { createSupplyPayment } from "./controllers/createSupplyPayment";
import { updateSupplyPayment } from "./controllers/updateSupplyPayment";

export async function POST(req) {
  return await createSupplyPayment(req);
}

export async function PUT(req) {
  return await updateSupplyPayment(req);
}
