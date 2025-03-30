import { deleteChat } from "../controller/deleteChat";

export async function DELETE(request, { params }) {
    const { id } = await params;
    return await deleteChat(id);
}
