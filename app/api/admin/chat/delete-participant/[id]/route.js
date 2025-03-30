import { deleteChatParticipant } from "../controller/deleteChatParticipant";

export async function DELETE(request, { params }) {
    const { id } = await params;
    return await deleteChatParticipant(id);
}
