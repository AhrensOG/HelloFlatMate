"use client";

import Chat from "@/app/components/chat/Chats";
import HeaderChats from "@/app/components/chat/HeaderChats";
import SearchChat from "@/app/components/chat/SearchChat";

export default function ChatPage() {
  return (
    <div className="m-2 flex flex-col gap-2">
      <HeaderChats />
      <SearchChat />
      <Chat />;
    </div>
  );
}
