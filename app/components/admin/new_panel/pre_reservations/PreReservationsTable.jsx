import React from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";

const PreReservationsTable = ({
  filteredOrders,
  handleApprove,
  handleReject,
  handleOpenModal,
}) => {
  return (
    <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">
              ID
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Usuario
            </th>
            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
              Pais
            </th>
            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
              Fecha Nac.
            </th>
            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
              Razón
            </th>
            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
              Room
            </th>
            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
              Fecha
            </th>
            {/* <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
            Check-In
          </th>
          <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">
            Check-Out
          </th> */}
            {/* <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">
            Precio
          </th> */}
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
              <td className="border p-2 text-gray-700 text-center">{lo.id}</td>
              <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
              <td className="border p-2 text-gray-700 text-center">
                {lo.client?.country}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {formatDateToDDMMYYYY(lo.client?.birthDate)}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {lo.client?.reasonForValencia}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {lo.room?.serial}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {formatDateToDDMMYYYY(lo.date)}
              </td>
              {/* <td className="border p-2 text-gray-700 text-center">
              {formatDateToDDMMYYYY(lo.startDate)}
            </td>
            <td className="border p-2 text-gray-700 text-center">
              {formatDateToDDMMYYYY(lo.endDate)}
            </td> */}
              {/* <td className="border p-2 text-gray-700 text-center">
              {lo.price} €
            </td> */}
              <td
                className={`${
                  lo.status === "IN_PROGRESS" ? "text-blue-700" : "text-red-700"
                } border p-2 w-36 text-center`}
              >
                {lo.status === "IN_PROGRESS" ? "En progreso" : "Rechazada"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(lo.id, lo.room?.id);
                  }}
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Aprobar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(lo.id, lo.room?.id);
                  }}
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
  );
};

export default PreReservationsTable;
