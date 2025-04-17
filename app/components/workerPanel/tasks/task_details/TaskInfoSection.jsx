"use client";

import ApplicationCardHistory from "@/app/components/user/history/application/ApplicationCardHistory";
import {
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineMapPin,
  HiOutlineCurrencyEuro,
  HiOutlineWrench,
  HiOutlineInformationCircle,
  HiOutlineRefresh,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import TaskInfoCard from "./TaskInfoCard";
import LocationSection from "@/app/components/user/property-details/main/LocationSection";

export default function TaskInfoSection({ task }) {
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleString("es-ES", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "No definido";

  return (
    <>
      <div className="bg-white border rounded-xl shadow-sm p-4 space-y-3">
        <ApplicationCardHistory data={task} />

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-6 text-sm text-gray-800">
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

          {/* Tipo y zona de incidencia */}
          <div className="flex items-start gap-2">
            <HiOutlineWrench className="text-[#0C1660]" size={18} />
            <div>
              <p className="font-semibold">Incidencia</p>
              <p>
                <strong>Tipo:</strong> {task.incidentType}
              </p>
              <p>
                <strong>Zona:</strong> {task.incidentSite}
              </p>
              <p>
                <strong>Horario preferido:</strong> {task.preferredTimeSlot}
              </p>
              {task.emergency && (
                <p className="text-red-600 font-semibold mt-1">
                  🚨 Urgencia marcada por el usuario
                </p>
              )}
            </div>
          </div>

          {/* Importe y responsabilidad */}
          <div className="flex items-start gap-2">
            <HiOutlineCurrencyEuro className="text-[#0C1660]" size={18} />
            <div>
              <p className="font-semibold">Coste</p>
              <p>
                <strong>Importe asignado:</strong>{" "}
                {task.amount === 0 ? "Sin cargo" : `${task.amount} €`}
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
        </div>
      </div>

      <section className="w-full flex flex-col justify-center items-center gap-6 lg:flex-row-reverse lg:flex-wrap">
        <TaskInfoCard task={task} />

        <LocationSection
          city={task.property.city}
          country="España"
          postalCode={task.property.postalCode}
          street={task.property.street}
          streetNumber={task.property.streetNumber}
        />
      </section>
    </>
  );
}
