import { Notification } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function markNotificationAsRead(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const notification = (await Notification.findByPk(id)) || NextResponse.json({ error: "Notification not found" }, { status: 404 });
        notification.isRead = true;
        await notification.save();
        return NextResponse.json(notification, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
export async function markAllNotificationsAsRead(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        await Notification.update(
            { isRead: true },
            {
                where: {
                    userId: id,
                    isRead: false,
                },
            }
        );
        return NextResponse.json({ message: "All notifications marked as read" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function markGroupNotificationsAsRead(data) {
    if (!data || !data.length) {
        return NextResponse.json({ error: "No notification IDs provided" }, { status: 400 });
    }

    try {
        await Notification.update(
            { isRead: true },
            {
                where: {
                    id: {
                        [Op.in]: data, // Usar operador IN para array de IDs
                    },
                },
            }
        );
        return NextResponse.json({ message: "Notifications marked as read" }, { status: 200 });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
