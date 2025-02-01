import { createRentPayment } from "./controllers/createRentPayment";
import { updateRentPayment } from "./controllers/updateRentPayment";

export async function POST(req) {
  return await createRentPayment(req);
}

export async function PUT(req) {
  return await updateRentPayment(req);
}