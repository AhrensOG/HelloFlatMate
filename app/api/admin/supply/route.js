import { createSupply } from "./controllers/createSupplyController";
import { getAllSupplies, getSupply, getSupplyByClientId, getSupplyByPropertyId } from "./controllers/getSupplyController";
import { updatePaidSupply, updateSupply } from "./controllers/updateSupplyController";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const propertyId = searchParams.get("propertyId");
    const clientId = searchParams.get("clientId");
    if (id) return await getSupply(id)
    if (propertyId) return await getSupplyByPropertyId(propertyId)
    if (clientId) return await getSupplyByClientId(clientId)
    return await getAllSupplies()
}

export async function POST(req) {
    const data = await req.json();
    return await createSupply(data)
}

export async function PUT(req) {
    const data = await req.json()
    return await updateSupply(data)
}

export async function PATCH(req) {
    const data = await req.json()
    return await updatePaidSupply(data)
}