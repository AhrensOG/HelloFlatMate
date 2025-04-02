import { createPropertyConsumption } from "./controller/createPropertyConsumptionController";

export async function POST(req) {
    const data = await req.json();
    return await createPropertyConsumption(data);
}
