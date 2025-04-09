import React, { useState } from "react";
import PaymentsTable from "./PaymentsTable";
import CreatePaymentModal from "./CreatePaymentModal";
import useSWR from "swr";
import axios from "axios";
import EditPaymentModal from "./EditPaymentModal";
import { toast } from "sonner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaymentsPanel = ({ users }) => {
    const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);
    const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(false);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("Estado");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/payments", fetcher, {
        refreshInterval: 180000,
    });

    const filteredUsers = users.filter((user) => {
        const searchString = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchString) ||
            user.lastName.toLowerCase().includes(searchString) ||
            user.email.toLowerCase().includes(searchString)
        );
    });

    const filteredPayments = (swrData || []).filter((payment) => {
        if (selectedUser && payment.user.id !== selectedUser.id) return false;

        const matchesStatus =
            selectedStatusFilter === "Estado" ||
            (selectedStatusFilter === "APPROVED" &&
                ["APPROVED", "PAID"].includes(payment.status)) ||
            (selectedStatusFilter === "PAID" &&
                ["APPROVED", "PAID"].includes(payment.status)) ||
            payment.status === selectedStatusFilter;

        return matchesStatus;
    });

    const closeEditPayment = () => {
        setSelectedPayment(null);
        setShowEditPaymentModal(false);
    };

    const openEditPayment = (payment) => {
        setSelectedPayment(payment);
        setShowEditPaymentModal(true);
    };

    const deletePayment = async (payment) => {
        const toastId = toast.loading("Eliminando cobro...");
        try {
            if (payment.type === "RESERVATION" || payment.type === "MONTHLY") {
                await axios.delete(
                    `/api/admin/payments/rentPayments?id=${payment.id}`
                );
            } else {
                await axios.delete(
                    `/api/admin/payments/supplyPayments?id=${payment.id}`
                );
            }
            await mutate();
            toast.success("Cobro eliminado correctamente", { id: toastId });
        } catch (error) {
            toast.info("Error al eliminar el cobro", {
                description: "Intenta nuevamente o contacta con soporte",
                id: toastId,
            });
        }
    };

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Cobros</h2>
                <div className="w-full flex gap-4 relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido o email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value === "") {
                                setSelectedUser(null);
                            }
                        }}
                        className="border rounded px-3 py-2 w-96 appearance-none"
                    />
                    {searchQuery && (
                        <ul className="absolute top-12 bg-white border rounded w-96 shadow-md max-h-[600px] overflow-y-auto z-10">
                            {filteredUsers.map((user) => (
                                <li
                                    key={user.id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setSearchQuery(
                                            `${user.name} ${user.lastName}`
                                        );
                                    }}
                                >
                                    {user.name} {user.lastName} - {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        onClick={() => setShowCreatePaymentModal(true)}
                        className="w-[10rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
                    >
                        Crear cobro
                    </button>
                </div>
            </div>

            <PaymentsTable
                payments={filteredPayments}
                openEditPayment={openEditPayment}
                deletePayment={deletePayment}
                setSelectedStatusFilter={setSelectedStatusFilter}
                selectedStatusFilter={selectedStatusFilter}
            />

            {showCreatePaymentModal && (
                <CreatePaymentModal
                    users={users}
                    onClose={() => setShowCreatePaymentModal(false)}
                    mutate={mutate}
                />
            )}
            {showEditPaymentModal && (
                <EditPaymentModal
                    payment={selectedPayment}
                    onClose={closeEditPayment}
                    mutate={mutate}
                />
            )}
        </div>
    );
};

export default PaymentsPanel;
