"use client";

import React, { useContext } from "react";
import {
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineMapPin,
  HiOutlineCurrencyEuro,
  HiOutlineWrench,
  HiOutlineInformationCircle,
  HiOutlineChatBubbleBottomCenterText,
  HiPhoto,
  HiUser,
} from "react-icons/hi2";
import { MdOutlineKey, MdOutlineQuestionAnswer } from "react-icons/md";
import Link from "next/link";
import ToDoMessagesSection from "@/app/components/workerPanel/tasks/task_details/ToDoMessagesSection";
import { Context } from "@/app/context/GlobalContext";
import { GrUserWorker } from "react-icons/gr";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

const TYPE_LABELS = {
  REPAIR: "Reparación",
};

const PREFERRED_TIME_SLOTS = {
  MORNING: "Manana",
  AFTERNOON: "Tarde",
};

const SITE_LABELS = {
  KITCHEN: "Cocina",
  LIVING_ROOM: "Sala",
  MY_ROOM: "Mi habitación",
  WC1: "Baño 1",
  WC2: "Baño 2",
  HALLWAY_COMMON_AREAS: "Pasillo / Zonas comunes",
  OTHERS: "Otros",
};

const MaintenanceDetailModal = ({ task, onClose }) => {
  const { state } = useContext(Context);
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleString("es-ES", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "No definido";

  return (
    <div
      onClick={onClose}
      className="p-2 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-4xl w-full p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Detalle de Tarea #{task.id}
        </h2>

        <div className="space-y-6 text-sm text-gray-800">
          {/* Cliente */}
          {task.client && (
            <div className="flex items-start gap-2">
              <HiUser className="text-[#0C1660]" size={18} />
              <div>
                <p className="font-semibold">Inquilino</p>
                <p>
                  <strong>Nombre:</strong> {task.client?.name}{" "}
                  {task.client?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {task.client?.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {task.client?.phone}
                </p>
              </div>
            </div>
          )}

          {/* Worker */}
          {task.worker && (
            <div className="flex items-start gap-2">
              <GrUserWorker className="text-[#0C1660]" size={18} />
              <div>
                <p className="font-semibold">Técnico</p>
                <p>
                  <strong>Nombre:</strong> {task.worker?.name}{" "}
                  {task.worker?.lastName}
                </p>
              </div>
            </div>
          )}

          {/* Presencia del inquilino */}
          <div className="flex items-start gap-2">
            <MdOutlineKey className="text-[#0C1660]" size={18} />
            <div>
              <p className="font-semibold">Presencia del inquilino</p>
              <p>
                {task.isPresent
                  ? "El cliente estará presente"
                  : "El cliente no estará presente"}
              </p>
            </div>
          </div>
          {/* Dirección */}
          {task.property && (
            <div className="flex items-start gap-2">
              <HiOutlineMapPin className="text-[#0C1660]" size={18} />
              <div>
                <p className="font-semibold">Dirección</p>
                <p>
                  {task.property.street} {task.property.streetNumber},{" "}
                  {task.property.postalCode}, {task.property.city}, España
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Código de propiedad: {task.property.serial}
                </p>
              </div>
            </div>
          )}

          {/* Fechas */}
          <div className="flex items-start gap-2">
            <HiOutlineCalendar className="text-[#0C1660]" size={18} />
            <div>
              <p className="font-semibold">Fechas</p>
              <p>
                <strong>Creada:</strong> {formatDate(task.creationDate)}
              </p>
              <p>
                <strong>Programada para:</strong> {formatDate(task.startDate)}
              </p>
              {task.reprogrammed && (
                <>
                  <p>
                    <strong>Reprogramada:</strong>{" "}
                    {formatDate(task.reprogrammedStartDate)}
                  </p>
                  {task.reprogramingComment && (
                    <p className="text-gray-600 italic mt-1">
                      Motivo: {task.reprogramingComment}
                    </p>
                  )}
                </>
              )}
              {task.endDate && (
                <p>
                  <strong>Finalizada el:</strong> {formatDate(task.endDate)}
                </p>
              )}
            </div>
          </div>

          {/* Tipo, zona, urgencia */}
          <div className="flex items-start gap-2">
            <HiOutlineWrench className="text-[#0C1660]" size={18} />
            <div>
              <p className="font-semibold">Incidencia</p>
              <p>
                <strong>Tipo:</strong> {TYPE_LABELS[task.type] || task.type}
              </p>
              <p>
                <strong>Zona:</strong>{" "}
                {SITE_LABELS[task.incidentSite] || task.incidentSite}
              </p>
              <p>
                <strong>Horario preferido:</strong>{" "}
                {PREFERRED_TIME_SLOTS[task.preferredTimeSlot] ||
                  task.preferredTimeSlot}
              </p>
              {task.emergency && (
                <p className="text-red-600 font-semibold mt-1">
                  🚨 Urgencia marcada por el usuario
                </p>
              )}
            </div>
          </div>

          {/* Nota del inquilino */}
          {task.clientMessage && (
            <div className="flex items-start gap-2">
              <HiOutlineChatBubbleBottomCenterText
                className="text-[#0C1660] min-w-5"
                size={18}
              />
              <div>
                <p className="font-semibold">Nota del inquilino</p>
                <p className="bg-gray-100 p-3 rounded">{task.clientMessage}</p>
              </div>
            </div>
          )}

          {/* Comentario del trabajador */}
          {task.comment && (
            <div className="flex items-start gap-2">
              <MdOutlineQuestionAnswer className="text-[#0C1660]" size={18} />
              <div>
                <p className="font-semibold">Comentario del trabajador</p>
                <p className="bg-gray-100 p-3 rounded">{task.comment}</p>
              </div>
            </div>
          )}

          {/* Comentario de cierre */}
          {task.closingComments && (
            <div className="flex items-start gap-2">
              <HiOutlineInformationCircle
                className="text-[#0C1660]"
                size={18}
              />
              <div>
                <p className="font-semibold">Comentarios finales</p>
                <p>{task.closingComments}</p>
              </div>
            </div>
          )}

          {/* Cancelación */}
          {task.cancellationReason && (
            <div className="flex items-start gap-2 text-red-700">
              <HiOutlineExclamationCircle className="text-red-700" size={18} />
              <p>
                <strong>Motivo de cancelación:</strong>{" "}
                {task.cancellationReason}
              </p>
            </div>
          )}

          {/* Coste y responsabilidad */}
          <div className="flex items-start gap-2">
            <HiOutlineCurrencyEuro className="text-[#0C1660]" size={18} />
            <div>
              <p className="font-semibold">Coste</p>
              <p>
                <strong>Importe asignado:</strong>{" "}
                {task.amount === 0 ? "Sin cargo" : `${task.amount || "-"} €`}
              </p>
              {task.responsibility && (
                <p>
                  <strong>Responsable:</strong>{" "}
                  {task.responsibility === "CLIENT"
                    ? "Inquilino"
                    : "Propietario"}
                </p>
              )}
            </div>
          </div>

          {/* Imagen enviada */}
          {task.imageUrl && (
            <div className="flex items-start gap-2">
              <HiPhoto className="text-[#0C1660]" size={18} />
              <div>
                <p className="font-semibold">Imagen enviada</p>
                <Link
                  href={task.imageUrl}
                  target="_blank"
                  className="italic text-blue-700 underline">
                  Ver imagen / video
                </Link>
              </div>
            </div>
          )}

          {state.user?.id && state.user?.role === "ADMIN" && (
            <ToDoMessagesSection toDoId={task.id} currentUser={state.user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetailModal;
