import NavBar from "@/app/components/nav_bar/NavBar";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";
import { disconnectSocket, getSocket } from "@/app/socket";
import { Context } from "@/app/context/GlobalContext";

export default function Chat() {
  const searchParams = useSearchParams();
  // const clientId = searchParams.get("id");
  // const typeChat = searchParams.get("type");
  // let haveChattSupport = searchParams.get("bool") === "true"; // Convertir a booleano
  // const initialChatId = searchParams.get("chat");

  const [clientId, setClientId] = useState(false);
  const [typeChat, setTypeChat] = useState(false);
  const [haveChattSupport, setHaveChattSupport] = useState(false);
  const [userId, setUserId] = useState(false);
  const [chatId, setChatId] = useState(false);

  const { state, dispatch } = useContext(Context);
  // const [userId, setUserId] = useState(
  //   searchParams.get("userId") || clientId || state?.user?.id
  // );

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]);
  // const socket = getSocket();
  const [socket, setSocket] = useState(false);
  const [isConnectedToRoom, setIsConnectedToRoom] = useState(false);

  // Función para crear un nuevo chat de soporte
  const createNewSuppChat = async () => {
    try {
      const res = await axios.post("/api/chat", {
        type: "SUPPORT",
        receiverId: clientId || userId,
      });
      // Asumiendo que la respuesta contiene el ID del nuevo chat
      setChatId(res.data.chat.id);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para cambiar el estado del chat de soporte
  const changeStateSuppChat = async () => {
    try {
      await axios.patch(`/api/chat?id=${chatId}&type=act`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!clientId || !userId || !typeChat || !haveChattSupport || !chatId) {
      const client = searchParams.get("id");
      const type = searchParams.get("type");
      const haveChat = searchParams.get("bool") === "true"; // Convertir a booleano
      const chat = searchParams.get("chat");
      const user = client || searchParams.get("userId") || state.user?.id;

      setClientId(client);
      setTypeChat(type);
      setHaveChattSupport(haveChat);
      setChatId(chat);
      setUserId(user);
    }
  }, []);

  // Efecto para manejar la creación del chat de soporte
  useEffect(() => {
    if (typeChat === "supp" && !haveChattSupport && !chatId) {
      createNewSuppChat();
      setHaveChattSupport(true);
    } else if (chatId && typeChat === "supp" && haveChattSupport) {
      changeStateSuppChat();
      setHaveChattSupport(false);
    }
  }, [typeChat]);

  useEffect(() => {
    if (state.user?.id && !socket) {
      setSocket(getSocket(state.user.id));
    }
  }, [state?.user?.id]);

  // Configuración de conexión al socket
  useEffect(() => {
    if (socket && chatId) {
      const usuarioId = searchParams.get("userId") || searchParams.get("id") ;

      const handleSocketConnect = () => {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);

        // Unir al usuario a la sala de chat
        socket.emit("joinChat", chatId.toString(), () => {
          console.log(`Unido a la sala ${chatId}`);
          setIsConnectedToRoom(true);
        });

        // Escuchar el evento de mensajes entrantes
        socket.on("newMessage", (message) => {
          console.log("Mensaje recibido en el cliente:", message);
          if (message && message.senderId) {
            const isSender = message.senderId == userId;

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

      // Verificar si el socket ya está conectado
      if (socket.connected) {
        handleSocketConnect(); // Llamar directamente si ya está conectado
      }

      // Configurar eventos del socket
      socket.on("connect", handleSocketConnect);
      socket.on("disconnect", handleSocketDisconnect);

      return () => {
        // Limpiar eventos al desmontar el componente
        socket.off("connect", handleSocketConnect);
        socket.off("disconnect", handleSocketDisconnect);
        disconnectSocket();
      };
    }
  }, [socket, chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/message?chatId=${chatId}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };

    if (!userId) {
      setUserId(clientId || state?.user?.id);
    }
    if (messages.length === 0 && chatId) {
      fetchMessages();
    }
  }, [clientId, state?.user?.id, chatId]);

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

  if (!socket || !chatId) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="px-2">
          <NavBar />
        </header>
        <main className="flex flex-col justify-between items-center flex-grow w-full">
          <div className="flex items-center justify-center flex-1 absolute inset-0">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        </main>
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
