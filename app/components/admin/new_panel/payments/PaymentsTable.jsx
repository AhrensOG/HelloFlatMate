import React from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";

const TYPE_LABELS = {
  WATER: "Agua",
  GAS: "Gas",
  ELECTRICITY: "Electricidad",
  EXPENSES: "Expensas",
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
  PENDING: "Pendiente",
  PAID: "Pagado",
  NOT_PAID: "No Pagado",
  CANCELED: "Cancelado",
  APPROVED: "Pagado",
  REJECTED: "Rechazado",
};

const PaymentsTable = ({ payments }) => {
  return (
    <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Room
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Fecha
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Importe
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Estado
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Tipo
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Descripción
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Nombre
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
                {payment.description || "-"}
              </td>
              <td className="border p-2 text-gray-700 text-center">
                {payment.name || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
