"use client";
import MessageContainer from "@/app/components/user/chats/chat/MessageContainer";
import MessageInput from "@/app/components/user/chats/chat/MessageInput";
import NavBar from "@/app/components/nav_bar/NavBar";
import { socket } from "@/app/socket";
import { useState, useEffect, useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";

export default function ChatPage(params) {
  const id = params.params.id;
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes recibidos
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state.user || null);

  useEffect(() => {
    const onMessage = (message) => {
      console.log("Mensaje recibido en el cliente:", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, type: "receiver" },
      ]); // Actualiza el estado con el mensaje recibido
    };

    const onConnect = () => {
      console.log("Conectado al servidor");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Transport upgraded to:", transport.name);
        setTransport(transport.name);
      });
    };

    socket.on("prueba", (message) => console.log("Prueba:", message)); // Asegúrate de registrar correctamente
    const onDisconnect = () => {
      console.log("Desconectado del servidor");
      setIsConnected(false);
      setTransport("N/A");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newMessage", onMessage); // Asegúrate de limpiar correctamente
    };
  }, []);

  socket.on("prueba", (message) => console.log("Prueba:", message)); // Asegúrate de registrar correctamente

  const sendMessage = async (message) => {
    try {
      console.log(user.id);

      const response = await axios.post("/api/message", {
        chatId: id,
        body: message,
        userId: user.id,
      });
      socket.emit("sendMessage", {
        chatId: id,
        body: message,
        userId: user.id,
      });
      console.log("Enviado:", message);
    } catch (error) {
      console.log(error);
    }
  };

  // Uso de useEffect para ver cambios en messages
  useEffect(() => {
    setUser(state.user);
  }, [state.user, dispatch]);

  useEffect(() => {
    console.log("Estado de conexión:", socket.connected);
  }, [socket]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main className="flex flex-col justify-center items-center m-2">
        <MessageContainer messages={messages} />{" "}
        {/* Pasar mensajes al MessageContainer */}
        <MessageInput onSendMessage={sendMessage} />
      </main>
    </div>
  );
}
