"use client";
import MessageContainer from "@/app/components/user/chats/chat/MessageContainer";
import MessageInput from "@/app/components/user/chats/chat/MessageInput";
import NavBar from "@/app/components/nav_bar/NavBar";
import { getSocket } from "@/app/socket";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]); // Almacena mensajes recibidos
  const [socketId, setSocketId] = useState(null); // Guardar el ID del socket del usuario
  const roomId = 3;
  const socket = getSocket();

  useEffect(() => {
    if (!socketId) {
      setSocketId(socket.id); // Almacenar el ID del socket del usuario aquí, después de la conexión
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      // Unir al usuario a la sala de chat cuando el socket esté listo
      socket.emit("joinChat", roomId.toString(), () => {
        console.log(`Joined room ${roomId}`);
      });
      
      console.log("holaaaaaaaaaaaaaaaaaaa")
      const onMessage = (message) => {
      console.log("holaaaaaaaaaaaaaaaaaaa DESDE ONmESSAGE")
        console.log("Mensaje recibido en el cliente:", message);

        // Solo agregar mensajes si `senderId` y `socketId` son válidos
        if (message && message.senderId && socketId) {
          const isSender = message.senderId === socketId;
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...message, type: isSender ? "sender" : "receiver" },
          ]);
        }
      };

      const onConnect = () => {
        console.log("Conectado al servidor");
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);

        socket.on("newMessage", onMessage); // Escuchar el evento 'newMessage'

        socket.io.engine.on("upgrade", (transport) => {
          console.log("Transport upgraded to:", transport.name);
          setTransport(transport.name);
        });
      };

      const onDisconnect = () => {
        console.log("Desconectado del servidor");
        setIsConnected(false);
        setTransport("N/A");
        setSocketId(null); // Reiniciar socketId cuando el socket se desconecte
      };

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("newMessage", onMessage);
      };
    }
  }, [socket, socketId]); // Asegúrate de que socket y socketId estén definidos

  // Función para enviar mensaje
  const sendMessage = (message) => {
    if (socketId) {
      const newMessage = {
        roomId: roomId.toString(),
        text: message,
        senderId: socketId, // Enviar el ID del socket como identificador del remitente
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, type: "sender" },
      ]); // Añadir el mensaje al estado local como remitente
      socket.emit("sendMessage", newMessage); // Emitir al servidor
      console.log(messages)
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-2">
        <NavBar />
      </header>

      <main className="flex flex-col justify-between items-center flex-grow w-full">
        <MessageContainer messages={messages} socketId={socketId} />

        <MessageInput onSendMessage={sendMessage} />
      </main>
    </div>
  );
}
