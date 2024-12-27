import { createRentPayment } from "./controllers/createRentPaymentController";
import { deleteRentPayment } from "./controllers/deleteRentPaymentController";
import { updateRentPayment } from "./controllers/updateRentPaymentController";

export async function POST(req) {
  const data = await req.json();
  return await createRentPayment(data);
}

export async function PUT(req) {
  const data = await req.json();
  return await updateRentPayment(data);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  return await deleteRentPayment(id);
}
