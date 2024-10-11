import { Context } from "@/app/context/GlobalContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChatsPanel({ data }) {
  const router = useRouter();
  const { state } = useContext(Context);
  const [user, setUser] = useState(state?.user);
  const [chats, setChats] = useState(data || []);

  useEffect(() => {
    setUser(state?.user);
  }, [state?.user]);

  const handleRedirect = async (chatId, type = "!supp") => {
    if (type === "supp") {
      try {
        const res = await axios.patch("/api/admin/chat", {
          type: "assing",
          chatId: chatId,
          suppId: user?.id,
        });
        console.log(res);
        // Actualizar estado después de asignar el chat
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId ? { ...chat, ownerId: user?.id } : chat
          )
        );
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const handleFinishChat = async (chatId) => {
    try {
      const res = await axios.patch("/api/admin/chat", {
        type: "finish",
        chatId: chatId,
      });
      console.log(res);
      // Actualizar estado después de finalizar el chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId ? { ...chat, isActive: false } : chat
        )
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  if (!chats || !user) {
    return (
      <div className="flex items-center justify-center flex-1 absolute inset-0">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filtrar los chats según las condiciones
  const activeChats = chats.filter(
    (chat) =>
      chat.isActive && chat.ownerId === user.id && chat.type === "SUPPORT"
  );
  const waitingChats = chats.filter(
    (chat) => chat.isActive && chat.ownerId === null && chat.type === "SUPPORT"
  );

  const allChats = chats.filter((chat) => chat.type !== "SUPPORT");

  return (
    <main className="p-6 rounded-lg space-y-6">
      {/* Sección de chats activos */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Chats Activos</h2>
        {activeChats.length > 0 ? (
          activeChats.map((chat, index) => {
            const filteredMessages = chat.messages.filter(
              (message) => message.userType !== "ADMIN"
            );
            const lastMessage = filteredMessages[filteredMessages.length - 1];

            return (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 bg-gray-100 text-[#0E155F] relative"
              >
                <h3 className="font-bold text-lg">
                  {lastMessage ? lastMessage.userName : "Chat sin mensajes"}
                </h3>
                <p className="mt-2">
                  {lastMessage
                    ? lastMessage.body
                    : "Este chat no tiene mensajes aún."}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#0E155F] text-sm">
                    {lastMessage
                      ? new Date(lastMessage.date).toLocaleString()
                      : "No hay fecha"}
                  </span>
                  <button
                    onClick={() => {
                      toast.promise(handleRedirect(chat.id, "supp"), {
                        loading: "Procesando",
                        success: () => {
                          // Actualiza el estado de los chats para reflejar la asignación
                          setChats((prevChats) =>
                            prevChats.map((c) =>
                              c.id === chat.id ? { ...c, ownerId: user?.id } : c
                            )
                          );
                          // Abre la página en una nueva pestaña
                          window.open(
                            `/pages/user/chats/chat?type=supp&chat=${chat.id}&userId=${user.id}`,
                            "_blank"
                          );
                          return "Chat asignado";
                        },
                        error: "Error al asignar el chat",
                      });
                    }}
                    className="bg-[#0E155F] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#4C8BF5]"
                  >
                    Ir
                  </button>
                </div>
                <span
                  onClick={() => {
                    toast.custom((t) => (
                      <div className="bg-white p-4 rounded shadow-md text-center">
                        <p className="text-gray-800 mb-4">
                          ¿Estás seguro de que deseas finalizar este chat?
                        </p>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              toast.dismiss(t.id); // Cierra el toast actual
                              toast.promise(handleFinishChat(chat.id), {
                                loading: "Procesando...",
                                success: "Chat finalizado",
                                error: "Error al finalizar el chat",
                              });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => toast.dismiss(t.id)} // Cierra el toast sin hacer nada
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ));
                  }}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <XMarkIcon className="w-6 h-6 text-[#0E155F]" />
                </span>
              </div>
            );
          })
        ) : (
          <p>No hay chats activos.</p>
        )}
      </section>

      {/* Sección de chats en espera */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Chats en Espera</h2>
        {waitingChats.length > 0 ? (
          waitingChats.map((chat, index) => {
            const filteredMessages = chat.messages.filter(
              (message) => message.userType !== "ADMIN"
            );
            const lastMessage = filteredMessages[filteredMessages.length - 1];

            return (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 bg-gray-100 text-[#0E155F]"
              >
                <h3 className="font-bold text-lg">
                  {lastMessage ? lastMessage.userName : "Chat sin mensajes"}
                </h3>
                <p className="mt-2">
                  {lastMessage
                    ? lastMessage.body
                    : "Este chat no tiene mensajes aún."}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#0E155F] text-sm">
                    {lastMessage
                      ? new Date(lastMessage.date).toLocaleString()
                      : "No hay fecha"}
                  </span>
                  <button
                    onClick={() => {
                      toast.promise(handleRedirect(chat.id, "supp"), {
                        loading: "Procesando",
                        success: () => {
                          // Actualiza el estado de los chats para reflejar la asignación
                          setChats((prevChats) =>
                            prevChats.map((c) =>
                              c.id === chat.id ? { ...c, ownerId: user?.id } : c
                            )
                          );
                          // Abre la página en una nueva pestaña
                          window.open(
                            `/pages/user/chats/chat?type=supp&chat=${chat.id}&userId=${user.id}`,
                            "_blank"
                          );
                          return "Chat asignado";
                        },
                        error: "Error al asignar el chat",
                      });
                    }}
                    className="bg-[#0E155F] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#4C8BF5]"
                  >
                    Ir
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay chats en espera.</p>
        )}
      </section>

      {/* Sección de todos los chats */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Todos los Chats</h2>
        {allChats.length > 0 ? (
          allChats.map((chat, index) => {
            const filteredMessages = chat.messages.filter(
              (message) => message.userType !== "ADMIN"
            );
            const lastMessage = filteredMessages[filteredMessages.length - 1];

            return (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 bg-gray-100 text-[#0E155F]"
              >
                <h3 className="font-bold text-lg">
                  {lastMessage ? lastMessage.userName : "Chat sin mensajes"}
                </h3>
                <p className="mt-2">
                  {lastMessage
                    ? lastMessage.body
                    : "Este chat no tiene mensajes aún."}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#0E155F] text-sm">
                    {lastMessage
                      ? new Date(lastMessage.date).toLocaleString()
                      : "No hay fecha"}
                  </span>
                  <button
                    onClick={() => {
                      toast.promise(handleRedirect(chat.id), {
                        loading: "Procesando",
                        success: () => {
                          setChats((prevChats) =>
                            prevChats.map((c) =>
                              c.id === chat.id ? { ...c, ownerId: user?.id } : c
                            )
                          );
                          window.open(
                            `/pages/user/chats/chat?type=supp&chat=${chat.id}&userId=${user.id}`,
                            "_blank"
                          );
                          return "Chat asignado";
                        },
                        error: "Error al asignar el chat",
                      });
                    }}
                    className="bg-[#0E155F] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#4C8BF5]"
                  >
                    Ir
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay chats disponibles.</p>
        )}
      </section>
    </main>
  );
}
