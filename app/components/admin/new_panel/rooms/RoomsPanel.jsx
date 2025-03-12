import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import RoomEditModal from "./RoomEditModal";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDownIcon, PencilIcon, TrashIcon, WrenchIcon } from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TYPOLOGY_LABELS = {
    MIXED: "Mixto",
    ONLY_WOMEN: "Solo chicas",
    ONLY_MEN: "Solo chicos",
};

export default function RoomsPanel({ data }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("Estado");

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

    const filteredData = swrData?.filter((room) => {
        const matchesSearch = [room.id, room.serial, room.name, room.zone, room.type]
            .map((field) => field?.toString().toLowerCase())
            .some((field) => field?.includes(searchQuery.toLowerCase()));

        const matchesStatus =
            selectedStatusFilter === "all"
                ? true
                : selectedStatusFilter === "active"
                ? room.isActive === true
                : selectedStatusFilter === "inactive"
                ? room.isActive === false
                : true;

        return matchesSearch && matchesStatus;
    });

    const handleOnsave = async (data) => {
        try {
            toast.loading("Guardando cambios...");
            const response = await axios.put(`/api/admin/room?id=${selectedRoom.id}`, data);
            toast.dismiss();
            toast.success("Cambios guardados");
            mutate();
            setIsOpen(false);
        } catch (e) {
            toast.info("Error al guardar los cambios");
            throw e;
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/admin/room?`, { data: id });
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
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Código</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Nombre</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Precio</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Zona</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Tipo</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700 relative">
                                <div className="w-full h-full flex items-center justify-center gap-1">
                                    ¿Activo?
                                    <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
                                        <ChevronDownIcon className="size-4" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute left-0 top-9 mt-1 w-full bg-white border rounded shadow-lg z-10">
                                            <button
                                                onClick={() => {
                                                    setSelectedStatusFilter("all");
                                                    setDropdownOpen(false);
                                                }}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Todos
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedStatusFilter("active");
                                                    setDropdownOpen(false);
                                                }}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Activo
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedStatusFilter("inactive");
                                                    setDropdownOpen(false);
                                                }}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Inactivo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">Direccion</th>
                            <th className="border border-t-0 p-2 w-40 text-center font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData &&
                            filteredData?.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-100 even:bg-gray-50 transition-colors">
                                    {/* <td className="border p-2 text-gray-700 text-center">{room.id}</td> */}
                                    <td className="border p-2 text-gray-700 text-center">{room.serial}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.name}</td>
                                    <td className="border p-2 text-gray-700 text-center"> €{room.price}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.property.zone}</td>
                                    <td className="border p-2 text-gray-700 text-center">{TYPOLOGY_LABELS[room.property.typology]}</td>
                                    <td className="border p-2 text-gray-700 text-center">{room.isActive ? "Si" : "No"}</td>
                                    <td className="border p-2 text-gray-700 text-center">{`${room.property.street} ${room.property.streetNumber}, ${room.property.city}`}</td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        <div className="w-full h-full flex gap-2 items-center justify-around">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenModal(room);
                                                }}
                                            >
                                                <PencilIcon title="Edición rapida" className="size-6 text-green-500" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteToast(room);
                                                }}
                                            >
                                                <TrashIcon title="Eliminar" className="size-6 text-red-500" />
                                            </button>
                                            <Link
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                href={`/pages/admin/update/${room.property.id}/${room.property.category}`}
                                                target="_blank"
                                            >
                                                <WrenchIcon title="Edición completa" className="size-6 text-blue-500" />
                                            </Link>
                                        </div>
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
