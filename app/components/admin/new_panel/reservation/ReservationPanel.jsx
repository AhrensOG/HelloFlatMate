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

  const {
    data: ordersData,
    error,
    mutate,
  } = useSWR("/api/admin/lease_order", fetcher, { refreshInterval: 60000 });
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

  const orders = (ordersData || []).filter((lo) => lo.status !== "REJECTED");

  const filteredOrders = orders.filter((lo) => {
    const roomSerial = lo.room?.serial || "";
    const clientName = lo.client?.name || "";
    const clientLastName = lo.client?.lastName || "";
    const clientEmail = lo.client?.email || "";
    const startDate = lo.startDate || "";
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

    const matchesDateFilter = selectedDateFilter
      ? startDate === selectedDateFilter
      : true;

    return matchesSearchQuery && matchesDateFilter;
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

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Reservas</h2>
        <div className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Buscar por código, nombre, apellido, email o estado..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-3 py-2 w-[450px]"
          />

          <button
            onClick={handleOpenModalCreateOrder}
            className="border border-resolution-blue px-5 py-2 max-w-[14rem] text-center w-auto rounded-md bg-resolution-blue text-white font-medium">
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
