import { createNotification } from "./controller/createNotification";
import { getNotificationsByUser } from "./controller/getNotificationController";
import { markGroupNotificationsAsRead } from "./controller/updateNotificationsController";

export async function POST(req) {
    const data = await req.json();
    return await createNotification(data);
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    if (id && type === "user") {
        // Convertir limit y offset a números enteros
        const limitNumber = limit ? parseInt(limit) : 20;
        const offsetNumber = offset ? parseInt(offset) : 0;

        return await getNotificationsByUser(id, limitNumber, offsetNumber);
    }
    if (id) {
        return await getNotificationsByUser(id);
    }
}

export async function PUT(req) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const data = await req.json();
    if (type === "markReadGroup") {
        return await markGroupNotificationsAsRead(data);
    }
}
