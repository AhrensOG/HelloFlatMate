import { createChat } from "./controller/createChat";

export async function POST(req) {
    return await createChat(req);
}
