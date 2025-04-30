import { getPropertiesForConsumptionsPanel } from "./controllers/getPropertiesForConsumptionsPanel";

export async function GET(req) {
  const result = await getPropertiesForConsumptionsPanel();
  return result;
}
