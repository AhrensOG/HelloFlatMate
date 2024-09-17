import { createContract } from "./controller/createContractController"
import { getAllContracts, getContractByClientId, getContractById, getContractByOwnerId, getContractByPropertyId } from "./controller/getContractController"


export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const propertyId = searchParams.get('propertyId')
    const clientId = searchParams.get('clientId')
    const ownerId = searchParams.get('ownerId')

    if (propertyId) {
        return await getContractByPropertyId(propertyId)
    }
    if (clientId) {
        return await getContractByClientId(clientId)
    }
    if (ownerId) {
        return await getContractByOwnerId(ownerId)
    }
    if (id) {
        return await getContractById(id)
    }
    return await getAllContracts()
}

export async function POST(req) {
    const data = await req.json()
    return await createContract(data)
}

