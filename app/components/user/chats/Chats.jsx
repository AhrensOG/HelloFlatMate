"use client";

import { Context } from "@/app/context/GlobalContext";
import ChatsCard from "./ChatsCard";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useMemo, useState } from "react";
import axios from "axios";

export default function Chat({ ownerPage = false }) {
  const { state } = useContext(Context);
  const user = state?.user;
  const [chats, setChats] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("/api/chat?userId=" + user.id);
        setChats(data.chats);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChats();
  }, [user]);

  if (!user || !chats) {
    return (
      <div className="flex flex-col h-full w-full animate-pulse p-4 space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 border-gray-200 rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col flex-grow space-y-2">
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getChatName = (chat) => {
    const participant = chat.participants.find(
      (u) => u.participantId !== user.id
    );
    return (
      participant?.client?.name + " " + participant?.client?.lastName ||
      participant?.admin?.name + " " + participant?.admin?.lastName ||
      participant?.owner?.name + " " + participant?.owner?.lastName ||
      "Unknown"
    );
  };

  const getNotReadCount = (chat) =>
    chat.messages.filter(
      (msg) => !msg.isRead && (msg.senderId ?? msg.userId) !== user.id
    ).length;

  const renderChatCard = (chat, name, image, type, extraQuery = "") => {
    const sortedMessages = [...chat.messages].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
      <ChatsCard
        key={chat.id}
        name={name}
        image={image}
        lastMessage={sortedMessages[0]}
        action={() =>
          router.push(
            `/pages/${
              ownerPage ? "owner" : "user"
            }/chats/chat?type=${type}&chat=${chat.id}&userId=${
              user.id
            }${extraQuery}`
          )
        }
        notReadCount={getNotReadCount(chat)}
      />
    );
  };

  const supportChat = chats.find((chat) => chat.type === "SUPPORT");
  const privateChats = chats.filter((chat) => chat.type === "PRIVATE");
  const groupChats = chats.filter((chat) => chat.type === "GROUP");

  const lastSupportMessage = supportChat?.messages
    ?.slice()
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div className="w-full flex flex-col gap-2 h-full overflow-hidden overflow-y-auto">
      {groupChats.map((chat) =>
        renderChatCard(
          chat,
          `${chat.relatedModel?.serial} - Grupo`,
          "/chat/people.png",
          "group",
          `&relatedType=${chat.relatedType}&relatedId=${chat.relatedId}`
        )
      )}

      {privateChats.map((chat) => {
        if (
          !chat.relatedModel ||
          (chat.relatedModel.category !== "HELLO_LANDLORD" &&
            chat.relatedModel.property?.category !== "HELLO_LANDLORD")
        ) {
          return null;
        }
        const name = chat.relatedId
          ? `${chat.relatedModel?.serial} - Privado`
          : getChatName(chat);
        const receiverId =
          chat.participants.find((u) => u.participantId !== user.id)
            ?.participantId || "";

        return renderChatCard(
          chat,
          name,
          "/chat/singleuser.png",
          "priv",
          `&receiverId=${receiverId}&relatedType=${chat.relatedType}&relatedId=${chat.relatedId}`
        );
      })}

      {!supportChat && (
        <ChatsCard name="Soporte" image="/chat/soporte.png" id={user.id} />
      )}

      {supportChat && (
        <ChatsCard
          name="Soporte"
          image="/chat/soporte.png"
          lastMessage={lastSupportMessage}
          action={() =>
            router.push(
              `/pages/${
                ownerPage ? "owner" : "user"
              }/chats/chat?type=supp&chat=${supportChat.id}&userId=${user.id}` +
                (supportChat.isActive ? "" : "&bool=true")
            )
          }
          notReadCount={getNotReadCount(supportChat)}
        />
      )}
    </div>
  );
}
