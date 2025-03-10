import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

let notificationSocket = null; // 🔔 Socket de notificaciones
let chatSockets = {}; // 💬 Múltiples sockets de chat

// 🔔 Obtener el socket de notificaciones (global, solo uno)
export const getNotificationSocket = (userId) => {
    const userIdToString = userId;
    if (isBrowser && !notificationSocket) {
        console.log("🔔 Conectando socket de notificaciones...");
        const socketServerUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:4000";

        notificationSocket = io(socketServerUrl, {
            transports: ["websocket", "polling"],
            reconnectionAttempts: 5,
            timeout: 10000,
            upgrade: true,
            query: { type: "notification", userId: userIdToString }, // Se especifica el tipo de socket
        });

        notificationSocket.on("connect", () => {
            // console.log("✅ Notificaciones conectadas con ID:", notificationSocket.id);
        });

        notificationSocket.on("disconnect", () => {
            // console.log("🔴 Socket de notificaciones desconectado.");
        });
    }

    return notificationSocket;
};

// 💬 Obtener un socket específico para un chat
export const getChatSocket = (roomId, userId) => {
    if (isBrowser && !chatSockets[roomId]) {
        console.log(`💬 Conectando socket de chat para la sala ${roomId}...`);
        const socketServerUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:4000";

        chatSockets[roomId] = io(socketServerUrl, {
            transports: ["websocket", "polling"],
            reconnectionAttempts: 5,
            timeout: 10000,
            upgrade: true,
            query: { type: "chat", roomId, userId }, // Cada chat tiene un roomId único
        });

        chatSockets[roomId].on("connect", () => {
            // console.log(`✅ Chat ${roomId} conectado con ID:`, chatSockets[roomId].id);
        });

        chatSockets[roomId].on("disconnect", () => {
            // console.log(`🔴 Socket de chat ${roomId} desconectado.`);
            delete chatSockets[roomId]; // Eliminar la referencia al socket cuando se desconecta
        });
    }

    return chatSockets[roomId];
};

// 🔴 Desconectar un socket de chat específico
export const disconnectChatSocket = (roomId) => {
    if (chatSockets[roomId]) {
        // console.log(`🚪 Desconectando socket de chat ${roomId}...`);
        chatSockets[roomId].disconnect();
        delete chatSockets[roomId]; // Eliminar la referencia al socket
    }
};

// 🔴 Desconectar todos los sockets de chat
export const disconnectAllChatSockets = () => {
    Object.keys(chatSockets).forEach((roomId) => {
        disconnectChatSocket(roomId);
    });
};

// 🔴 Desconectar el socket de notificaciones
export const disconnectNotificationSocket = () => {
    if (notificationSocket) {
        // console.log("🔴 Desconectando socket de notificaciones...");
        notificationSocket.disconnect();
        notificationSocket = null;
    }
};
