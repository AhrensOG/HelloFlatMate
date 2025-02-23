import { createConsumption } from "./controller/createConsumptionController";
import { deleteConsumption } from "./controller/deleteConsumptionController";
import { getAllConsumption, getConsupmtionById } from "./controller/getConsumptionController";
import { updateConsumption } from "./controller/updateConsumptionController";

export async function POST(req) {
    const data = await req.json();
    return await createConsumption(data);
}
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        return await getConsupmtionById(id);
    }
    return await getAllConsumption();
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    return await deleteConsumption(id);
}

export async function PUT(req) {
    const data = await req.json();
    return await updateConsumption(data);
}
