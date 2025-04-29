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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpenCreateOrderModal, setIsOpenCreateOrderModal] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 100;

  const queryParams = new URLSearchParams({
    page,
    limit,
    ...(selectedDateFilter && { startDate: selectedDateFilter }),
    ...(selectedStatusFilter && { status: selectedStatusFilter }),
  }).toString();

  const {
    data: ordersData,
    error,
    mutate,
  } = useSWR(
    `/api/admin/lease_order/new_panel?${queryParams}`,
    fetcher,
    {
      refreshInterval: 60000,
      keepPreviousData: true,
    }
  );

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

  const orders = (ordersData?.leaseOrders || []).filter(
    (lo) => lo.status !== "REJECTED"
  );

  const filteredOrders = orders.filter((lo) => {
    const roomSerial = lo.room?.serial || "";
    const clientName = lo.client?.name || "";
    const clientLastName = lo.client?.lastName || "";
    const clientEmail = lo.client?.email || "";
    const fullname = `${clientName} ${clientLastName}`;

    let statusEs = "";
    if (lo.status === "PENDING") statusEs = "pendiente";
    if (lo.status === "APPROVED") statusEs = "aprobada";

    const searchString = searchQuery.toLowerCase();

    const matchesSearchQuery =
      roomSerial.toLowerCase().includes(searchString) ||
      fullname.toLowerCase().includes(searchString) ||
      clientEmail.toLowerCase().includes(searchString) ||
      statusEs.toLowerCase().includes(searchString);

    return matchesSearchQuery;
  });

  const availableDates = [...new Set(orders.map((lo) => lo.startDate || ""))];

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
    <div className="h-screen flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Reservas</h2>
        <div className="w-full flex gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar por código, nombre, apellido, email o estado..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
      />

      {/* PAGINACIÓN */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="font-medium">{`Página ${page} de ${totalPages}`}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
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