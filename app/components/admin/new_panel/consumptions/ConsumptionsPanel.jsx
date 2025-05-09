import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import CreateConsumptionsModal from "./CreateConsumptionsModal";
import formatDateToDDMMYYYY from "../utils/formatDate";
import EditConsumptionModal from "./EditConsumptionModal";
import Link from "next/link";
import CreatePropertyConsumptionsModal from "./CreatePropertyConsumptionsModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TYPE_LABELS = {
    GENERAL_SUPPLIES: "Suministros",
    INTERNET: "Wifi",
    WATER: "Agua",
    GAS: "Gas",
    ELECTRICITY: "Electricidad",
    OTHER: "Otro",
};

export default function ConsumptionsPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [createIsOpen, setCreateIsOpen] = useState(false);
    const [createPropertyIsOpen, setCreatePropertyIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [selectedConsumption, setSelectedConsumption] = useState(null);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/consumptions", fetcher, {
        refreshInterval: 600000,
    });

    const {
      data: usersData,
  } = useSWR("/api/admin/user/consumptions_panel", fetcher, {
      revalidateOnFocus: false
  });

  const {
    data: propertiesData,
} = useSWR("/api/admin/property/consumptions_panel", fetcher, {
    revalidateOnFocus: false
});

    const handleDelete = async (id) => {
        const toastId = toast.loading("Eliminando...");
        try {
            await axios.delete(`/api/admin/consumptions?id=${id}`);
            const updatedData = swrData.filter((item) => item.id !== id);
            mutate(updatedData);
            toast.success("Consumo eliminado con éxito", { id: toastId });
        } catch (error) {
            console.log(error);
            toast.info("Error al eliminar el consumo", { id: toastId });
        }
    };

    const handleEdit = (consumption) => {
        setSelectedConsumption(consumption);
        setEditIsOpen(true);
    };
    
    let filteredConsumptions = (swrData || []).filter((consumption) => {
      const searchTerm = searchQuery.toLowerCase();
      const user =
        (consumption?.client?.name?.toLowerCase() || "") +
        " " +
        (consumption?.client?.lastName?.toLowerCase() || "");
      const type = consumption?.type?.toLowerCase() || "";
      const id = consumption?.id?.toString() || "";
      const serial =
        consumption?.leaseOrderRoom?.room?.serial?.toLowerCase() || "";
    
      return (
        user.includes(searchTerm) ||
        type.includes(searchTerm) ||
        id.includes(searchTerm) ||
        serial.includes(searchTerm)
      );
    });
    

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex gap-3">Consumos</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por usuario, tipo o id..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-3 py-2 w-[450px]"
                    />

                    <button
                        onClick={() => setCreateIsOpen(true)}
                        className="bg-[#0C1660] text-white px-3 py-3 rounded ml-5"
                    >
                        Crear consumo (Room)
                    </button>
                    <button
                        onClick={() => setCreatePropertyIsOpen(true)}
                        className="bg-[#0C1660] text-white px-3 py-3 rounded ml-5"
                    >
                        Crear consumo (Piso)
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-24 text-center font-semibold text-gray-700">
                                Código
                            </th>
                            <th className="border border-t-0 p-2 w-60 text-center font-semibold text-gray-700">
                                Usuario
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Valor
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Tipo
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Periodo
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Factura
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Desde
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Hasta
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConsumptions.length > 0 ? (
                            filteredConsumptions.map((consumption) => (
                                <tr
                                    key={consumption.id}
                                    className="hover:bg-gray-100 even:bg-gray-50 transition-colors"
                                >
                                    <td className="border p-2 text-gray-700 text-center">
                                        {
                                            consumption?.leaseOrderRoom?.room
                                                ?.serial
                                        }
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">{`${consumption?.client?.name} ${consumption?.client?.lastName}`}</td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        € {consumption?.amount}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        {TYPE_LABELS[consumption?.type]}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        {consumption.period || "No definido"}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        {consumption.url ? (
                                            <Link
                                                href={consumption.url}
                                                target="_blank"
                                                className="text-blue-600 hover:text-blue-800 duration-200"
                                            >
                                                Ver
                                            </Link>
                                        ) : (
                                            "Sin factura"
                                        )}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        {formatDateToDDMMYYYY(
                                            consumption?.startDate
                                        )}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        {formatDateToDDMMYYYY(
                                            consumption?.endDate
                                        )}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex gap-2 items-center justify-around"
                                        >
                                            <button
                                                onClick={(e) => {
                                                    handleEdit(consumption);
                                                }}
                                            >
                                                <PencilIcon
                                                    title="Editar"
                                                    className="size-6 text-green-500"
                                                />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    toast("Borrar consumo", {
                                                        action: {
                                                            label: "Confirmar",
                                                            onClick: () => {
                                                                handleDelete(
                                                                    consumption.id
                                                                );
                                                            },
                                                        },
                                                    });
                                                }}
                                            >
                                                <TrashIcon
                                                    title="Eliminar"
                                                    className="size-6 text-red-500"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="border p-4 text-gray-500 text-center"
                                >
                                    No hay consumos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {createIsOpen && (
                <CreateConsumptionsModal
                    onClose={() => setCreateIsOpen(false)}
                    users={usersData}
                    mutate={mutate}
                />
            )}
            {createPropertyIsOpen && (
                <CreatePropertyConsumptionsModal
                    onClose={() => setCreatePropertyIsOpen(false)}
                    properties={propertiesData}
                    mutate={mutate}
                />
            )}
            {editIsOpen && (
                <EditConsumptionModal
                    isOpen={editIsOpen}
                    onClose={() => setEditIsOpen(false)}
                    consumption={selectedConsumption}
                    mutate={mutate}
                />
            )}
        </div>
    );
}
