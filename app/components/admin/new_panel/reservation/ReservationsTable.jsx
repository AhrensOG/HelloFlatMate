import React, { useState } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";

const ReservationsTable = ({
  filteredOrders,
  handleOpenModal,
  handleOpenModalEdit,
  availableDates,
  selectedDateFilter,
  setSelectedDateFilter,
}) => {
  return (
    <table className="min-w-full border-collapse">
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">
            ID
          </th>
          <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
            Usuario
          </th>
          <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
            Room
          </th>
          <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
            <div className="flex items-center justify-center">
              <span className="w-full break-keep">Check-In</span>
              <select
                value={formatDateToDDMMYYYY(selectedDateFilter)}
                onChange={(e) => setSelectedDateFilter(e.target.value)} // Actualiza el filtro de fecha
                className="outline-none w-4 cursor-pointer text-center border-none"
              >
                <option value="">Todas</option>
                {availableDates.map((date, index) => (
                  <option key={index} value={date} className="p-1">
                    {formatDateToDDMMYYYY(date)}
                  </option>
                ))}
              </select>
            </div>
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
          <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
            Estado
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
            onClick={() => handleOpenModal(lo)}
          >
            <td className="border p-2 text-gray-700 text-center">{lo.id}</td>
            <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
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
              {lo?.isActive ? "Si" : "No"}
            </td>
            <td className="border p-2 text-gray-700 text-center">
              {lo?.isSigned ? "Si" : "No"}
            </td>
            <td className="border p-2 text-gray-700 text-center">
              {lo?.client?.arrivalDate && lo?.client?.arrivalTime ? `${formatDateToDDMMYYYY(lo?.client?.arrivalDate)} - ${lo?.client?.arrivalTime}` : "-"}
            </td>
            <td className="border p-2 text-gray-700 text-center">
              {formatDateToDDMMYYYY(lo.date)}
            </td>
            <td
              className={`${
                lo.status === "APPROVED" ? "text-green-700" : "text-yellow-700"
              } border p-2 text-center`}
            >
              {lo.status === "APPROVED" ? "Aprobada" : "Pendiente"}
            </td>
            <td className="border p-2 text-gray-700 text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic en el botón propague al tr
                  handleOpenModalEdit(lo); // Abre el modal de edición
                }}
                className="bg-green-500 text-white px-2 py-1 mr2 rounded"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
