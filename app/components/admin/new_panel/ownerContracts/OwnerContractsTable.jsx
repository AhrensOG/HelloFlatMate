"use client";

import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
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
            <th className="border p-2 text-center font-semibold">Estado</th>
            <th className="border p-2 text-center font-semibold">Firmado</th>
            <th className="border p-2 text-center font-semibold">Inicio</th>
            <th className="border p-2 text-center font-semibold">Fin</th>
            <th className="border p-2 text-center font-semibold">PDF</th>
            <th className="border p-2 text-center font-semibold">Fdo Prop.</th>
            <th className="border p-2 text-center font-semibold">Fdo HFM</th>
            <th className="border p-2 text-center font-semibold">Firmado en</th>
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
              <td className="border p-2 text-center max-w-60 truncate">
                {contract.owner?.name} {contract.owner?.lastName}
              </td>
              <td className="border p-2 text-center">
                {contract.property?.serial || "-"}
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
              <td className="border p-2 text-center text-blue-600 underline">
                {contract.originalPdfUrl ? (
                  <a
                    href={contract.originalPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Ver PDF
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="border p-2 text-center">
                {contract.ownerFdoData || "-"}
              </td>
              <td className="border p-2 text-center">
                {contract.hfmFdoData || "-"}
              </td>
              <td className="border p-2 text-center">
                {contract.signedAt
                  ? new Date(contract.signedAt).toLocaleString("es-ES")
                  : "-"}
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
