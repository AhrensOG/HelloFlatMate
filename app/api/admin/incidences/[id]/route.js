import { deleteIncidence } from "../controller/deleteIncidence";

export async function DELETE(req, { params }) {
    const { id } = await params;
    const result = await deleteIncidence(id);
    return result;
}
