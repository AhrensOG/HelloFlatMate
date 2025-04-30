import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import formatDateToDDMMYYYY from "../utils/formatDate";

const STATUS_LABELS = {
  PENDING: { label: "Pendiente", color: "text-yellow-800" },
  APPROVED: { label: "Aprobado", color: "text-green-800" },
  CANCELED: { label: "Cancelado", color: "text-red-800" },
  FINISHED: { label: "Finalizado", color: "text-blue-800" },
  IN_PROGRESS: { label: "En progreso", color: "text-indigo-800" },
};

const ReservationsTable = ({
  filteredOrders,
  handleOpenModal,
  handleOpenModalEdit,
  availableDates,
  selectedDateFilter,
  setSelectedDateFilter,
  selectedStatusFilter,
  setSelectedStatusFilter,
}) => {
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDateFilter(date);
    setDateDropdownOpen(false);
  };

  const handleStatusChange = (status) => {
    setSelectedStatusFilter(status);
    setStatusDropdownOpen(false);
  };

  return (
    <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-60">
              Usuario
            </th>
            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
              Room
            </th>
            <th
              onMouseEnter={() => setDateDropdownOpen(true)}
              onMouseLeave={() => setDateDropdownOpen(false)}
              className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700 relative">
              <button className="flex items-center justify-center w-full gap-2 px-3 py-1 rounded-md">
                {selectedDateFilter
                  ? formatDateToDDMMYYYY(selectedDateFilter)
                  : "Periodos"}
                <ChevronDownIcon className="size-4" />
              </button>
              {isDateDropdownOpen && (
                <div className="absolute left-0 mt-1 w-auto bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-scroll">
                  <button
                    onClick={() => handleDateChange("")}
                    className="block w-full text-left p-2 hover:bg-gray-100">
                    Todos
                  </button>
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateChange(date)}
                      className="block w-full text-left p-2 hover:bg-gray-100">
                      {formatDateToDDMMYYYY(date)}
                    </button>
                  ))}
                </div>
              )}
            </th>
            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
              Check-Out
            </th>
            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">
              ¿Activa?
            </th>
            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">
              ¿Firmada?
            </th>
            <th className="border border-t-0 p-2 w-48 text-center font-semibold text-gray-700">
              Fecha / Hora de arribo
            </th>
            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
              Fecha
            </th>
            <th
              onMouseEnter={() => setStatusDropdownOpen(true)}
              onMouseLeave={() => setStatusDropdownOpen(false)}
              className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700 relative">
              <button className="flex items-center justify-center w-full gap-2 px-3 py-1 rounded-md">
                {STATUS_LABELS[selectedStatusFilter]?.label || "Estado"}
                <ChevronDownIcon className="size-4" />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute left-0 mt-1 w-auto bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-scroll">
                  <button
                    onClick={() => handleStatusChange("")}
                    className="block w-full text-left p-2 hover:bg-gray-100">
                    Todos
                  </button>
                  {Object.keys(STATUS_LABELS).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="block w-full text-left p-2 hover:bg-gray-100">
                      {STATUS_LABELS[status]?.label}
                    </button>
                  ))}
                </div>
              )}
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-24">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((lo) => (
            <tr
              key={lo.id}
              className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleOpenModal(lo)}>
              <td className="border p-2 text-gray-700 text-left truncate max-w-60">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
              <td className="border p-2 text-gray-700 text-center">
                {lo.room?.serial}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {formatDateToDDMMYYYY(lo?.startDate)}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {formatDateToDDMMYYYY(lo?.endDate)}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {lo?.isActive ? "Sí" : "No"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {lo?.isSigned ? "Sí" : "No"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {lo?.client?.arrivalDate && lo?.client?.arrivalTime
                  ? `${formatDateToDDMMYYYY(lo?.client?.arrivalDate)} - ${
                      lo?.client?.arrivalTime
                    }`
                  : "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {formatDateToDDMMYYYY(lo.date)}
              </td>
              <td
                className={`${
                  STATUS_LABELS[lo.status]?.color
                } border p-2 text-center`}>
                {STATUS_LABELS[lo.status]?.label}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModalEdit(lo);
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
