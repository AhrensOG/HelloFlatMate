import axios from "axios";
import NotificationCard from "./NotificationCard";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotificationsModal({ data = [], userId, unreadCount }) {
    const [notifications, setNotifications] = useState(data || []);
    const [offset, setOffset] = useState(20);
    const [loadingMore, setLoadingMore] = useState(false);
    const [noMoreNotifications, setNoMoreNotifications] = useState(false);
    const [unreadCountState, setUnreadCountState] = useState(unreadCount);

    const markAsReadNotification = async (notifications) => {
        const notifNotRead = notifications.filter((notif) => !notif.isRead).map((notif) => notif.id);

        if (notifNotRead.length === 0) return;

        try {
            await axios.put("/api/notification?type=markReadGroup", notifNotRead, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setUnreadCountState((prev) => Math.max(0, prev - notifNotRead.length)); // Asegura que no sea negativo
            console.log("📨 Notificaciones marcadas como leídas:", notifNotRead.length);
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

    useEffect(() => {
        if (data?.length > 0) {
            markAsReadNotification(data);
        }
    }, [data]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-12 right-12 max-h-[40rem] w-[20rem] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2 p-2 overflow-y-auto"
            >
                {notifications.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No hay notificaciones</p>
                ) : (
                    notifications.map((notif) => <NotificationCard key={notif.id} data={notif.description} />)
                )}

                {loadingMore ? (
                    <div className="flex justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 border-4 border-gray-200 rounded-full border-t-gray-600" viewBox="0 0 24 24" />
                    </div>
                ) : noMoreNotifications ? (
                    <p className="text-center text-gray-500">No hay más notificaciones</p>
                ) : (
                    notifications.length > 0 && (
                        <Link className="hover:text-resolution-blue font-medium text-lg mx-auto" href={`/pages/user/notification`}>
                            Ver más
                        </Link>
                    )
                )}
            </motion.div>
        </AnimatePresence>
    );
}
