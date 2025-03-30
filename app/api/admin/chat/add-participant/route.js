import { addChatParticipant } from "./controller/addParticipant";

export async function POST(req) {
    return await addChatParticipant(req);
}
