import { createRentPayment } from "./controller/createRentPaymentController";
import { getAllRentPayment, getRentPaymentById, getRentPaymentByPropertyId, getRentPaymentsByClientId } from "./controller/getRentPAymentController";

export async function POST(req) {
    const data = await req.json();
    return await createRentPayment(data);
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const propertyId = searchParams.get("propertyId");
    const clientId = searchParams.get("clientId");
    if (id) return await getRentPaymentById(id);
    if (propertyId) return await getRentPaymentByPropertyId(propertyId);
    if (clientId) return await getRentPaymentsByClientId(clientId);
    return await getAllRentPayment();
}
