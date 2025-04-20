import { getSimpleProperties } from "./controller/getSimpleProperties";

export async function GET() {
    const result = await getSimpleProperties();
    return result;
}