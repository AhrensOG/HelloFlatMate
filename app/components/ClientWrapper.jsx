"use client";

import { NextIntlClientProvider } from "next-intl";
import GlobalContext, { Context } from "../context/GlobalContext";
import { Toaster } from "sonner";
import { disconnectNotificationSocket, getNotificationSocket } from "../socket";
import { useContext, useEffect } from "react";

function getDecodedCookie(cookieName) {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});

    if (cookies[cookieName]) {
        try {
            const decodedString = atob(decodeURIComponent(cookies[cookieName]));
            return JSON.parse(decodedString);
        } catch (error) {
            console.error("❌ Error al decodificar la cookie:", error);
            return null;
        }
    }
    return null;
}

export default function ClientWrapper({ children, locale, messages }) {
    const { state, dispatch } = useContext(Context);
    const userData = getDecodedCookie("auth_token");

    useEffect(() => {
        if (!userData?.userId) return;

        const socket = getNotificationSocket(userData?.userId);
        let isSocketConnected = false;

        if (socket && !isSocketConnected) {
            socket.on("connect", () => {
                isSocketConnected = true;
            });

            socket.emit("userConnected", userData?.userId);

            socket.on("newNotification", (notif) => {
                dispatch({ type: "ADD_NOTIFICATION", payload: notif });

                // Asegurar que unreadCount se actualiza en base al valor actual del estado
                dispatch((prevState) => ({
                    type: "UPDATE_UNREAD_COUNT",
                    payload: prevState.unreadCount + 1,
                }));
            });

            return () => {
                disconnectNotificationSocket();
            };
        }
    }, [userData?.userId, dispatch]);

    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Madrid">
            <GlobalContext>
                {children}
                <Toaster richColors={true} duration={3000} />
            </GlobalContext>
        </NextIntlClientProvider>
    );
}
