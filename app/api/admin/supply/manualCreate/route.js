import {
  deleteSupply,
  manualCreateSupply,
  manualUpdateSupply,
} from "./controllers/manualManagmentSupplyController";

export async function POST(req) {
  const data = await req.json();
  return await manualCreateSupply(data);
}

export async function PUT(req) {
  const data = await req.json();
  return await manualUpdateSupply(data);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  return await deleteSupply(id);
}
