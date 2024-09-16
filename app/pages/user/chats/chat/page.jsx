"use client";
import MessageContainer from "@/app/components/user/chats/chat/MessageContainer";
import MessageInput from "@/app/components/user/chats/chat/MessageInput";
import NavBar from "@/app/components/nav_bar/NavBar";
import { useState, useEffect } from "react";
import { getSocket } from "@/app/socket";

export default function ChatPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]); // Almacena mensajes recibidos
  const roomId = 3;
  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      // Asignar el socketId después de la conexión
      const handleSocketConnect = () => {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
        console.log(`Conectado al servidor con socketId: ${socket.id}`);

        // Unir al usuario a la sala de chat
        socket.emit("joinChat", roomId.toString(), () => {
          console.log(`Unido a la sala ${roomId}`);
        });

        // Escuchar el evento de mensajes entrantes
        socket.on("newMessage", (message) => {
          console.log("Mensaje recibido en el cliente:", message);

          if (message && message.senderId) {
            const isSender = message.senderId === socket.id;
            setMessages((prevMessages) => [
              ...prevMessages,
              { ...message, type: isSender ? "sender" : "receiver" },
            ]);
          }
        });
      };

      const handleSocketDisconnect = () => {
        console.log("Desconectado del servidor");
        setIsConnected(false);
        setTransport("N/A");
      };

      // Configurar eventos del socket
      socket.on("connect", handleSocketConnect);
      socket.on("disconnect", handleSocketDisconnect);

      return () => {
        // Limpiar eventos al desmontar el componente
        socket.off("connect", handleSocketConnect);
        socket.off("disconnect", handleSocketDisconnect);
        socket.off("newMessage");
      };
    }
  }, [socket]);

  // Función para enviar mensaje
  const sendMessage = (message) => {
    if (socket) {
      console.log("hola")
      const newMessage = {
        roomId: roomId.toString(),
        text: message,
        senderId: socket?.id, // Enviar el ID del socket como identificador del remitente
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, type: "sender" },
      ]); // Añadir el mensaje al estado local como remitente
      socket.emit("sendMessage", newMessage); // Emitir al servidor
      console.log("Mensaje enviado:", newMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-2">
        <NavBar />
      </header>

      <main className="flex flex-col justify-between items-center flex-grow w-full">
        <MessageContainer messages={messages} socketId={socket?.id} />
        <MessageInput onSendMessage={sendMessage} />
      </main>
    </div>
  );
}
