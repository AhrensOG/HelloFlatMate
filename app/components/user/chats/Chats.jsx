import { Context } from "@/app/context/GlobalContext";
import ChatsCard from "./ChatsCard";
import { socket } from "@/app/socket";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

export default function Chat() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const [chats, setChats] = useState(state.user?.chats || null);
  const handleJoinChat = (id) => {
    socket.emit("joinChat", id, (response) => {
      router.push(`/pages/user/chats/chat/` + id);
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor Socket.IO");
    });

    socket.on("joinedRoom", (message) => {
      console.log(message); // Confirmación del servidor
    });

    return () => {
      socket.off("joinedRoom");
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      setChats(state.user?.chats);
    };

    fetchChats();
  }, [state, dispatch]);

  if (!chats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {console.log(state.user)}
      {chats.map((chat) => {
        return (
          <ChatsCard
            key={chat.chat.id}
            name={"Propietario"}
            image={"/chat/chat-1.png"}
            action={() => handleJoinChat(chat.chat.id)}
          />
        );
      })}
    </div>
  );
}
