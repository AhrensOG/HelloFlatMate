"use client";

import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
};

const CATEGORY_LABELS = {
  HELLO_LANDLORD: "Hello Landlord",
  HELLO_ROOM: "Hello Room",
  HELLO_COLIVING: "Hello Coliving",
  HELLO_STUDIO: "Hello Studio",
};

const OwnerContractsTable = ({
  contracts,
  onEdit,
  onDelete,
  isLoading,
  error,
  selectedContract,
}) => {

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 p-4">Cargando contratos...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 p-4">Error al cargar contratos.</p>
    );
  }

  if (!contracts || contracts.length === 0) {
    return (
      <p className="text-center text-gray-500 p-4">
        No hay contratos registrados.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th className="border p-2 text-center font-semibold">ID</th>
            <th className="border p-2 text-center font-semibold">
              Propietario
            </th>
            <th className="border p-2 text-center font-semibold">Propiedad</th>
            <th className="border p-2 text-center font-semibold">Categoría</th>
            <th className="border p-2 text-center font-semibold">Estado</th>
            <th className="border p-2 text-center font-semibold">Firmado</th>
            <th className="border p-2 text-center font-semibold">Inicio</th>
            <th className="border p-2 text-center font-semibold">Fin</th>
            <th className="border p-2 text-center font-semibold">Duración</th>
            <th className="border p-2 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr
              key={contract.id}
              className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => selectedContract(contract)}>
              <td className="border p-2 text-center">{contract.id}</td>
              <td className="border p-2 text-center">
                {contract.owner?.name} {contract.owner?.lastName}
              </td>
              <td className="border p-2 text-center">
                {contract.property?.serial || "-"}
              </td>
              <td className="border p-2 text-center">
                {CATEGORY_LABELS[contract.category] || contract.category}
              </td>
              <td className="border p-2 text-center">
                {STATUS_LABELS[contract.status] || contract.status}
              </td>
              <td className="border p-2 text-center">
                {contract.isSigned ? "Sí" : "No"}
              </td>
              <td className="border p-2 text-center">
                {contract.startDate
                  ? new Date(contract.startDate).toLocaleDateString("es-ES")
                  : "-"}
              </td>
              <td className="border p-2 text-center">
                {contract.endDate
                  ? new Date(contract.endDate).toLocaleDateString("es-ES")
                  : "-"}
              </td>
              <td className="border p-2 text-center">
                {contract.durationMonths} meses
              </td>
              <td className="border p-2 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(contract);
                    }}>
                    <PencilIcon className="size-5 text-green-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast("Eliminar contrato", {
                        action: {
                          label: "Confirmar",
                          onClick: () => onDelete?.(contract.id),
                        },
                      });
                    }}>
                    <TrashIcon className="size-5 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerContractsTable;
