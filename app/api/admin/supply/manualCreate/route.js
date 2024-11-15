import { manualCreateSupply } from "./controllers/manualCreateSupplyController";

export async function POST(req) {
  const data = await req.json();
  return await manualCreateSupply(data);
}
