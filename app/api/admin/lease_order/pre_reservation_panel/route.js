import { deleteLeaseOrderForReservationPanel } from "./controller/deleteLeaseOrderForReservationPanel";

export async function DELETE(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const result = await deleteLeaseOrderForReservationPanel(id);
    return result
}