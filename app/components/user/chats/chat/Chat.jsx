import NavBar from "@/app/components/nav_bar/NavBar";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
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
  const [userId, setUserId] = useState(
    searchParams.get("userId") || clientId || state?.user?.id
  );

  const [chatId, setChatId] = useState(initialChatId);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]);
  const socket = getSocket();

  // Función para crear un nuevo chat de soporte
  const createNewSuppChat = async () => {
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
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/message?chatId=${chatId}`);
        console.log(res.data);
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };

    if (!userId) {
      setUserId(clientId || state?.user?.id);
    }
    if (messages.length === 0) {
      fetchMessages();
    }
  }, [clientId, state?.user?.id]);

  // Configuración de conexión al socket
  useEffect(() => {
    if (chatId) {
      if (socket) {
        const usuarioId = searchParams.get("userId");
        console.log(usuarioId);

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
              const isSender = message.senderId == userId;
              console.log("isSender:", isSender);

              setMessages((prevMessages) => [
                ...prevMessages,
                { ...message, type: isSender ? "sender" : "receiver" },
              ]);
              if (isSender) {
                saveMessage({
                  chatId,
                  body: message.text,
                  userId: usuarioId,
                });
              }
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
        senderId: userId,
        time: new Date().toLocaleTimeString(),
        userName: state?.user?.name + " " + state?.user?.lastName,
      };

      socket.emit("sendMessage", newMessage);
    }
  };

  const saveMessage = async (data) => {
    try {
      const res = await axios.post("/api/message", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (false) {
    return (
      <div className="flex items-center justify-center flex-1 absolute inset-0">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-2">
        <NavBar />
      </header>

      <main className="flex flex-col justify-between items-center flex-grow w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <MessageContainer messages={messages} socketId={userId} />
        </Suspense>
        <MessageInput onSendMessage={sendMessage} />
      </main>
    </div>
  );
}
