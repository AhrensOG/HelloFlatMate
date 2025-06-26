import React, { useState } from "react";
import OrderModalReservation from "./OrderModalReservation";
import EditReservationModal from "./EditReservationModal";
import CreateLeaseOrderModal from "../../create_lo_modal/CreateLeaseOrderModal";
import ReservationsTable from "./ReservationsTable";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ReservationPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpenCreateOrderModal, setIsOpenCreateOrderModal] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");
  const [selectedActiveFilter, setSelectedActiveFilter] = useState("");
  const [selectedSignedFilter, setSelectedSignedFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 100;

  const queryParams = new URLSearchParams({
    page,
    limit,
    ...(selectedDateFilter && { startDate: selectedDateFilter }),
    ...(selectedStatusFilter && { status: selectedStatusFilter }),
    ...(selectedClientId && { clientId: selectedClientId }),
    ...(selectedActiveFilter && { isActive: selectedActiveFilter }),
    ...(selectedSignedFilter && { isSigned: selectedSignedFilter }),
  }).toString();

  const {
    data: ordersData,
    error,
    mutate,
  } = useSWR(`/api/admin/lease_order/new_panel?${queryParams}`, fetcher, {
    refreshInterval: 60000,
    keepPreviousData: true,
  });

  const { data: clientsData } = useSWR(
    "/api/admin/user/reservations_panel",
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: propertiesData } = useSWR(
    "/api/admin/property/reservations_panel",
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: availablePeriods } = useSWR(
    "/api/admin/lease_order/new_panel/periods",
    fetcher,
    { revalidateOnFocus: false }
  );

  const orders = (ordersData?.leaseOrders || []).filter(
    (lo) => lo.status !== "REJECTED"
  );

  const sortedOrders = [...orders].sort((a, b) => {
    const priority = {
      PENDING: 0,
      IN_PROGRESS: 1,
      APPROVED: 2,
      FINISHED: 3,
      CANCELED: 4,
    };
    return priority[a.status] - priority[b.status];
  });

  const availableDates = [...(availablePeriods || [])];

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
    setIsOpenCreateOrderModal(true);
  };

  if (error) return <div>Error al cargar las reservas.</div>;

  const totalPages = ordersData?.totalPages || 1;

  return (
    <div className="h-screen flex flex-col p-4 gap-4 relative">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Reservas</h2>
        <div className="w-full flex flex-wrap gap-2 items-start relative">
          <input
            type="text"
            placeholder="Buscar cliente por nombre o email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowClientDropdown(true);
              setSelectedClientId("");
            }}
            onFocus={() => setShowClientDropdown(true)}
            onBlur={() => setTimeout(() => setShowClientDropdown(false), 200)}
            className="border rounded px-3 py-2 w-full max-w-[450px]"
          />

          {showClientDropdown && clientsData && searchQuery && (
            <div className="absolute top-11 left-0 z-10 w-[450px] border rounded bg-white shadow max-h-64 overflow-y-auto">
              {clientsData
                .filter(
                  (client) =>
                    client.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    client.email
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((client) => (
                  <div
                    key={client.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedClientId(client.id);
                      setSearchQuery(`${client.name} ${client.lastName}`);
                      setShowClientDropdown(false);
                    }}>
                    {client.name} {client.lastName} - {client.email}
                  </div>
                ))}
              {clientsData.filter(
                (client) =>
                  client.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  client.email.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <div className="px-4 py-2 text-gray-400">
                  No se encontraron coincidencias
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleOpenModalCreateOrder}
            className="border border-resolution-blue px-5 py-2 max-w-[14rem] text-center w-auto rounded-md bg-resolution-blue text-white font-medium">
            Crear Reserva
          </button>
        </div>
      </div>

      <ReservationsTable
        filteredOrders={sortedOrders}
        handleOpenModal={handleOpenModal}
        handleOpenModalEdit={handleOpenModalEdit}
        availableDates={availableDates}
        selectedDateFilter={selectedDateFilter}
        setSelectedDateFilter={setSelectedDateFilter}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        selectedActiveFilter={selectedActiveFilter}
        setSelectedActiveFilter={setSelectedActiveFilter}
        selectedSignedFilter={selectedSignedFilter}
        setSelectedSignedFilter={setSelectedSignedFilter}
      />

      {/* PAGINACIÓN */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
          Anterior
        </button>
        <span className="font-medium">{`Página ${page} de ${totalPages}`}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
          Siguiente
        </button>
      </div>

      {/* Modales */}
      {isOpen && (
        <OrderModalReservation
          data={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
      {isOpenEdit && (
        <EditReservationModal
          leaseOrder={selectedOrder}
          onClose={handleCloseModalEdit}
          mutate={mutate}
        />
      )}
      {isOpenCreateOrderModal && (
        <CreateLeaseOrderModal
          onClose={() => setIsOpenCreateOrderModal(false)}
          clients={clientsData || []}
          properties={propertiesData || []}
          mutate={mutate}
        />
      )}
    </div>
  );
}
