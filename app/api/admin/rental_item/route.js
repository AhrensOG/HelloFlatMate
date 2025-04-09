import { deleteRentalItem } from "./controller/deleteRentalItem";
import { newCreateRentalItem } from "./controller/newCreateRentalItem";

export async function DELETE(req) {
  const data = await req.json();
  const result = await deleteRentalItem(data);
  return result;
}

export async function POST(req) {
  const data = await req.json();
  const result = await newCreateRentalItem(data);
  return result;
}
