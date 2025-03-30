"use client";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

export default function Notification() {
    const route = useRouter();
    const { state } = useContext(Context);

    // Estado para todas las notificaciones y paginación
    const [allNotifications, setAllNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 50;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state?.user?.id) {
            fetchNotifications();
        }
    }, [state?.user?.id]);

    // 🔹 Obtener todas las notificaciones
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/notification?id=${state.user.id}&type=all`);
            const notifications = res.data || [];

            console.log("📨 Notificaciones obtenidas:", notifications);

            setAllNotifications(notifications);
            setVisibleNotifications(notifications.slice(0, PAGE_SIZE));

            markAsReadNotification(notifications.slice(0, PAGE_SIZE));
        } catch (error) {
            console.error("❌ Error al obtener notificaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Marcar notificaciones como leídas
    const markAsReadNotification = async (notifications) => {
        const unread = notifications.filter((notif) => !notif.isRead).map((notif) => notif.id);
        if (unread.length === 0) return;

        try {
            await axios.put("/api/notification?type=markReadGroup", unread, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("📨 Notificaciones marcadas como leídas:", unread.length);
        } catch (error) {
            console.error("❌ Error al marcar notificaciones como leídas:", error);
        }
    };

    // 🔹 Cargar más notificaciones
    const loadMoreNotifications = () => {
        const nextPage = currentPage + 1;
        const nextNotifications = allNotifications.slice(0, nextPage * PAGE_SIZE);

        setVisibleNotifications(nextNotifications);
        setCurrentPage(nextPage);

        markAsReadNotification(nextNotifications.slice((nextPage - 1) * PAGE_SIZE, nextPage * PAGE_SIZE));
    };

    // 🔹 Formatear fecha y hora con JavaScript nativo
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleDateString("es-ES", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
        const formattedTime = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false });
        return { formattedDate, formattedTime };
    };

    return (
        <div className="notification-page w-screen min-h-screen flex flex-col items-center">
            {/* 🔹 Header */}
            <header className="notification-header w-full bg-white shadow-md p-4 flex items-center">
                <button type="button" onClick={() => route.back()} className="p-2 rounded-lg hover:bg-gray-200 transition">
                    <Image src="/back-light.svg" width={24} height={24} alt="Volver" />
                </button>
                <h1 className="ml-4 text-2xl font-semibold text-gray-800">Notificaciones</h1>
            </header>

            {/* 🔹 Contenido */}
            <main className="notification-main flex flex-col items-center w-full max-w-6xl p-6">
                {/* 🔹 Si no hay notificaciones */}
                {visibleNotifications.length === 0 && !loading ? (
                    <div className="flex flex-col items-center gap-4 mt-[10rem] ">
                        <Image src="/notification-big-icon.svg" width={300} height={300} alt="Sin Notificaciones" />
                        <h2 className="text-center font-semibold text-gray-800">No tienes notificaciones ahora</h2>
                        <p className="text-center text-base font-light text-gray-500">Aquí se mostrarán tus notificaciones cuando tengas alguna.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {/* 🔹 Renderiza cada notificación */}
                        {visibleNotifications.map((notif) => {
                            const { formattedDate, formattedTime } = formatDateTime(notif.date);
                            return (
                                <div key={notif.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                                    <h3 className="font-semibold text-gray-800">{notif.title}</h3>
                                    <p className="text-gray-600 mt-1">{notif.description}</p>
                                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                        <span>{formattedDate}</span>
                                        <span>{formattedTime}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 🔹 Botón para cargar más */}
                {visibleNotifications.length < allNotifications.length && (
                    <button
                        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                        onClick={loadMoreNotifications}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Ver más"}
                    </button>
                )}
            </main>
        </div>
    );
}
