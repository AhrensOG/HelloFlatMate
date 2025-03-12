import { Notification } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getAllNotifications() {
    try {
        const notifications = await Notification.findAll();
        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function getNotificationsByUser(id, limit = 20, offset = 0) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const [notif, unreadCount] = await Promise.all([
            Notification.findAll({
                where: {
                    userId: id,
                    [Op.or]: [{ type: { [Op.ne]: "CHAT" } }, { type: "CHAT", isRead: false }],
                },
                order: [["date", "DESC"]],
                limit,
                offset,
            }),
            Notification.count({
                where: {
                    userId: id,
                    isRead: false,
                },
            }),
        ]);

        return NextResponse.json(
            {
                notifications: notif,
                unreadCount: unreadCount,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
