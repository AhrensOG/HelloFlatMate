import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ConsumptionsPanel({ data }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [consumptions, setConsumptions] = useState(data);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/consumptions", fetcher, {
        fallbackData: data,
        refreshInterval: 60000,
    });

    useEffect(() => {
        setConsumptions(swrData || data);
    }, [swrData, data]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/consumptions?id=${id}`);
            const updatedData = swrData.filter((item) => item.id !== id);
            mutate(updatedData);
        } catch (error) {
            throw error;
        }
    };

    const deleteToast = (consumption) => {
        toast(
            <div className="flex items-center mx-auto gap-2 flex-col">
                <p>Estas seguro que deseas eliminar el consumo?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            toast.promise(handleDelete(consumption.id), {
                                loading: "Eliminando...",
                                success: "Consumo eliminado",
                                info: "Error al eliminar el consumo",
                            });
                            toast.dismiss();
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Si
                    </button>
                    <button onClick={() => toast.dismiss()} className="bg-green-500 text-white px-2 py-1 rounded">
                        No
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
            }
        );
    };

    // const filteredConsumptions = consumptions?.filter((consumption) => {
    //     const searchTerm = searchQuery.toLowerCase();
    //     const name = consumption.name?.toLowerCase() || "";

    //     return name.includes(searchTerm);
    // });

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex gap-3">Consumos</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-3 py-2 w-[450px]"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 w-72 text-center font-semibold text-gray-700">Nombre</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Valor</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Fecha</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filteredConsumptions &&
                            filteredConsumptions?.map((consumption) => (
                                <tr key={consumption.id} className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="border p-2 text-gray-700 text-center">{consumption.id}</td>
                                    <td className="border p-2 text-gray-700 text-left">{consumption.name}</td>
                                    <td className="border p-2 text-gray-700 text-center">{consumption.value}</td>
                                    <td className="border p-2 text-gray-700 text-center">{consumption.date}</td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        <div className="flex gap-2 items-center justify-around">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // handleOpenModal(consumption); // You'll need to implement handleOpenModal if you want to edit
                                                }}
                                            >
                                                <PencilIcon title="Editar" className="size-6 text-green-500" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteToast(consumption);
                                                }}
                                            >
                                                <TrashIcon title="Eliminar" className="size-6 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
