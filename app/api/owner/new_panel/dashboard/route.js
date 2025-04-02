import { getPropertiesAndTenantsByOwnerIdForDashboard } from "./controller/getPropertyAndTenantsByOwnerIdForDashboard";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    const result = await getPropertiesAndTenantsByOwnerIdForDashboard(ownerId);

    return result;
}
