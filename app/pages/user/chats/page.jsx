"use client";
import Chat from "@/app/components/user/chats/Chats";
import HeaderChats from "@/app/components/user/chats/HeaderChats";
import SearchChat from "@/app/components/user/chats/SearchChat";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ChatsPage() {
  const route = useRouter();
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
