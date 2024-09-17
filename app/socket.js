import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

let socket; // Almacenará la instancia del socket para evitar múltiples conexiones

// Función para crear el socket solo si no existe ya una instancia
export const getSocket = () => {
  if (isBrowser && !socket) {
    // Se crea una nueva conexión de socket si estamos en el navegador y no hay instancia previa
    socket = io({
      transports: ["websocket", "polling"], // Se permiten ambos transportes
      reconnectionAttempts: 5, // Intentos de reconexión si se pierde la conexión
      timeout: 10000, // Tiempo límite de espera para conectarse
      upgrade: true, // Intentar hacer upgrade a WebSocket si es posible
    });

    // Eventos de ejemplo
    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  return socket;
};
