"use client";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket";

export default function PruebaPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTrasnport] = useState("N/A");
  const [receivedMessage, setReceivedMessage] = useState(""); // Estado para almacenar el mensaje recibido

  useEffect(() => {
    const onMessage = (message) => {
      console.log("Mensaje recibido en el cliente:", message);
      setReceivedMessage(message); // Actualiza el estado con el mensaje recibido
    };

    const onConnect = () => {
      console.log("Conectado al servidor");
      setIsConnected(true);
      setTrasnport(socket.io.engine.transport.name);

      // Mueve la configuración del evento `message` aquí para asegurarte de que se registra después de la conexión
      socket.on("message", onMessage);

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Transport upgraded to:", transport.name);
        setTrasnport(transport.name);
      });
    };

    const onDisconnect = () => {
      console.log("Desconectado del servidor");
      setIsConnected(false);
      setTrasnport("N/A");
    };

    // Maneja la situación donde el socket ya está conectado
    if (socket.connected) {
      console.log("Socket ya está conectado");
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      // Limpieza de eventos
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>Received Message: {receivedMessage}</p>{" "}
      {/* Mostrar el mensaje recibido */}
      <button
        onClick={() => {
          console.log("Emitiendo mensaje: hola");
          socket.emit("message", "probando");
        }}
      >
        Enviar
      </button>
    </div>
  );
}
