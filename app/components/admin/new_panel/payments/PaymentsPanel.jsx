import React, { useState } from "react";
import PaymentsTable from "./PaymentsTable";
import CreatePaymentModal from "./CreatePaymentModal";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaymentsPanel = ({ payments, users }) => {
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: swrData,
    error,
    mutate,
  } = useSWR("/api/admin/payments", fetcher, {
    fallbackData: payments,
    refreshInterval: 60000,
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

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Cobros</h2>
        <div className="w-full flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido, email o rol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
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

      <PaymentsTable payments={filteredPayments} />

      {showCreatePaymentModal && (
        <CreatePaymentModal users={users} onClose={setShowCreatePaymentModal} />
      )}
    </div>
  );
};

export default PaymentsPanel;
