import React, { useState } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";
import { toast } from "sonner";
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const TYPE_LABELS = {
  INTERNET: "WIFI",
  AGENCY_FEES: "Tasa de la agencia",
  CLEANUP: "Limpieza check-out",
  OTHERS: "Otros",
  DEPOSIT: "Depósito",
  GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
  MONTHLY: "Mensual",
  RESERVATION: "Reserva",
  MAINTENANCE: "Mantenimiento",
  ELECTRICITY: "Electricidad",
  ALL: "Todos",
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

const ORDER = [
  "DEPOSIT",
  "AGENCY_FEES",
  "GENERAL_SUPPLIES_1Q",
  "INTERNET_1Q",
  "RESERVATION",
  "MONTHLY_1",
  "GENERAL_SUPPLIES_2Q",
  "INTERNET_2Q",
  "MONTHLY_2",
  "CLEANUP",
];

const classifyType = (payment, durationInMonths) => {
  const isQuartered = ["INTERNET", "GENERAL_SUPPLIES"].includes(payment.type);
  const name = payment.name || "";

  if (isQuartered && durationInMonths > 8) {
    if (name.includes("2Q")) return `${payment.type}_2Q`;
    return `${payment.type}_1Q`;
  }

  return payment.type;
};

const groupAndSortPayments = (payments) => {
  const grouped = {};

  for (const payment of payments) {
    const userId = payment.user?.id || "unknown";
    const lease = payment.leaseOrderInfo;
    const leaseId = payment.leaseOrderId;

    if (!lease || !lease.startDate || !lease.endDate) continue;

    const leaseKey = `${leaseId} - ${lease.startDate} a ${lease.endDate}`;
    const start = new Date(lease.startDate);
    const end = new Date(lease.endDate);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (!grouped[userId]) grouped[userId] = {};
    if (!grouped[userId][leaseKey])
      grouped[userId][leaseKey] = { duration, payments: [] };

    grouped[userId][leaseKey].payments.push(payment);
  }

  for (const userId in grouped) {
    for (const leaseKey in grouped[userId]) {
      const { duration, payments } = grouped[userId][leaseKey];

      const monthly = payments.filter((p) => p.type === "MONTHLY");
      const rest = payments.filter((p) => p.type !== "MONTHLY");

      const enriched = rest.map((p) => ({
        ...p,
        _sortType: classifyType(p, duration),
      }));

      let monthly1 = monthly;
      let monthly2 = [];

      if (duration > 8 && monthly.length > 1) {
        const half = Math.ceil(monthly.length / 2);
        monthly1 = monthly
          .slice(0, half)
          .map((p) => ({ ...p, _sortType: "MONTHLY_1" }));
        monthly2 = monthly
          .slice(half)
          .map((p) => ({ ...p, _sortType: "MONTHLY_2" }));
      } else {
        monthly1 = monthly.map((p) => ({ ...p, _sortType: "MONTHLY_1" }));
      }

      const allPayments = [...enriched, ...monthly1, ...monthly2];

      grouped[userId][leaseKey].payments = allPayments.sort((a, b) => {
        const aIndex = ORDER.indexOf(a._sortType);
        const bIndex = ORDER.indexOf(b._sortType);

        if (
          a._sortType?.startsWith("MONTHLY") &&
          b._sortType?.startsWith("MONTHLY")
        ) {
          return (a.quotaNumber || 0) - (b.quotaNumber || 0);
        }

        return aIndex - bIndex;
      });
    }
  }

  return grouped;
};

const PaymentsTable = ({
  payments,
  openEditPayment,
  deletePayment,
  selectedStatusFilter,
  setSelectedStatusFilter,
  selectedTypeFilter,
  setSelectedTypeFilter,
  selectedDescriptionFilters,
  setSelectedDescriptionFilters,
  typesAvailable,
  descriptionsAvailable,
  isLoading,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [isDescriptionDropdownOpen, setDescriptionDropdownOpen] =
    useState(false);

  const handleStatusChange = (status) => {
    setSelectedStatusFilter(status);
    setDropdownOpen(false);
  };

  const handleTypeChange = (type) => {
    setSelectedTypeFilter(type);
  };

  const grouped = groupAndSortPayments(payments || []);

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
            <th
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative ml-4 w-[8rem]">
              <button className="flex items-center justify-center w-full gap-2 px-3 py-1 rounded-md">
                {STATUS[selectedStatusFilter] || "Estado"}
                <ChevronDownIcon className="size-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-auto bg-white border rounded shadow-lg z-10">
                  {["ALL", "PENDING", "APPROVED"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        handleStatusChange(status);
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left p-2 hover:bg-gray-100">
                      {STATUS[status]}
                    </button>
                  ))}
                </div>
              )}
            </th>

            <th
              onMouseEnter={() => setTypeDropdownOpen(true)}
              onMouseLeave={() => setTypeDropdownOpen(false)}
              className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative ml-4">
              <button className="flex items-center justify-center w-full gap-2 px-3 py-1 rounded-md">
                {TYPE_LABELS[selectedTypeFilter] || "Tipo"}
                <ChevronDownIcon className="size-4" />
              </button>
              {isTypeDropdownOpen && (
                <div className="absolute left-0 mt-1 w-auto bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-scroll">
                  {["ALL", ...typesAvailable].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        handleTypeChange(type);
                        setTypeDropdownOpen(false);
                      }}
                      className="block w-full text-left p-2 hover:bg-gray-100">
                      {TYPE_LABELS[type] || type}
                    </button>
                  ))}
                </div>
              )}
            </th>
            <th
              onMouseEnter={() => setDescriptionDropdownOpen(true)}
              onMouseLeave={() => setDescriptionDropdownOpen(false)}
              className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative ml-4">
              <button className="flex items-center justify-center w-full gap-2 px-3 py-1 rounded-md">
                {selectedDescriptionFilters.length === 0
                  ? "Todas"
                  : "Descripción"}
                <ChevronDownIcon className="size-4" />
              </button>
              {isDescriptionDropdownOpen && (
                <div className="absolute left-0 mt-1 w-auto bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-scroll">
                  {descriptionsAvailable.map((desc) => {
                    const selected = selectedDescriptionFilters.includes(desc);
                    return (
                      <label
                        key={desc}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {
                            setSelectedDescriptionFilters((prev) =>
                              selected
                                ? prev.filter((d) => d !== desc)
                                : [...prev, desc]
                            );
                          }}
                        />
                        <span className="truncate">{desc}</span>
                      </label>
                    );
                  })}
                  <div className="border-t p-2">
                    <button
                      onClick={() => {
                        setSelectedDescriptionFilters([]);
                        setDescriptionDropdownOpen(false);
                      }}
                      className="text-sm text-blue-600 hover:underline">
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              )}
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                Buscando...
              </td>
            </tr>
          ) : Object.entries(grouped).length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No hay pagos disponibles.
              </td>
            </tr>
          ) : (
            Object.entries(grouped).map(([userId, leases]) =>
              Object.entries(leases).map(([leaseKey, { payments }]) =>
                payments.map((payment) => (
                  <tr
                    key={`${payment.id}${payment.type}`}
                    className="hover:bg-gray-100 even:bg-gray-50 transition-cursor cursor-pointer">
                    <td className="border p-2 text-gray-700 text-start truncate max-w-60">
                      {(payment.user?.name || "") +
                        " " +
                        (payment.user?.lastName || "")}
                    </td>
                    <td className="border p-2 text-gray-700 text-center">
                      {payment.leaseOrderInfo?.room || "-"}
                    </td>
                    <td className="border p-2 text-gray-700 text-center">
                      {payment.date ? formatDateToDDMMYYYY(payment.date) : "-"}
                    </td>
                    <td className="border p-2 text-gray-700 text-center">
                      {typeof payment.amount === "number"
                        ? `${payment.amount} €`
                        : "-"}
                    </td>
                    <td
                      className={`border p-2 ${
                        payment.status === "PENDING"
                          ? "text-yellow-700"
                          : "text-green-700"
                      } font-bold text-center`}>
                      {STATUS[payment.status] || "-"}
                    </td>
                    <td className="border p-2 text-gray-700 text-center">
                      {TYPE_LABELS[payment.type] || "-"}
                    </td>
                    <td className="border p-2 text-gray-700 text-center">
                      {payment.description || payment.name || "-"}
                    </td>
                    <td className="border p-2 text-gray-700 text-center">
                      <div className="w-full h-full flex gap-2 items-center justify-around">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditPayment(payment);
                          }}>
                          <PencilIcon
                            title="Edición"
                            className="size-6 text-green-500"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast("¿Quieres eliminar el cobro?", {
                              action: {
                                label: "Confirmar",
                                onClick: async () =>
                                  deletePayment({
                                    id: payment.id,
                                    type: payment.type,
                                  }),
                              },
                            });
                          }}>
                          <TrashIcon
                            title="Eliminar"
                            className="size-6 text-red-500"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
