import { Context } from "@/app/context/GlobalContext";
import ChatsCard from "./ChatsCard";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function Chat() {
  const { state } = useContext(Context);
  const [user, setUser] = useState(state?.user);
  const [chats, setChats] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setUser(state?.user);
    }
  }, [state]);

  useEffect(() => {
    const fetchChats = async () => {
      console.log("Fetching chats...");

      try {
        const { data } = await axios.get("/api/chat?userId=" + user?.id);
        setChats(data.chats);
      } catch (error) {
        console.log(error);
      }
    };

    // Llamar a fetchChats si el usuario está disponible y los chats aún no se han cargado
    if (user && !chats) {
      fetchChats();
    }
  }, [user, chats]); // Dependencias: se ejecutará cuando cambien `user` o `chats`

  if (!user || !chats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {console.log(user, chats)}

      <ChatsCard name={"Propietario"} image={"/chat/chat-1.png"} />
      <ChatsCard name={"Mantenimiento"} image={"/chat/chat-3.png"} />
      <ChatsCard name={"Habitacion"} image={"/chat/chat-2.jpg"} />
      {!chats?.some((chat) => chat.type === "SUPPORT") ? (
        <ChatsCard name={"Soporte"} image={"/chat/soporte.svg"} id={user.id} />
      ) : (
        <ChatsCard
          name={"Soporte"}
          image={"/chat/soporte.svg"}
          action={() =>
            router.push(
              `/pages/user/chats/chat?type=supp&chat=${
                chats?.find((chat) => chat.type === "SUPPORT").id
              }&bool=true'`
            )
          }
        />
      )}
    </div>
  );
}
