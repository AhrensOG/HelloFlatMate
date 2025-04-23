import { createOwnerContract } from "./controllers/createOwnerContract";
import { deleteOwnerContract } from "./controllers/deleteOwnerContract";
import { getAllOwnerContracts } from "./controllers/getAllOwnerContracts";
import { updateOwnerContract } from "./controllers/updateOwnerContract";

export async function GET(req) {
  const result = await getAllOwnerContracts();
  return result;
}

export async function POST(req) {
  const data = await req.json();
  return await createOwnerContract(data);
}

export async function PUT(req) {
  const data = await req.json();
  return await updateOwnerContract(data);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  return await deleteOwnerContract(id);
}
