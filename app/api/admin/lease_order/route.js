import { getAllLeaseOrders, getLeaserOrderById } from "./controller/getLeaseOrderController";
import { updateStatusLeaseOrder } from "./controller/updateLeaseOrderController";
import { deleteLeaseOrder } from "./controller/deleteLeaseOrderController";
import { fullUpdateLeaseOrder } from "./controller/fullUpdateLeaseOrderController";


export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    if (id && type) {
        console.log(id, type)
        const result = await getLeaserOrderById(id, type)
        return result
    }
    const result = await getAllLeaseOrders();
    return result
}

export async function PUT(req) {
    const data = await req.json()
    const result = await fullUpdateLeaseOrder(data)
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