import { createSupplyPayment } from "./controllers/createSupplyPayment";
import { deleteSupplyPayment } from "./controllers/deleteSupplyPayment";
import { updateSupplyPayment } from "./controllers/updateSupplyPayment";

export async function POST(req) {
  return await createSupplyPayment(req);
}

export async function PUT(req) {
  return await updateSupplyPayment(req);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  return await deleteSupplyPayment(id);
}