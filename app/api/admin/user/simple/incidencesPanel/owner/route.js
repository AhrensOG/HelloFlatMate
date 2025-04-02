import { getSimpleOwners } from "./controller/getSimpleOwners";

export async function GET() {
    const result = await getSimpleOwners();
    return result;
}
