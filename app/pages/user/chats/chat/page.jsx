"use client";
import MessageContainer from "@/app/components/user/chats/chat/MessageContainer";
import MessageInput from "@/app/components/user/chats/chat/MessageInput";
import NavBar from "@/app/components/nav_bar/NavBar";
import { socket } from "@/app/socket";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes recibidos

  useEffect(() => {
    const onMessage = (message) => {
      console.log("Mensaje recibido en el cliente:", message);
      setMessages((prevMessages) => [...prevMessages, message]); // Actualiza el estado con el mensaje recibido
    };

    const onConnect = () => {
      console.log("Conectado al servidor");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.on("newMessage", (mess) => {
        onMessage(mess);
      }); // Cambié 'message' a 'newMessage' para que coincida con el evento del servidor

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Transport upgraded to:", transport.name);
        setTransport(transport.name);
      });
    };

    const onDisconnect = () => {
      console.log("Desconectado del servidor");
      setIsConnected(false);
      setTransport("N/A");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Limpiar eventos
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newMessage", onMessage); // Cambié 'message' a 'newMessage'
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("sendMessage", { roomId: 1, text: message });
    console.log("Enviado:", message);
  };

  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main className="flex flex-col justify-center items-center m-2">
        <MessageContainer /> {/* Pasar mensajes al MessageContainer */}
        <MessageInput onSendMessage={sendMessage} />
      </main>
    </div>
  );
}
