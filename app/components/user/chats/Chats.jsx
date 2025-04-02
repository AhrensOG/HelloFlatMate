"use client";
import { Context } from "@/app/context/GlobalContext";
import ChatsCard from "./ChatsCard";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function Chat({ ownerPage = false }) {
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

  // Determina el estado del chat de tipo SUPPORT
  const supportChat = chats.find((chat) => chat.type === "SUPPORT");
  const privateChats = chats.filter((chat) => chat.type === "PRIVATE");
  const groupChats = chats.filter((chat) => chat.type === "GROUP");

  // Obtener el último mensaje del chat SUPPORT
  const lastMessage = supportChat?.messages
    .slice() // Hacemos una copia del array para no mutar el original
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0]; // Ordenamos los mensajes por fecha, de más reciente a más antiguo // Tomamos el primer elemento que será el más reciente

  return (
    <div className="flex flex-col gap-2 h-full sm:max-h-[750px] overflow-hidden overflow-y-auto">
      {/* Renderizar la tarjeta basada en el estado del chat GROUP */}
      {groupChats &&
        groupChats.map((chat) => {
          return (
            <ChatsCard
              key={chat.id}
              name={`${chat.relatedModel?.serial} - Grupo`}
              image="/chat/people.png"
              lastMessage={chat.messages[chat.messages.length - 1]}
              action={() =>
                router.push(
                  `/pages/${
                    ownerPage ? "owner" : "user"
                  }/chats/chat?type=group&chat=${chat.id}&userId=${user.id}`
                )
              }
              notReadCount={
                chat.messages.filter(
                  (message) =>
                    !message.isRead &&
                    (message.senderId
                      ? message.senderId !== user.id
                      : message.userId !== user.id)
                ).length
              }
            />
          );
        })}

      {/* Renderizar la tarjeta basada en el estado del chat SUPPORT */}
      {privateChats &&
        privateChats.map((chat) => {
          // Encuentra el participante que sea de tipo "OWNER" y no sea el usuario actual
          const participants = chat.participants.find((u) => {
            if (user.role === "OWNER") {
              return (
                u.participantId !== user.id && u.participantType === "CLIENT"
              );
            } else {
              return (
                u.participantId !== user.id && u.participantType === "OWNER"
              );
            }
          });

          return (
            <>
              {chat.relatedId ? (
                <ChatsCard
                  key={chat.id}
                  name={
                    chat.relatedModel?.serial
                      ? `${chat.relatedModel?.serial} - Privado`
                      : "Unknown"
                  }
                  image={"/chat/singleuser.png"}
                  lastMessage={chat.messages[chat.messages.length - 1]}
                  action={() =>
                    router.push(
                      `/pages/${
                        ownerPage ? "owner" : "user"
                      }/chats/chat?type=priv&chat=${chat.id}&userId=${
                        user.id
                      }&receiverId=${
                        chat?.participants?.filter(
                          (u) => u.participantId !== user.id
                        )[0]?.participantId
                      }`
                    )
                  }
                  notReadCount={
                    chat.messages.filter(
                      (message) =>
                        !message.isRead &&
                        (message.senderId
                          ? message.senderId !== user.id
                          : message.userId !== user.id)
                    ).length
                  }
                />
              ) : (
                <ChatsCard
                  key={chat.id}
                  name={
                    chat.participants.find((u) => u.participantId !== user.id)
                      ?.client
                      ? `${
                          chat.participants.find(
                            (u) => u.participantId !== user.id
                          )?.client?.name
                        } ${
                          chat.participants.find(
                            (u) => u.participantId !== user.id
                          )?.client?.lastName
                        }`
                      : chat.participants.find(
                          (u) => u.participantId !== user.id
                        )?.admin
                      ? `${
                          chat.participants.find(
                            (u) => u.participantId !== user.id
                          )?.admin?.name
                        } ${
                          chat.participants.find(
                            (u) => u.participantId !== user.id
                          )?.admin?.lastName
                        }`
                      : chat.participants.find(
                          (u) => u.participantId !== user.id
                        )?.owner
                      ? `${
                          chat.participants.find(
                            (u) => u.participantId !== user.id
                          )?.owner?.name
                        } ${
                          chat.participants.find(
                            (u) => u.participantId !== user.id
                          )?.owner?.lastName
                        }`
                      : "Unknown"
                  }
                  image={"/chat/singleuser.png"}
                  lastMessage={chat.messages[chat.messages.length - 1]}
                  action={() =>
                    router.push(
                      `/pages/${
                        ownerPage ? "owner" : "user"
                      }/chats/chat?type=priv&chat=${chat.id}&userId=${
                        user.id
                      }&receiverId=${
                        chat?.participants?.filter(
                          (u) => u.participantId !== user.id
                        )[0]?.participantId
                      }`
                    )
                  }
                  notReadCount={
                    chat.messages.filter(
                      (message) =>
                        !message.isRead &&
                        (message.senderId
                          ? message.senderId !== user.id
                          : message.userId !== user.id)
                    ).length
                  }
                />
              )}
            </>
          );
        })}
      {!supportChat && (
        <ChatsCard name={"Soporte"} image={"/chat/soporte.png"} id={user.id} />
      )}
      {supportChat && !supportChat.isActive && (
        <ChatsCard
          name={"Soporte"}
          image={"/chat/soporte.png"}
          lastMessage={lastMessage}
          action={() =>
            router.push(
              `/pages/${
                ownerPage ? "owner" : "user"
              }/chats/chat?type=supp&chat=${supportChat.id}&bool=true&userId=${
                user.id
              }`
            )
          }
          notReadCount={
            supportChat.messages.filter(
              (message) =>
                !message.isRead &&
                (message.senderId
                  ? message.senderId !== user.id
                  : message.userId !== user.id)
            ).length
          }
        />
      )}
      {supportChat && supportChat.isActive && (
        <ChatsCard
          name={"Soporte"}
          image={"/chat/soporte.png"}
          lastMessage={lastMessage}
          action={() =>
            router.push(
              `/pages/${
                ownerPage ? "owner" : "user"
              }/chats/chat?type=supp&chat=${supportChat.id}&userId=${user.id}`
            )
          }
          notReadCount={
            supportChat.messages.filter(
              (message) =>
                !message.isRead &&
                (message.senderId
                  ? message.senderId !== user.id
                  : message.userId !== user.id)
            ).length
          }
        />
      )}
    </div>
  );
}
