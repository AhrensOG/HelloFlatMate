import React from "react";
import ChatCard from "./ChatCard";

const ChatSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start space-y-2">
      <h2 className="font-medium">Chats</h2>
      <div className="flex flex-row w-full overflow-x-scroll gap-2 shadow-profile">
        <ChatCard
          link="/pages/user/chats"
          image="/profile/owner_profile/new_chat.svg"
          title="New Chat"
        />
        <ChatCard
          link="/pages/user/chats/chat"
          image="/profile/profile.jpg"
          title="Tobi Lateef"
        />
        <ChatCard
          link="/pages/user/chats/chat"
          image="/profile/profile.jpg"
          title="Queen Needle"
        />
        <ChatCard
          link="/pages/user/chats/chat"
          image="/profile/profile.jpg"
          title="Joan Blessing"
        />
      </div>
    </div>
  );
};

export default ChatSection;
