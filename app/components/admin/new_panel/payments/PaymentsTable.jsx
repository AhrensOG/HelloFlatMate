import React, { useState } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";
import { toast } from "sonner";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const TYPE_LABELS = {
  INTERNET: "WIFI",
  AGENCY_FEES: "Tasa de la agencia",
  CLEANUP: "Limpieza check-out",
  OTHERS: "Otros",
  DEPOSIT: "Depósito",
  GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
  MONTHLY: "Mensual",
  RESERVATION: "Reserva",
};

const STATUS = {
  ALL: "Todos",
  PENDING: "Pendiente",
  PAID: "Pagado",
  NOT_PAID: "No Pagado",
  CANCELED: "Cancelado",
  APPROVED: "Pagado",
  REJECTED: "Rechazado",
};

const PaymentsTable = ({
  payments,
  openEditPayment,
  deletePayment,
  selectedStatusFilter,
  setSelectedStatusFilter,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleStatusChange = (status) => {
    setSelectedStatusFilter(status);
    setDropdownOpen(false);
  };

  return (
    <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Usuario
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Room
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Fecha
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Importe
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative ml-4 w-[8rem]">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-full gap-2 px-3 py-1 rounded-md"
              >
                {STATUS[selectedStatusFilter] || "Estado"}
                <ChevronDownIcon className="size-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow-lg z-10">
                  <button
                    onClick={() => handleStatusChange("Estado")}
                    className="block w-full text-left p-2 hover:bg-gray-100"
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => handleStatusChange("PENDING")}
                    className="block w-full text-left p-2 hover:bg-gray-100"
                  >
                    Pendiente
                  </button>
                  <button
                    onClick={() => handleStatusChange("APPROVED")}
                    className="block w-full text-left p-2 hover:bg-gray-100"
                  >
                    Pagado
                  </button>
                </div>
              )}
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Tipo
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Descripción
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={`${payment.id}${payment.type}`}
              className="hover:bg-gray-100 even:bg-gray-50 transition-cursor cursor-pointer"
            >
              <td className="border p-2 text-gray-700 text-center">
                {payment.user?.name + " " + payment.user?.lastName || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {payment.leaseOrderInfo?.room || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {formatDateToDDMMYYYY(payment.date) || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {`${payment.amount} €` || "-"}
              </td>
              <td
                className={`border p-2 ${
                  payment.status === "PENDING"
                    ? "text-yellow-700"
                    : "text-green-700"
                } font-bold text-center`}
              >
                {STATUS[payment.status] || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {TYPE_LABELS[payment.type] || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {payment.description || payment.name || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditPayment(payment);
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded w-full h-full"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast("¿Quieres eliminar el cobro?", {
                      action: {
                        label: "Confirmar",
                        onClick: async () =>
                          deletePayment({ id: payment.id, type: payment.type }),
                      },
                    });
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full h-full"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
