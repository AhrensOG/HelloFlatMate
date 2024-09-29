import NavBar from "@/app/components/nav_bar/NavBar";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getSocket } from "@/app/socket";
import { Context } from "@/app/context/GlobalContext";

export default function Chat() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("id");
  const typeChat = searchParams.get("type");
  let haveChattSupport = searchParams.get("bool") === "true"; // Convertir a booleano
  const initialChatId = searchParams.get("chat");

  const { state, dispatch } = useContext(Context);
  const [userId, setUserId] = useState(clientId || state?.user?.id);

  const [chatId, setChatId] = useState(initialChatId);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]);
  const socket = getSocket();

  // Función para crear un nuevo chat de soporte
  const createNewSuppChat = async () => {
    console.log("creando nuevo chat");

    try {
      const res = await axios.post("/api/chat", {
        type: "SUPPORT",
        receiverId: clientId,
      });
      // Asumiendo que la respuesta contiene el ID del nuevo chat
      setChatId(res.data.chat.id);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para cambiar el estado del chat de soporte
  const changeStateSuppChat = async () => {
    console.log("modificando chat");

    try {
      await axios.patch(`/api/chat?id=${chatId}&type=act`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      setUserId(clientId || state?.user?.id);
    }
  }, [clientId, state?.user?.id]);

  // Configuración de conexión al socket
  useEffect(() => {
    if (chatId) {
      if (socket) {
        const handleSocketConnect = () => {
          setIsConnected(true);
          setTransport(socket.io.engine.transport.name);
          console.log(`Conectado al servidor con socketId: ${socket.id}`);

          // Unir al usuario a la sala de chat
          socket.emit("joinChat", chatId.toString(), () => {
            console.log(`Unido a la sala ${chatId}`);
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
              saveMessage({
                chatId,
                body: message.text,
                userId: state?.user?.id,
              });
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
    }
  }, [socket, chatId]);

  // Efecto para manejar la creación del chat de soporte
  useEffect(() => {
    if (typeChat === "supp" && !haveChattSupport && !chatId) {
      createNewSuppChat();
      haveChattSupport = true;
    } else if (chatId && typeChat === "supp" && haveChattSupport) {
      changeStateSuppChat();
      haveChattSupport = false;
    }
  }, [typeChat]);

  // Función para enviar mensaje
  const sendMessage = (message) => {
    if (socket) {
      const newMessage = {
        roomId: chatId.toString(),
        text: message,
        senderId: socket?.id,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", newMessage);
      console.log("Mensaje enviado:", newMessage);
    }
  };

  const saveMessage = async (message) => {
    console.log(message, userId);

    try {
      const res = await axios.post("/api/message", {
        ...message,
        userId: userId,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!userId) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {console.log(userId)}
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
