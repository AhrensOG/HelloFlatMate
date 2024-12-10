import { manualCreateSupply } from "../admin/supply/manualCreate/controllers/manualManagmentSupplyController";
import { createSupplyWorker } from "./controllers/createSupplyWorker";
import { getAllSupplies, getSupply, getSupplyByClientId, getSupplyByPropertyId } from "./controllers/getSupplyController";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const propertyId = searchParams.get("propertyId");
    const clientId = searchParams.get("clientId");
    if (id) return await getSupply(id);
    if (propertyId) return await getSupplyByPropertyId(propertyId);
    if (clientId) return await getSupplyByClientId(clientId);
}

export async function POST(req) {
    const data = await req.json();
    const result = await createSupplyWorker(data);
    return result;
}
