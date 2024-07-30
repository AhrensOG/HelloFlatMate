"use client";
import Chat from "@/app/components/chats/Chats";
import HeaderChats from "@/app/components/chats/HeaderChats";
import SearchChat from "@/app/components/chats/SearchChat";
import { AnimatePresence } from "framer-motion";

export default function ChatsPage() {
  return (
    <AnimatePresence>
      <div className="m-2 flex flex-col gap-2">
        <HeaderChats />
        <SearchChat />
        <Chat />;
      </div>
    </AnimatePresence>
  );
}
