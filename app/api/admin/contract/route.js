import { updateStatusContract } from "./controller/updateContractController"

export async function PATCH(req) {
    const data = await req.json()
    return await updateStatusContract(data)
}