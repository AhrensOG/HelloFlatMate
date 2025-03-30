import React from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const ROLE_LABEL = {
    OWNER: "Propietario",
    CLIENT: "Cliente",
};

const ChatParticipantsModal = ({ participants, onClose, onDelete }) => {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative"
            >
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Participantes del Chat
                </h2>

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 text-left font-semibold text-gray-700">
                                Nombre
                            </th>
                            <th className="border p-2 text-center font-semibold text-gray-700">
                                Tipo
                            </th>
                            <th className="border p-2 text-center font-semibold text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((p) => {
                            const name =
                                p.participantType === "CLIENT"
                                    ? `${p.client?.name || ""} ${
                                          p.client?.lastName || ""
                                      }`
                                    : `${p.owner?.name || ""} ${
                                          p.owner?.lastName || ""
                                      }`;

                            return (
                                <tr
                                    key={p.id}
                                    className="hover:bg-gray-100 even:bg-gray-50"
                                >
                                    <td className="border p-2 text-gray-700">
                                        {name.trim()}
                                    </td>
                                    <td className="border p-2 text-center text-gray-700">
                                        {ROLE_LABEL[p.participantType]}
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() =>
                                                toast("Eliminar participante", {
                                                    action: {
                                                        label: "Confirmar",
                                                        onClick: () =>
                                                            onDelete(p.id),
                                                    },
                                                })
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            title="Eliminar participante"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChatParticipantsModal;
