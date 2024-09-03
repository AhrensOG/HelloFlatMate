import { getAllSupplies, getSupply, getSupplyByClientId, getSupplyByPropertyId } from "./controllers/getSupplyController";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const propertyId = searchParams.get("propertyId");
    const clientId = searchParams.get("clientId");
    if (id) return await getSupply(id)
    if (propertyId) return await getSupplyByPropertyId(propertyId)
    if (clientId) return await getSupplyByClientId(clientId)
}
