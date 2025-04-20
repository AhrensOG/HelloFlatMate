import { getSimpleWorkers } from "./controller/getSimpleWorkers";

export async function GET() {
  const result = await getSimpleWorkers();
  return result;
}
