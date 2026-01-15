import { getAllPropertiesWithConsumptions } from "./controller/getAllPropertiesWithConsumptions";

export async function GET() {
  return await getAllPropertiesWithConsumptions();
}
