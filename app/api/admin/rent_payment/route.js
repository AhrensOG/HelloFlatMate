import { createRentPayment } from "./controllers/createRentPaymentController";


export async function POST(req) {
  const data = await req.json();
  return await createRentPayment(data)
}