import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";
import { disconnectChatSocket, getChatSocket } from "@/app/socket";
import { Context } from "@/app/context/GlobalContext";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { toast } from "sonner";

export default function Chat({ adminPage = false }) {
    const searchParams = useSearchParams();

    const [clientId, setClientId] = useState(false);
    const [typeChat, setTypeChat] = useState(false);
    const [haveChattSupport, setHaveChattSupport] = useState(false);
    const [userId, setUserId] = useState(false);
    const [receiverId, setReceiverId] = useState(false);
    const [chatId, setChatId] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const { state, dispatch } = useContext(Context);

    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(false);
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false);
    const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false); // ✅ Evita bucles
    const relatedType = searchParams.get("relatedType");
    const relatedId = searchParams.get("relatedId");

    //Funcion para pasar de arrayBuffer a file
    const arrayBufferToFile = (arrayBuffer, fileName, mimeType = "application/octet-stream") => {
        const blob = new Blob([arrayBuffer], { type: mimeType });

        const file = new File([blob], fileName, { type: mimeType });

        return file;
    };

    // Función para crear un nuevo chat de soporte
    const createNewSuppChat = async () => {
        try {
            const res = await axios.post("/api/chat", {
                type: "SUPPORT",
                receiverId: clientId || userId,
                senderId: state?.user?.id,
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
            const receiverId = searchParams.get("receiverId");

            setClientId(client);
            setTypeChat(type);
            setHaveChattSupport(haveChat);
            setChatId(chat);
            setUserId(user);
            setReceiverId(receiverId);
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
            setSocket(getChatSocket(state.user.id));
        }
    }, [state?.user?.id]);

    // Configuración de conexión al socket
    useEffect(() => {
        if (chatId && userId) {
            const usuarioId = searchParams.get("userId") || searchParams.get("id");
            const chatSocket = getChatSocket(chatId, userId);
            setSocket(chatSocket);

            const handleSocketConnect = () => {
                setIsConnected(true);
                setTransport(chatSocket.io.engine.transport.name);

                // Unir al usuario a la sala de chat
                chatSocket.emit("joinChat", chatId.toString(), userId.toString(), () => {
                    setIsConnectedToRoom(true);
                });
            };

            const handleNewMessage = (message) => {
                if (message && message.senderId) {
                    const isSender = message.senderId == userId;
                    setMessages((prevMessages) => [...prevMessages, { ...message, type: isSender ? "sender" : "receiver" }]);

                    if (isSender) {
                        saveMessage({
                            chatId,
                            body: message.text,
                            userId: usuarioId,
                            type: "TEXT",
                            isRead: true,
                        });
                    }
                }
            };

            const handleNewFile = (message) => {
                if (message && message.senderId) {
                    const isSender = message.senderId == userId;
                    setMessages((prevMessages) => [...prevMessages, { ...message, type: isSender ? "sender" : "receiver" }]);

                    if (isSender) {
                        handleFileUpload(message);
                    }
                }
            };

            const handleSocketDisconnect = () => {
                setIsConnected(false);
                setTransport("N/A");
            };

            // Verificar si el socket ya está conectado
            if (chatSocket.connected) {
                handleSocketConnect(); // Llamar directamente si ya está conectado
            }

            // Configurar eventos del socket
            chatSocket.on("connect", handleSocketConnect);
            chatSocket.on("disconnect", handleSocketDisconnect);
            chatSocket.on("newMessage", handleNewMessage);
            chatSocket.on("newFile", handleNewFile);

            return () => {
                chatSocket.off("connect", handleSocketConnect);
                chatSocket.off("disconnect", handleSocketDisconnect);
                chatSocket.off("newMessage", handleNewMessage);
                chatSocket.off("newFile", handleNewFile);
                disconnectChatSocket(chatId);
                setSocket(null);
            };
        }
    }, [chatId, userId]);

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

    const markAsRead = async () => {
        if (!chatId || !userId || hasMarkedAsRead) return; // ✅ Evita reejecución

        const unreadMessages = messages.filter((msg) => !msg.isRead && msg.senderId !== userId);
        if (unreadMessages.length === 0) return;

        try {
            await axios.patch("/api/message", { messages: unreadMessages.map((msg) => msg.id) });
            setMessages((prevMessages) =>
                prevMessages.map((msg) => (unreadMessages.some((unread) => unread.id === msg.id) ? { ...msg, isRead: true } : msg))
            );

            setHasMarkedAsRead(true); // ✅ Solo se ejecutará una vez
        } catch (error) {
            console.error("❌ Error al marcar mensajes como leídos:", error);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            markAsRead();
        }
    }, [messages]); // ✅ Solo se ejecuta cuando los mensajes cambian

    // Función para enviar mensaje
    const sendMessage = (message) => {
        if (socket) {
            const newMessage = {
                roomId: chatId.toString(),
                text: message,
                senderId: userId,
                time: new Date().toLocaleTimeString(),
                userName: state?.user?.name + " " + state?.user?.lastName,
                receiverId: typeChat === "group" ? null : receiverId,
                typeChat: typeChat,
            };

            socket.emit("sendMessage", newMessage);
        }
    };

    const sendFile = async (files) => {
        if (socket && files?.length > 0) {
            setIsUploading(true); // Activa el spinner antes de comenzar la carga
            try {
                const uploadedFile = await uploadFiles([files[0]]);
                // Crea un objeto de mensaje con el archivo como Blob
                const newMessage = {
                    roomId: chatId.toString(),
                    image: uploadedFile[0].url, // Pasamos el archivo como Blob directamente
                    senderId: userId,
                    time: new Date().toLocaleTimeString(),
                    userName: `${state?.user?.name} ${state?.user?.lastName}`,
                };
                // Emitimos el archivo al servidor
                socket.emit("sendFile", newMessage);
                setIsUploading(false);
            } catch (error) {
                toast.warning("Ocurrio un error al envíar la imagen", {
                    description: "Intenta nuevamente.",
                });
                setIsUploading(false);
                return;
            }
        }
    };

    const handleFileUpload = async (message) => {
        try {
            // Llamada a saveMessage después de obtener la URL del archivo subido
            saveMessage({
                chatId,
                body: message.image,
                userId: message.senderId,
                type: "IMAGE",
                isRead: true,
            });
        } catch (err) {
            console.error("Error al procesar el archivo:", err);
        } finally {
            setIsUploading(false); // Desactiva el spinner después de la carga
        }
    };

    const saveMessage = async (data) => {
        try {
            await axios.post("/api/message", data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!socket || !chatId) {
        return (
            <div className="flex flex-col h-full w-full animate-pulse">
                {/* Mensajes */}
                <main className="flex-grow overflow-y-auto px-4 py-6 space-y-4 bg-white">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-full flex ${
                                i % 2 === 0 ? "justify-start" : "justify-end"
                            }`}
                        >
                            <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[60%]">
                                <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                                <div className="h-3 bg-gray-300 rounded w-24"></div>
                            </div>
                        </div>
                    ))}
                </main>

                {/* Input inferior */}
                <div className="rounded-xl border-t px-4 py-4 flex gap-2 items-center bg-white">
                    <div className="flex-grow">
                        <div className="w-full h-16 bg-gray-200 rounded-md" />
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full w-full ${adminPage ? "" : "md:max-h-[690px]"} overflow-hidden`}>
            <main className="flex flex-col justify-between items-center gorw h-full w-full">
                <Suspense fallback={<div></div>}>
                    <MessageContainer messages={messages} socketId={userId} isUploading={isUploading} isGroup={typeChat === "group"} relatedId={relatedId} type={typeChat} />
                </Suspense>
                <MessageInput onSendMessage={sendMessage} onSendFile={sendFile} relatedId={relatedId} type={typeChat} />
            </main>
        </div>
    );
}
