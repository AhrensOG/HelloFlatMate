import { updateRentalPeriodStatus } from "./controller/updateRentalPeriodController";

export async function PATCH(req) {
    const data = await req.json()
    return await updateRentalPeriodStatus(data)
}
