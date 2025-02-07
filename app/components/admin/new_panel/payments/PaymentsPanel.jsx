import React, { useState } from "react";
import PaymentsTable from "./PaymentsTable";
import CreatePaymentModal from "./CreatePaymentModal";
import useSWR from "swr";
import axios from "axios";
import EditPaymentModal from "./EditPaymentModal";
import { toast } from "sonner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaymentsPanel = ({ payments, users }) => {
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: swrData,
    error,
    mutate,
  } = useSWR("/api/admin/payments", fetcher, {
    fallbackData: payments,
    refreshInterval: 180000,
  });

  const filteredPayments = (swrData || []).filter((payment) => {
    const clientName = payment.user?.name || "";
    const clientLastName = payment.user?.lastName || "";
    const clientEmail = payment.user?.email || "";

    const searchString = searchQuery.toLowerCase();

    return (
      clientName.toLowerCase().includes(searchString) ||
      clientLastName.toLowerCase().includes(searchString) ||
      clientEmail.toLowerCase().includes(searchString)
    );
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
        await axios.delete(`/api/admin/payments/rentPayments?id=${payment.id}`);
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
        <div className="w-full flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido, email o rol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-3 py-2 w-96"
          />

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
      />

      {showCreatePaymentModal && (
        <CreatePaymentModal users={users} onClose={setShowCreatePaymentModal} mutate={mutate} />
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
