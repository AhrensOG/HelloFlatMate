import React, { useState } from "react";
import PaymentsTable from "./PaymentsTable";
import CreatePaymentModal from "./CreatePaymentModal";
import EditPaymentModal from "./EditPaymentModal";
import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaymentsPanel = () => {
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("ALL");
  const [selectedDescriptionFilter, setSelectedDescriptionFilter] =
    useState("ALL");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [page, setPage] = useState(1);

  const { data: usersData } = useSWR(
    "/api/admin/user/payments_panel",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const {
    data: paymentsData,
    mutate,
    isLoading,
  } = useSWR(
    `/api/admin/payments?page=${page}&limit=100` +
      (selectedUser ? `&userId=${selectedUser.id}` : "") +
      (selectedDescriptionFilter && selectedDescriptionFilter !== "ALL"
        ? `&description=${encodeURIComponent(selectedDescriptionFilter)}`
        : "") +
      (selectedStatusFilter && selectedStatusFilter !== "ALL"
        ? `&status=${encodeURIComponent(selectedStatusFilter)}`
        : "") +
      (selectedTypeFilter && selectedTypeFilter !== "ALL"
        ? `&type=${encodeURIComponent(selectedTypeFilter)}`
        : ""),
    fetcher,
    {
      refreshInterval: 180000,
      keepPreviousData: true,
    }
  );

  const { data: descriptionsData } = useSWR(
    "/api/admin/payments/filters/descriptions",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: typesData } = useSWR(
    "/api/admin/payments/filters/types",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (!usersData || isLoading) {
    return (
      <div className="h-screen flex flex-col p-4 gap-4 animate-pulse">
        <div className="space-y-6">
          <div className="h-8 w-48 bg-gray-300 rounded" />
          <div className="flex gap-4">
            <div className="h-12 w-96 bg-gray-300 rounded" />
            <div className="h-12 w-40 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const typesAvailable = typesData || [];

  const descriptionsAvailable = descriptionsData || [];

  const filteredUsers = usersData.filter((user) => {
    const searchString = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchString) ||
      user.lastName.toLowerCase().includes(searchString) ||
      user.email.toLowerCase().includes(searchString)
    );
  });

  const filteredPayments = (paymentsData?.payments || []).filter((payment) => {
    const matchesStatus =
      !selectedStatusFilter ||
      selectedStatusFilter === "ALL" ||
      (selectedStatusFilter === "APPROVED" &&
        ["APPROVED", "PAID"].includes(payment.status)) ||
      (selectedStatusFilter === "PAID" &&
        ["APPROVED", "PAID"].includes(payment.status)) ||
      payment.status === selectedStatusFilter;

    const matchesType =
      !selectedTypeFilter ||
      selectedTypeFilter === "ALL" ||
      payment.type === selectedTypeFilter;

    console.log(payment.type);

    console.log(selectedTypeFilter);

    const matchesDescription =
      !selectedDescriptionFilter ||
      selectedDescriptionFilter === "ALL" ||
      payment.description === selectedDescriptionFilter ||
      payment.name === selectedDescriptionFilter;

    return matchesStatus && matchesType && matchesDescription;
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
      toast.error("Error al eliminar el cobro", { id: toastId });
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
              if (e.target.value === "") setSelectedUser(null);
            }}
            className="border rounded px-3 py-2 w-96"
          />
          {searchQuery && (
            <ul className="absolute top-12 bg-white border rounded w-96 shadow-md max-h-[600px] overflow-y-auto z-10">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedUser(user);
                    setSearchQuery(`${user.name} ${user.lastName}`);
                    setPage(1);
                  }}>
                  {user.name} {user.lastName} - {user.email}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setShowCreatePaymentModal(true)}
            className="w-[10rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center">
            Crear cobro
          </button>
        </div>
      </div>

      <PaymentsTable
        payments={filteredPayments}
        openEditPayment={openEditPayment}
        deletePayment={deletePayment}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        selectedTypeFilter={selectedTypeFilter}
        setSelectedTypeFilter={setSelectedTypeFilter}
        selectedDescriptionFilter={selectedDescriptionFilter}
        setSelectedDescriptionFilter={setSelectedDescriptionFilter}
        typesAvailable={typesAvailable}
        descriptionsAvailable={descriptionsAvailable}
      />

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Anterior
        </button>
        <span className="flex items-center">Página {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!paymentsData?.hasMore}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Siguiente
        </button>
      </div>

      {showCreatePaymentModal && (
        <CreatePaymentModal
          users={usersData}
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
