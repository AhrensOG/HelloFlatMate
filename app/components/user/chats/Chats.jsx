import ChatsCard from "./ChatsCard";
import { socket } from "@/app/socket";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const router = useRouter();

  const handleJoinChat = (id) => {
    socket.emit("joinChat", id, (response) => {
      router.push(`/pages/user/chats/chat`);
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

  return (
    <div>
      <ChatsCard
        name={"Propietario"}
        image={"/chat/chat-1.png"}
        action={() => handleJoinChat(1)}
      />
      <ChatsCard
        name={"Mantenimiento"}
        image={"/chat/chat-3.png"}
        action={() => handleJoinChat(2)}
      />
      <ChatsCard
        name={"Habitacion"}
        image={"/chat/chat-2.jfif"}
        action={() => handleJoinChat(3)}
      />
      <ChatsCard
        name={"Soporte"}
        image={"/chat/soporte.svg"}
        action={() => handleJoinChat(4)}
      />
    </div>
  );
}
