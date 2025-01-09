"use client"; // Asegúrate de que este componente sea un componente del lado del cliente
import { useEffect, useState } from "react";
import OrderModalReservation from "./OrderModalReservation";
import EditReservationModal from "./EditReservationModal";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import ReservationsTable from "./ReservationsTable";
import CreateLeaseOrderModal from "../../create_lo_modal/CreateLeaseOrderModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ReservationPanel({ leaseOrders = [], data }) { 
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpenCreatOrderModal, setIsOpenCreatOrderModal] = useState(false);

    // Usar SWR para obtener las órdenes
    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/lease_order", fetcher, {
        fallbackData: leaseOrders,
        refreshInterval: 60000,
    });

    const orders = (swrData || []).filter((lo) => lo.status === "PENDING" || lo.status === "APPROVED");

    // Filtrar órdenes
    const filteredOrders = (orders || []).filter((lo) => {
        const roomSerial = lo.room?.serial || "";
        const clientName = lo.client?.name || "";
        const clientLastName = lo.client?.lastName || "";
        const clientEmail = lo.client?.email || "";

        let statusEs = "";
        if (lo.status === "PENDING") statusEs = "pendiente";
        if (lo.status === "APPROVED") statusEs = "aprobada";

        const searchString = searchQuery.toLowerCase();

        return (
            roomSerial.toLowerCase().includes(searchString) ||
            clientName.toLowerCase().includes(searchString) ||
            clientLastName.toLowerCase().includes(searchString) ||
            clientEmail.toLowerCase().includes(searchString) ||
            statusEs.toLowerCase().includes(searchString)
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

    const handleOpenModalCreateOrder = () => {
        setIsOpenCreatOrderModal(true);
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

    // useEffect(() => {

    // })

    if (error) return <div>Error al cargar las reservas.</div>;

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Reservas</h2>
                <div className="w-full flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por código, nombre, apellido, email o estado..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
                        className="border rounded px-3 py-2 w-[450px]"
                    />

                    <button
                        onClick={handleOpenModalCreateOrder}
                        className="border border-resolution-blue px-5 py-2 max-w-[14rem] text-center w-auto rounded-md bg-resolution-blue text-white font-medium"
                    >
                        Crear Reserva
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg">
                <ReservationsTable filteredOrders={filteredOrders} handleOpenModal={handleOpenModal} handleOpenModalEdit={handleOpenModalEdit} />
            </div>

            {isOpen && <OrderModalReservation data={selectedOrder} onClose={handleCloseModal} />}
            {isOpenEdit && <EditReservationModal leaseOrder={selectedOrder} onClose={handleCloseModalEdit} onUpdate={handleUpdateOrder} />}
            {isOpenCreatOrderModal && <CreateLeaseOrderModal onClose={() => setIsOpenCreatOrderModal(false)} data={data} />}
        </div>
    );
}
