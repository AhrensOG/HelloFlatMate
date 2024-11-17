import { createRentPayment } from "./controllers/createRentPaymentController";
import { updateRentPayment } from "./controllers/updateRentPaymentController";

export async function POST(req) {
  const data = await req.json();
  return await createRentPayment(data);
}

export async function PUT(req) {
  const data = await req.json();
  return await updateRentPayment(data);
}
