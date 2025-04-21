"use client";

import React from "react";
import {
  DocumentTextIcon,
  CalendarIcon,
  CurrencyEuroIcon,
  HomeModernIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
};

const CATEGORY_LABELS = {
  HELLO_LANDLORD: "hellolandlord",
  HELLO_ROOM: "helloroom",
  HELLO_COLIVING: "hellocoliving",
  HELLO_STUDIO: "hellostudio",
};

const OwnerContractDetailModal = ({ contract, onClose }) => {
  if (!contract) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[95%] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 bg-gray-200 rounded-full w-6 h-6 text-sm flex items-center justify-center">
          X
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />
          Detalles del Contrato
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-600">Propietario</h3>
            <p className="text-gray-800 flex items-center gap-2 text-sm">
              <UserIcon className="min-h-5 h-5 min-w-5 w-5" />
              {contract.owner?.name} {contract.owner?.lastName}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Propiedad</h3>
            <p className="text-gray-800 flex items-center gap-2">
              <HomeModernIcon className="h-5 w-5" />
              {contract.property?.serial || "-"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Categoría</h3>
            <p className="text-gray-800">
              {CATEGORY_LABELS[contract.category]}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Estado</h3>
            <p className="text-gray-800">{STATUS_LABELS[contract.status]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Firmado</h3>
            <p className="text-gray-800 flex items-center gap-2">
              {contract.isSigned ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              )}
              {contract.isSigned ? "Sí" : "No"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Duración</h3>
            <p className="text-gray-800">{contract.durationMonths} meses</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Fecha de inicio</h3>
            <p className="text-gray-800 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {new Date(contract.startDate).toLocaleDateString("es-ES")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">
              Fecha de finalización
            </h3>
            <p className="text-gray-800 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {new Date(contract.endDate).toLocaleDateString("es-ES")}
            </p>
          </div>

          <div className="sm:col-span-2">
            <h3 className="font-semibold text-gray-600">IBAN</h3>
            <p className="text-gray-800">{contract.iban}</p>
          </div>

          {contract.fixedMonthlyRentPerRoom && (
            <div>
              <h3 className="font-semibold text-gray-600">
                Precio fijo por habitación
              </h3>
              <p className="text-gray-800 flex items-center gap-1">
                <CurrencyEuroIcon className="h-5 w-5" />
                {contract.fixedMonthlyRentPerRoom} €
              </p>
            </div>
          )}

          {contract.fixedMonthlyRentTotal && (
            <div>
              <h3 className="font-semibold text-gray-600">Total mensual</h3>
              <p className="text-gray-800 flex items-center gap-1">
                <CurrencyEuroIcon className="h-5 w-5" />
                {contract.fixedMonthlyRentTotal} €
              </p>
            </div>
          )}

          {contract.includesPremiumServices && (
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-gray-600">
                Incluye servicios premium
              </h3>
              <p className="text-green-700 font-medium">Sí</p>
            </div>
          )}

          {contract.url && (
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-gray-600">
                Contrato firmado (PDF)
              </h3>
              <a
                href={contract.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline flex items-center gap-1">
                <DocumentTextIcon className="h-5 w-5" /> Ver documento
              </a>
            </div>
          )}

          {Array.isArray(contract.rooms) && contract.rooms.length > 0 && (
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-gray-600">
                Habitaciones y precios
              </h3>
              <ul className="list-disc pl-6">
                {contract.rooms.map((room, index) => (
                  <li key={index} className="text-gray-800">
                    Habitación {room.roomNumber} - {room.price} €
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerContractDetailModal;
