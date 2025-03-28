import { createPaymentByOwner } from "./controller/requestPayment";

export async function POST(req) {
    return await createPaymentByOwner(req);
}
