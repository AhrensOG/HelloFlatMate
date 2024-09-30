import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChatsPanel({ data }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state?.user);

  useEffect(() => {
    setUser(state?.user);
  }, [state?.user]);

  const handleRedirect = async (chatId) => {
    try {
      const res = await axios.patch("/api/admin/chat", {
        type: "assing",
        chatId: chatId,
        suppId: user?.id,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  if (!data || !user) {
    return (
      <div className="flex items-center justify-center flex-1 absolute inset-0">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="p-6 rounded-lg space-y-6">
      {data.map((chat, index) => {
        // Filtra los mensajes para excluir aquellos donde userType sea "ADMIN"
        const filteredMessages = chat.messages.filter(
          (message) => message.userType !== "ADMIN"
        );

        // Obtener el último mensaje después del filtrado
        const lastMessage = filteredMessages[filteredMessages.length - 1];

        // Si no hay mensajes que mostrar, salta este chat
        if (!lastMessage) return null;

        return (
          <div
            key={index}
            className="p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 bg-gray-100  text-[#0E155F]  "
          >
            <h3 className=" font-bold text-lg">{lastMessage.userName}</h3>
            <p className=" mt-2">{lastMessage.body}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#0E155F] text-sm ">
                {new Date(lastMessage.date).toLocaleString()}
              </span>
              <button
                onClick={() => {
                  toast.promise(handleRedirect(chat.id), {
                    loading: "Procesando",
                    success: () => {
                      router.push(
                        `/pages/user/chats/chat?type=supp&chat=${chat.id}&userId=${user.id}`
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
      })}
    </main>
  );
}
