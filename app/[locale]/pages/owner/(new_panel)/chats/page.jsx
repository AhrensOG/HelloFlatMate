"use client";

import Chat from "@/app/components/user/chats/Chats";
import HeaderChats from "@/app/components/user/chats/HeaderChats";
import { AnimatePresence } from "framer-motion";

export default function OwnerChatsPage() {
    return (
        <AnimatePresence>
            <div className="m-2 flex flex-col gap-2 relative w-full h-full">
                {/* <BotIcon /> */}
                <HeaderChats />
                {/* <SearchChat /> */}
                <Chat ownerPage={true} />
            </div>
        </AnimatePresence>
    );
}
