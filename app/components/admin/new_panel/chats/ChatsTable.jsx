import { Context } from "@/app/context/GlobalContext";
import {
    ArrowTopRightOnSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "sonner";

const TYPE_CHAT = {
    GROUP: "Grupal",
    PRIVATE: "Privado",
    SUPPORT: "Soporte",
};

const ChatsTable = ({ chats, onOpenParticipants, onDeleteChat }) => {
    const { state } = useContext(Context);
    return (
        <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white">
                <tr>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        ID
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Tipo
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Piso / Room
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Propietario
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Participantes
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {chats?.length > 0 ? (
                    chats.map((chat) => {
                        const owner = chat.participants.find(
                            (p) => p.participantType === "OWNER"
                        )?.owner;

                        const clients = chat.participants
                            .filter((p) => p.participantType === "CLIENT")
                            .map((c) =>
                                `${c.client?.name || ""} ${
                                    c.client?.lastName || ""
                                }`.trim()
                            )
                            .join(" | ");

                        return (
                            <tr
                                key={chat.id}
                                onClick={() => onOpenParticipants(chat)}
                                className="hover:bg-gray-100 even:bg-gray-50 transition-colors"
                            >
                                <td className="border p-2 text-center text-gray-700">
                                    {chat.id}
                                </td>
                                <td className="border p-2 text-center text-gray-700">
                                    {TYPE_CHAT[chat.type]}
                                </td>
                                <td className="border p-2 text-center text-gray-700">
                                    {chat.type === "GROUP"
                                        ? chat.property?.serial
                                        : chat.type === "PRIVATE"
                                        ? chat.room?.serial
                                        : "-"}
                                </td>
                                <td className="border p-2 text-center text-gray-700">
                                    {owner
                                        ? `${owner.name || ""} ${
                                              owner.lastName || ""
                                          }`.trim().length > 50
                                            ? `${`${owner.name || ""} ${
                                                  owner.lastName || ""
                                              }`
                                                  .trim()
                                                  .slice(0, 50)}...`
                                            : `${owner.name || ""} ${
                                                  owner.lastName || ""
                                              }`.trim()
                                        : "Sin propietario"}
                                </td>

                                <td className="border p-2 text-center text-gray-700">
                                    {clients || "Sin clientes"}
                                </td>
                                <td className="border p-2 text-center">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex gap-4 justify-center"
                                    >
                                        <button
                                            onClick={() =>
                                                toast("Eliminar chat", {
                                                    action: {
                                                        label: "Confirmar",
                                                        onClick: () => {
                                                            onDeleteChat(
                                                                chat.id
                                                            );
                                                        },
                                                    },
                                                })
                                            }
                                        >
                                            <TrashIcon
                                                title="Eliminar"
                                                className="size-5 text-red-500"
                                            />
                                        </button>
                                        {state.user && (
                                            <Link
                                                target="_blank"
                                                href={`/pages/admin/new-panel/chat?type=${
                                                    chat.type === "GROUP"
                                                        ? "group"
                                                        : chat.type ===
                                                          "PRIVATE"
                                                        ? "priv"
                                                        : "supp"
                                                }&chat=${chat.id}&userId=${
                                                    state.user?.id || ""
                                                }`}
                                            >
                                                <ArrowTopRightOnSquareIcon
                                                    title="Ir al chat"
                                                    className="size-5 text-blue-600"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td
                            colSpan="7"
                            className="border p-4 text-center text-gray-500"
                        >
                            No hay chats disponibles.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ChatsTable;
