import { manualPaymentGeneration } from "./controller/manualPaymentGeneration";

export async function POST(req) {
  const data = await req.json();
  const result = await manualPaymentGeneration(data);
  return result;
}
