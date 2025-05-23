import { getZonesForFilterPage } from "./controller/getZonesForFilterPage";

export async function GET() {
  return await getZonesForFilterPage();
}
