import { createRentalPeriod } from "./controller/createRentalPeriodController";
import { deleteGroupRentalPeriods, deleteRentalPeriodById } from "./controller/deleteRentalPeriod";
import { getRentalPeriods } from "./controller/getRentalPeriodController";
import { updateRentalPeriod, updateRentalPeriodStatus } from "./controller/updateRentalPeriodController";

export async function GET(req) {
    const rentalPeriods = await getRentalPeriods();
    return NextResponse.json({ rentalPeriods }, { status: 200 })
}

export async function POST(req) {
    const data = await req.json()
    return await createRentalPeriod(data)
}

export async function PUT(req) {
    const data = await req.json()
    return await updateRentalPeriod(data)
}

export async function PATCH(req) {
    const data = await req.json()
    return await updateRentalPeriodStatus(data)
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id) {
        return await deleteRentalPeriodById(id)
    }
    return await deleteGroupRentalPeriods(ids)
}