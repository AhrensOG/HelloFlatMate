import React, { useEffect, useState } from "react";
import OrderModalReservation from "./OrderModalReservation";
import EditReservationModal from "./EditReservationModal";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import ReservationsTable from "./ReservationsTable";
import CreateLeaseOrderModal from "../../create_lo_modal/CreateLeaseOrderModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ReservationPanel({ data }) { 
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpenCreatOrderModal, setIsOpenCreatOrderModal] = useState(false);
    const [selectedDateFilter, setSelectedDateFilter] = useState("");

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/lease_order", fetcher, {
        refreshInterval: 60000,
    });

    const orders = (swrData || []).filter((lo) => lo.status !== "REJECTED");

    // Filtrar órdenes por la búsqueda de texto y por fecha
    const filteredOrders = (orders || []).filter((lo) => {
        const roomSerial = lo.room?.serial || "";
        const clientName = lo.client?.name || "";
        const clientLastName = lo.client?.lastName || "";
        const clientEmail = lo.client?.email || "";
        const startDate = lo.startDate ? lo.startDate : ""; // Formateamos la fecha
        const fullname = `${clientName} ${clientLastName}`;

        let statusEs = "";
        if (lo.status === "PENDING") statusEs = "pendiente";
        if (lo.status === "APPROVED") statusEs = "aprobada";

        const searchString = searchQuery.toLowerCase();

        // Filtrar por la búsqueda de texto
        const matchesSearchQuery =
            roomSerial.toLowerCase().includes(searchString) ||
            fullname.toLowerCase().includes(searchString) ||
            clientEmail.toLowerCase().includes(searchString) ||
            statusEs.toLowerCase().includes(searchString);

        // Filtrar por la fecha de Check-In (startDate)
        const matchesDateFilter = selectedDateFilter
            ? startDate === selectedDateFilter
            : true;

        return matchesSearchQuery && matchesDateFilter;
    });

    // Extraer los rangos de fechas únicas
    const availableDates = [
        ...new Set(orders.map((lo) => lo.startDate ? lo.startDate : "")),
    ];

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

            <ReservationsTable
                filteredOrders={filteredOrders}
                handleOpenModal={handleOpenModal}
                handleOpenModalEdit={handleOpenModalEdit}
                availableDates={availableDates}
                selectedDateFilter={selectedDateFilter}
                setSelectedDateFilter={setSelectedDateFilter} 
            />

            {isOpen && <OrderModalReservation data={selectedOrder} onClose={handleCloseModal} />}
            {isOpenEdit && <EditReservationModal leaseOrder={selectedOrder} onClose={handleCloseModalEdit} mutate={mutate} />}
            {isOpenCreatOrderModal && <CreateLeaseOrderModal onClose={() => setIsOpenCreatOrderModal(false)} data={data} mutate={mutate} />}
        </div>
    );
}
