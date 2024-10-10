import { getLeaserOrderById } from './controller/getLeaseOrderController';
import { createLeasePropertyOrder, createLeaseRoomOrder } from './controller/createLeaseOrderController'
import { updateIsSignedStatus } from './controller/updateLeaseOrderController';
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
}

export async function PATCH(req) {
    const data = await req.json();
    const result = await updateIsSignedStatus(data);
    return result
}