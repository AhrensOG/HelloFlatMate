"use client";

import { NextIntlClientProvider } from "next-intl";
import GlobalContext from "../context/GlobalContext";
import { Toaster } from "sonner";
import { disconnectNotificationSocket, getNotificationSocket } from "../socket";

function getDecodedCookie(cookieName) {
    if (typeof document === "undefined") return null; // Evitar errores en SSR

    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});

    if (cookies[cookieName]) {
        try {
            // Decodificar Base64 y parsear a JSON
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
    const userData = getDecodedCookie("auth_token");
    const socket = getNotificationSocket(userData?.userId);
    let isSocketConnected = false;

    if (socket && !isSocketConnected) {
        console.log(isSocketConnected);

        socket.on("connect", () => {
            console.log(`✅ Conectado a Socket.IO con ID: ${socket.id}`);
            isSocketConnected = true;
        });
        socket.emit("userConnected", userData?.userId);
    } else {
        console.log("🔴 Socket de notificaciones desconectado.");
        disconnectNotificationSocket();
    }

    socket.on("newNotification", () => {
        console.log("🔔 Nueva notificacion");
    });

    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Madrid">
            <GlobalContext>
                {children}
                <Toaster richColors={true} duration={3000} />
            </GlobalContext>
        </NextIntlClientProvider>
    );
}
