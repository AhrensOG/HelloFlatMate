"use client";

import ChatsPanel from "@/app/components/admin/chats_panel/ChatsPanel";
import NavBar from "@/app/components/nav_bar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatsPanelPage() {
  const [chats, setChats] = useState();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get("/api/admin/chat");
        setChats(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!chats) {
      fetchChats();
    }
  }, []);

  if (!chats) {
    return (
      <div className="flex items-center justify-center flex-1 absolute inset-0">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <ChatsPanel data={chats} />
    </>
  );
}