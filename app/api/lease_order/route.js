import { createLeaseOrder } from "./controller/createLeaseOrderController";
import { getAllLeaseOrders } from "./controller/getLeaseOrderController";
import { updateLeaseOrder, updateStatusLeaseOrder } from "./controller/updateLeaseOrderController";
import { deleteLeaseOrder } from "./controller/deleteLeaseOrderController";

export async function POST(req) {
    const data = await req.json();

    const result = await createLeaseOrder(data);
    return result
}

export async function GET() {
    const result = await getAllLeaseOrders();
    return result
}

export async function PUT(req) {
    const data = await req.json()
    const result = await updateLeaseOrder(data)
    return result
}

export async function PATCH(req) {
    const data = await req.json()
    const result = await updateStatusLeaseOrder(data)
    return result
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const result = await deleteLeaseOrder(id)
    return result
}