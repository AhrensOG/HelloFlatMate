import { Context } from "@/app/context/GlobalContext";
import ChatsCard from "./ChatsCard";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function Chat() {
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state?.user);
  const [chats, setChats] = useState(state?.user?.chats || null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setUser(state?.user);
    }
  }, []);

  return (
    <div>
      {console.log(user)}

      <ChatsCard name={"Propietario"} image={"/chat/chat-1.png"} />
      <ChatsCard name={"Mantenimiento"} image={"/chat/chat-3.png"} />
      <ChatsCard name={"Habitacion"} image={"/chat/chat-2.jpg"} />
      <ChatsCard name={"Soporte"} image={"/chat/soporte.svg"} />
    </div>
  );
}
