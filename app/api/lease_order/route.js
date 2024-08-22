import { createLeasePropertyOrder, createLeaseRoomOrder } from "./controller/createLeaseOrderController";
import { getAllLeaseOrders, getLeaserOrderById } from "./controller/getLeaseOrderController";
import { updateLeaseOrder, updateStatusLeaseOrder } from "./controller/updateLeaseOrderController";
import { deleteLeaseOrder } from "./controller/deleteLeaseOrderController";

export async function POST(req) {
    const data = await req.json();

    if (data.roomId) {
        const result = await createLeaseRoomOrder(data);
        return result
    }
    const result = await createLeasePropertyOrder(data);
    return result
}

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    if (id && type) {
        const result = await getLeaserOrderById(id, type)
        return result
    }
    const result = await getAllLeaseOrders(id);
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
    const data = await req.json()
    const result = await deleteLeaseOrder(data)
    return result
}