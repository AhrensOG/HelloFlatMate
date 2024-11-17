import { manualCreateSupply, manualUpdateSupply } from "./controllers/manualManagmentSupplyController";

export async function POST(req) {
  const data = await req.json();
  return await manualCreateSupply(data);
}

export async function PUT(req) {
  const data = await req.json();
  return await manualUpdateSupply(data);
}
