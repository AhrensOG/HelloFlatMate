import { createSupplyController } from "./controller/createSupplyController";

export async function POST(req) {
  const data = await req.json();
  return await createSupplyController(data);
}
