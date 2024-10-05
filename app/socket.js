import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
let socket;

export const getSocket = () => {
  if (isBrowser && !socket) {
    // Conecta al servidor de chat
    socket = io('http://localhost:4000', { // Reemplaza con la URL de tu servidor en producción
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
      upgrade: true,
    });

    // Eventos de conexión/desconexión
    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Manejar errores de conexión
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Manejar intentos de reconexión
    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    socket.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error);
    });

    socket.on("reconnect_failed", () => {
      console.error("Reconnection failed");
    });
  }

  return socket;
};
