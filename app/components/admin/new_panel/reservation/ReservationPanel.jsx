"use client"; // Asegúrate de que este componente sea un componente del lado del cliente
import { useState } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";
import OrderModalReservation from "./OrderModalReservation";
import EditReservationModal from "./EditReservationModal";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ReservationPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Usar SWR para obtener las órdenes
    const { data: orders, error, mutate } = useSWR("/api/admin/lease_order", fetcher);

    // Filtrar órdenes
    const filteredOrders = (orders || []).filter((lo) => {
        const roomSerial = lo.room?.serial || "";
        const clientName = lo.client?.name || "";
        const clientLastName = lo.client?.lastName || "";
        return (
            roomSerial.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clientLastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleOpenModal = (lo) => {
        setSelectedOrder(lo);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setIsOpen(false);
    };

    const handleOpenModalEdit = (lo) => {
        setSelectedOrder(lo);
        setIsOpenEdit(true);
    };

    const handleCloseModalEdit = () => {
        setSelectedOrder(null);
        setIsOpenEdit(false);
    };

    // Función para manejar la actualización de una reserva
    const handleUpdateOrder = async (updatedOrder) => {
        try {
            await axios.put(`/api/admin/lease_order`, updatedOrder); // Llama a tu API para actualizar
            toast.success("Orden actualizada correctamente!");
            mutate(); // Actualiza los datos en caché
            handleCloseModalEdit(); // Cierra el modal de edición
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error al actualizar la orden.");
        }
    };

    if (error) return <div>Error al cargar las reservas.</div>;

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Reservas</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por serial o cliente"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
                        className="border rounded px-3 py-2 w-96"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg">
                <table className="min-w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Room</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Usuario</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Check-In</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Check-Out</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">Firmada</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">¿En revisión?</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Creado</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((lo) => (
                            <tr
                                key={lo.id}
                                className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleOpenModal(lo)}
                            >
                                <td className="border p-2 text-gray-700 text-center">{lo.id}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo.room?.serial}</td>
                                <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo?.startDate)}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo?.endDate)}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo?.isSigned ? "Si" : "No"}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo?.inReview ? "Si" : "No"}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo.date)}</td>
                                <td className="border p-2 text-gray-700 text-center flex justify-around">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el clic en el botón propague al tr
                                            handleOpenModalEdit(lo); // Abre el modal de edición
                                        }}
                                        className="bg-green-500 text-white px-2 py-1 mr2 rounded"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isOpen && <OrderModalReservation data={selectedOrder} onClose={handleCloseModal} />}
            {isOpenEdit && <EditReservationModal leaseOrder={selectedOrder} onClose={handleCloseModalEdit} onUpdate={handleUpdateOrder} />}
        </div>
    );
}
