"use client";

import React from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const STATUS_BADGES = {
  PENDING: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <ClockIcon className="w-4 h-4" />,
    label: "Pendiente",
  },
  IN_PROGRESS: {
    color: "bg-blue-100 text-blue-700",
    icon: <PencilIcon className="w-4 h-4" />,
    label: "En progreso",
  },
  ACTIVE: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircleIcon className="w-4 h-4" />,
    label: "Activo",
  },
  FINISHED: {
    color: "bg-gray-200 text-gray-700",
    icon: <CheckCircleIcon className="w-4 h-4" />,
    label: "Finalizado",
  },
  CANCELLED: {
    color: "bg-red-100 text-red-700",
    icon: <ClockIcon className="w-4 h-4" />,
    label: "Cancelado",
  },
};

const formatDate = (dateStr, withHour = false) => {
  if (!dateStr) return "-";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (withHour) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return new Date(dateStr).toLocaleDateString("es-ES", options);
};

const OwnerContractCard = ({ data }) => {
  const badge = STATUS_BADGES[data.status];
  const fullAddress = `${data.property?.street || ""} ${
    data.property?.streetNumber || ""
  }, ${data.property?.postalCode || ""} ${data.property?.city || ""}`;

  return (
    <div className="w-full bg-white border rounded-lg p-4 shadow-sm">
      {/* Estado */}
      <div className="flex justify-between items-center mb-2">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full ${badge.color}`}>
          {badge.icon}
          {badge.label}
        </div>

        {data.signedPdfUrl && (
          <Link
            href={data.signedPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-green-600 hover:underline">
            <CheckCircleIcon className="w-4 h-4" /> Contrato firmado
          </Link>
        )}
      </div>

      {/* Info general */}
      <h3 className="text-lg font-semibold text-gray-900">
        Propiedad: {data.property?.serial || "-"}
      </h3>
      <p className="text-sm text-gray-600">Dirección: {fullAddress}</p>

      <div className="mt-2 text-sm text-gray-700 space-y-1">
        <p>
          Inicio: <strong>{formatDate(data.startDate)}</strong>
        </p>
        <p>
          Fin: <strong>{formatDate(data.endDate)}</strong>
        </p>
      </div>

      {/* Firmas */}
      <div className="mt-3 text-sm text-gray-800 space-y-1">
        <p>
          <strong>Fecha de firma:</strong>{" "}
          {data.signedAt ? formatDate(data.signedAt, true) : "Aún no firmado"}
        </p>
      </div>

      {/* Acciones */}
      {!data.isSigned && data.status === "PENDING" && (
        <Link
          href={`/pages/owner/contracts/signature/${data.id}`}
          className="inline-block mt-4 bg-[#440cac] text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-[#440cac]/80 transition">
          <PencilSquareIcon className="w-4 h-4 inline-block mr-1" />
          Firmar contrato
        </Link>
      )}
    </div>
  );
};

export default OwnerContractCard;
