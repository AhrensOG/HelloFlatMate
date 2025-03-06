import { Notification } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllNotifications() {
    try {
        const notifications = await Notification.findAll();
        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function getNotificationsByUser(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const notif = await Notification.findAll({ where: { userId: id } });
        return NextResponse.json(notif, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
