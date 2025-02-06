import { createRentPayment } from "./controllers/createRentPayment";
import { deleteRentPayment } from "./controllers/deleteRentPayment";
import { updateRentPayment } from "./controllers/updateRentPayment";

export async function POST(req) {
  return await createRentPayment(req);
}

export async function PUT(req) {
  return await updateRentPayment(req);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  return await deleteRentPayment(id);
}