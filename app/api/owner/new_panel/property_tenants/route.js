import { getPropertiesAndTenantsByOwnerId } from "./controller/getPropertiesAndTenantsByOwnerId";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    const result = await getPropertiesAndTenantsByOwnerId(ownerId);

    return result;
}
