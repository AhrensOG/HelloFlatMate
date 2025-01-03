"use client";
import React, { useContext, useState } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";
import { toast } from "sonner";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import OrderModal from "./OrderModal";

const PreReservationsPanel = ({ leaseOrders = [] }) => {
  const { state } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState(leaseOrders);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);

  const handleOpenModal = (lo) => {
    setSelectedOrder(lo);
    setIsOpen(true);
  };

  const handleCloseModal = (lo) => {
    setSelectedOrder(false);
    setIsOpen(false);
  };

  const filteredOrders = orders.filter((lo) => {
    const roomSerial = lo.room?.serial || "";
    const clientName = lo.client?.name || "";
    const clientLastName = lo.client?.lastName || "";
    const clientEmail = lo.client?.email || "";

    const searchString = searchQuery.toLowerCase();

    return (
      roomSerial.toLowerCase().includes(searchString) ||
      clientName.toLowerCase().includes(searchString) ||
      clientLastName.toLowerCase().includes(searchString) ||
      clientEmail.toLowerCase().includes(searchString)
    );
  });
  const handleApprove = async (id, roomId) => {
    const toastId = toast.loading("Procesando...");
    if (!state.user) {
      toast.dismiss(toastId);
      return;
    }
    try {
      const data = {
        action: "PENDING",
        leaseOrderId: id,
        adminId: state.user?.id,
        roomId,
      };
      await axios.patch("/api/admin/lease_order", data);
      toast.success("¡Aprobada correctamente!", { id: toastId });
      setOrders((prev) => prev.filter((lo) => lo.id !== id));
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
      const data = {
        action: "REJECTED",
        leaseOrderId: id,
        adminId: state.user?.id,
        roomId,
      };
      await axios.patch("/api/admin/lease_order", data);
      toast.success("¡Rechazada correctamente!", { id: toastId });
      setOrders((prev) =>
        prev.map((lo) => (lo.id === id ? { ...lo, status: "REJECTED" } : lo))
      );
    } catch (error) {
      console.log(error);
      toast.info("¡Ups! Ocurrió un error", {
        description: "Intenta nuevamente o contacta con el soporte.",
        id: toastId,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Pre-reservas</h2>
        <div className="w-full">
          <input
            type="text"
            placeholder="Buscar por serial, nombre, apellido o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-3 py-2 w-96"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">
                ID
              </th>
              <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
                Usuario
              </th>
              <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
                Pais
              </th>
              <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
                Fecha Nac.
              </th>
              <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
                Serial
              </th>
              <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
                Fecha
              </th>
              <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
                Check-In
              </th>
              <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
                Check-Out
              </th>
              <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">
                Precio
              </th>
              <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">
                Estado
              </th>
              <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((lo) => (
              <tr
                key={lo.id}
                className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleOpenModal(lo)}
              >
                <td className="border p-2 text-gray-700 text-center">
                  {lo.id}
                </td>
                <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
                <td className="border p-2 text-gray-700 text-center">
                  {lo.client?.country}
                </td>
                <td className="border p-2 text-gray-700 text-center">
                  {formatDateToDDMMYYYY(lo.client?.birthDate)}
                </td>
                <td className="border p-2 text-gray-700 text-center">
                  {lo.room?.serial}
                </td>
                <td className="border p-2 text-gray-700 text-center">
                  {formatDateToDDMMYYYY(lo.date)}
                </td>
                <td className="border p-2 text-gray-700 text-center">
                  {formatDateToDDMMYYYY(lo.startDate)}
                </td>
                <td className="border p-2 text-gray-700 text-center">
                  {formatDateToDDMMYYYY(lo.endDate)}
                </td>
                <td className="border p-2 text-gray-700 text-center">
                  {lo.price} €
                </td>
                <td className="border p-2 w-36 text-gray-700 text-center">
                  {lo.status === "IN_PROGRESS" ? "En progreso" : "Rechazada"}
                </td>
                <td className="border p-2 text-gray-700 text-center flex justify-around">
                  <button
                    onClick={() => handleApprove(lo.id, lo.room?.id)}
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(lo.id, lo.room?.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <OrderModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PreReservationsPanel;
