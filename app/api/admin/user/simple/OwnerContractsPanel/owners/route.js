import { getSimpleOwnersWithProperties } from "./controller/getSimpleOwnersWithProperties";

export async function GET() {
  const result = await getSimpleOwnersWithProperties();
  return result;
}
