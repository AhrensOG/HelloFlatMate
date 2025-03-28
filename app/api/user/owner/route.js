import { getOwnerForContractByProperty } from "./controller/getOwnerForContractByPropertyId";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");

    if (propertyId) {
        const result = await getOwnerForContractByProperty(propertyId);
        return result;
    }
}
