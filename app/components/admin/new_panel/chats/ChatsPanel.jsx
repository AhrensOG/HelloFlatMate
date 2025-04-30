"use client";

import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ChatsTable from "./ChatsTable";
import ChatParticipantsModal from "./ChatParticipantsModal";
import AddParticipantModal from "./AddParticipantModal";
import CreateChatModal from "./CreateChatModal"; // ✅ nuevo modal
import { toast } from "sonner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ChatsPanel() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const {
        data: chats,
        mutate,
        error,
    } = useSWR("/api/admin/chat", fetcher, {
        refreshInterval: 300000,
    });

    const {
      data: usersData,
  } = useSWR("/api/admin/user/chats_panel", fetcher, {
      revalidateOnFocus: false
  });

  const {
    data: propertiesData,
} = useSWR("/api/admin/property/chats_panel", fetcher, {
    revalidateOnFocus: false
});

    const deleteParticipant = async (id) => {
        const toastId = toast.loading("Eliminando participante...");
        try {
            await axios.delete(`/api/admin/chat/delete-participant/${id}`);
            if (selectedChat) {
                setSelectedChat((prev) => ({
                    ...prev,
                    participants: prev.participants.filter((p) => p.id !== id),
                }));
            }
            await mutate();
            toast.success("Participante eliminado con éxito", { id: toastId });
        } catch (error) {
            toast.info("Error al eliminar participante", { id: toastId });
            console.error(error);
        }
    };

    const addParticipant = async (participant) => {
        const toastId = toast.loading("Agregando participante...");
        try {
            await axios.post(`/api/admin/chat/add-participant`, participant);
            await mutate();
            toast.success("Participante agregado con éxito", { id: toastId });
        } catch (error) {
            toast.info("Error al agregar participante", { id: toastId });
            console.error(error);
        }
    };

    const createChat = async (chatData) => {
        const toastId = toast.loading("Creando chat...");
        try {
            await axios.post(`/api/admin/chat/create-chat`, chatData);
            await mutate();
            toast.success("Chat creado con éxito", { id: toastId });
        } catch (error) {
            toast.info("Error al crear chat", { id: toastId });
            console.error(error);
        }
    };

    const deleteChat = async (id) => {
        const toastId = toast.loading("Eliminando chat...");
        try {
            await axios.delete(`/api/admin/chat/delete-chat/${id}`);
            if (selectedChat) {
                setSelectedChat((prev) => ({
                    ...prev,
                    participants: prev.participants.filter((p) => p.id !== id),
                }));
            }
            await mutate();
            toast.success("Chat eliminado con éxito", { id: toastId });
        } catch (error) {
            toast.info("Error al eliminar chat", { id: toastId });
            console.error(error);
        }
    };

    const filteredChats = (chats || [])
        .filter((chat) => {
            const query = searchQuery.toLowerCase();

            const type = chat.type?.toLowerCase() || "";

            const serial =
                chat.type === "GROUP"
                    ? chat.property?.serial?.toLowerCase() || ""
                    : chat.room?.serial?.toLowerCase() || "";

            const owner = chat.participants?.find(
                (p) => p.participantType === "OWNER"
            )?.owner;
            const ownerName = `${owner?.name || ""} ${
                owner?.lastName || ""
            }`.toLowerCase();

            const clients = chat.participants?.filter((p) => p.participantType === "CLIENT")
                .map((c) =>
                    `${c.client?.name || ""} ${
                        c.client?.lastName || ""
                    }`.toLowerCase()
                )
                .join(" ");

            return (
                type.includes(query) ||
                serial.includes(query) ||
                ownerName.includes(query) ||
                clients.includes(query)
            );
        })
        .sort((a, b) => {
            const hasMessagesA = a.messages?.length > 0;
            const hasMessagesB = b.messages?.length > 0;

            if (hasMessagesA && !hasMessagesB) return -1;
            if (!hasMessagesA && hasMessagesB) return 1;
            if (!hasMessagesA && !hasMessagesB) return 0;

            const lastDateA = new Date(
                a.messages[a.messages?.length - 1].date
            ).getTime();
            const lastDateB = new Date(
                b.messages[b.messages?.length - 1].date
            ).getTime();

            return lastDateB - lastDateA;
        });

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Chats</h2>
                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido, email o room..."
                        className="border rounded px-3 py-2 w-96"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="w-[11rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
                        onClick={() => setCreateModalOpen(true)} // ✅
                    >
                        Crear chat
                    </button>
                    <button
                        className="w-[11rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
                        onClick={() => setAddModalOpen(true)}
                    >
                        Añadir participante
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <ChatsTable
                    chats={filteredChats}
                    onOpenParticipants={setSelectedChat}
                    onDeleteChat={deleteChat}
                />
            </div>

            {selectedChat && (
                <ChatParticipantsModal
                    participants={selectedChat.participants || []}
                    onClose={() => setSelectedChat(null)}
                    onDelete={deleteParticipant}
                />
            )}

            {addModalOpen && (
                <AddParticipantModal
                    chats={chats}
                    users={usersData}
                    onClose={() => setAddModalOpen(false)}
                    onSubmit={addParticipant}
                />
            )}

            {createModalOpen && (
                <CreateChatModal
                    properties={propertiesData}
                    users={usersData}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={createChat}
                />
            )}
        </div>
    );
}
