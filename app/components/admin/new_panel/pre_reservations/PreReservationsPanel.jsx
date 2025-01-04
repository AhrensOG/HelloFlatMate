"use client";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import OrderModal from "./OrderModal";
import PreReservationsTable from "./PreReservationsTable";
import useSWR from "swr";
import SkeletonLoader from "../SkeletonLoader";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PreReservationsPanel = ({ leaseOrders = [] }) => {
    const { state } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/lease_order", fetcher, {
        fallbackData: leaseOrders,
        refreshInterval: 60000,
    });

    const orders = (swrData || []).filter((lo) => lo.status === "IN_PROGRESS" || lo.status === "REJECTED");

    const handleOpenModal = (lo) => {
        setSelectedOrder(lo);
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setSelectedOrder(null);
        setIsOpen(false);
    };

    const filteredOrders = orders.filter((lo) => {
        const roomSerial = lo.room?.serial || "";
        const clientName = lo.client?.name || "";
        const clientLastName = lo.client?.lastName || "";
        const clientEmail = lo.client?.email || "";

        let statusEs = "";
        if (lo.status === "IN_PROGRESS") statusEs = "en progreso";
        if (lo.status === "REJECTED") statusEs = "rechazada";

        const searchString = searchQuery.toLowerCase();

        return (
            roomSerial.toLowerCase().includes(searchString) ||
            clientName.toLowerCase().includes(searchString) ||
            clientLastName.toLowerCase().includes(searchString) ||
            clientEmail.toLowerCase().includes(searchString) ||
            statusEs.toLowerCase().includes(searchString)
        );
    });

    const handleApprove = async (id, roomId) => {
        const toastId = toast.loading("Procesando...");
        if (!state.user) {
            toast.dismiss(toastId);
            return;
        }
        try {
            const dataToSend = {
                action: "PENDING",
                leaseOrderId: id,
                adminId: state.user?.id,
                roomId,
            };
            await axios.patch("/api/admin/lease_order", dataToSend);
            toast.success("¡Aprobada correctamente!", { id: toastId });

            mutate();
        } catch (error) {
            console.log(error);
            toast.info("¡Ups! Ocurrió un error", {
                description: "Intenta nuevamente o contacta con el soporte.",
                id: toastId,
            });
        }
    };

    const handleReject = async (id, roomId) => {
        const toastId = toast.loading("Procesando...");
        if (!state.user) {
            toast.dismiss(toastId);
            return;
        }
        try {
            const dataToSend = {
                action: "REJECTED",
                leaseOrderId: id,
                adminId: state.user?.id,
                roomId,
            };
            await axios.patch("/api/admin/lease_order", dataToSend);
            toast.success("¡Rechazada correctamente!", { id: toastId });

            mutate();
        } catch (error) {
            console.log(error);
            toast.info("¡Ups! Ocurrió un error", {
                description: "Intenta nuevamente o contacta con el soporte.",
                id: toastId,
            });
        }
    };

    if (error) {
        return <SkeletonLoader error={error} />;
    }

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Pre-reservas</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por código, nombre, apellido, email o estado..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-3 py-2 w-[450px]"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto border rounded-lg">
                <PreReservationsTable
                    filteredOrders={filteredOrders}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    handleOpenModal={handleOpenModal}
                />
            </div>
            {isOpen && <OrderModal order={selectedOrder} onClose={handleCloseModal} />}
        </div>
    );
};

export default PreReservationsPanel;
