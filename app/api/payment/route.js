import { getAllPayments, getPaymentByClient, getPaymentById, getPaymentByOwner, getPaymentByProperty, getPaymentByRoom } from "./controller/getPaymentController"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const propertyId = searchParams.get('propertyId')
    const roomId = searchParams.get('roomId')
    const clientId = searchParams.get('clientId')
    const ownerId = searchParams.get('ownerId')

    if (propertyId) {
        return await getPaymentByProperty(propertyId)
    }
    if (roomId) {
        return await getPaymentByRoom(roomId)
    }
    if (clientId) {
        return await getPaymentByClient(clientId)
    }
    if (ownerId) {
        return await getPaymentByOwner(ownerId)
    }
    if (id) {
        return await getPaymentById(id)
    }
    return await getAllPayments()
}

export async function POST(req) {
    const data = await req.json()
    return await createPayment(data)
}