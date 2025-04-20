import { getSimpleClients } from "./controller/getSimpleClients";

export async function GET() {
  const result = await getSimpleClients();
  return result;
}
