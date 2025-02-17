import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import RoomEditModal from "./RoomEditModal";
import Link from "next/link";
import { toast } from "sonner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function RoomsPanel({ data }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/room", fetcher, {
        fallbackData: data,
        refreshInterval: 600000,
    });

    const handleOpenModal = (room) => {
        setSelectedRoom(room);
        setIsOpen(true);
    };

    const filteredData = swrData?.filter((room) =>
        [room.id, room.serial, room.name, room.zone, room.type]
            .map((field) => field?.toString().toLowerCase())
            .some((field) => field?.includes(searchQuery.toLowerCase()))
    );

    const handleOnsave = () => {
        setIsOpen(false);
        console.log("save");
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/admin/room`, { data: id });
            if (response.status === 204) {
                // Handle successful deletion without parsing
                const updatedData = swrData.filter((item) => item.id !== id);
                mutate(updatedData);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    };

    const deleteToast = (data) => {
        toast(
            <div className="flex items-center mx-auto gap-2 flex-col">
                <p>Estas seguro que deseas eliminar la habitacion?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            toast.promise(handleDelete(data.id), {
                                loading: "Eliminando...",
                                success: "Habitacion eliminada",
                                info: "Error al eliminar la habitacion",
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

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Habitaciones</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por código, nombreo o estado..."
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
                            {/* <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th> */}
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Serial</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Nombre</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Precio</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Zona</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Tipo</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">Activo?</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">Direccion</th>
                            <th className="border border-t-0 p-2 w-40 text-center font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData &&
                            filteredData?.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-100 even:bg-gray-50 transition-colors">
                                    {/* <td className="border p-2 text-gray-700 text-center">{room.id}</td> */}
                                    <td className="border p-2 text-gray-700 text-left">{room.serial}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.name}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.price}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.property.zone}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.typology || room.property.typology}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.isActive ? "Si" : "No"}</td>
                                    <td className="border p-2 text-gray-700 text-center">{`${room.property.street}, ${room.property.city}, ${room.property.country}, piso ${room.floor}, departamento ${room.door}`}</td>
                                    <td className="border p-2 text-gray-700 text-center flex flex-wrap gap-4 items-center justify-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenModal(room);
                                            }}
                                            className="bg-green-500 text-white px-2 py-1 rounded w-full"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteToast(room);
                                            }}
                                            className="bg-red-500 text-white px-2 py-1 rounded w-full"
                                        >
                                            Eliminar
                                        </button>
                                        <Link
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            href={`/pages/admin/update/${room.property.id}/${room.property.category}`}
                                            target="_blank"
                                            className="bg-blue-500 text-white px-2 py-1 rounded w-full"
                                        >
                                            Editar completo
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {isOpen && <RoomEditModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={selectedRoom} onSave={handleOnsave} />}
            </div>
        </div>
    );
}
