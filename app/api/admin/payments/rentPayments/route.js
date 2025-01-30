import { createRentPayment } from "./controllers/createRentPayment";

export async function POST(req) {
  return await createRentPayment(req);
}
