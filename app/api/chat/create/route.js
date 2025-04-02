import { createGroupChats, createPrivateChats, createSupportChats } from "./controller/createGroups";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (action === "group") {
        return await createGroupChats();
    } else if (action === "private") {
        return await createPrivateChats();
    } else if (action === "support") {
        return await createSupportChats();
    }
}
