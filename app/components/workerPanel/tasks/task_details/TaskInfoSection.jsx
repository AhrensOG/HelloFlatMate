"use client";

import ApplicationCardHistory from "@/app/components/user/history/application/ApplicationCardHistory";
import {
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineMapPin,
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

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4 text-sm text-gray-800">
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
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <HiOutlineCalendar className="text-[#0C1660]" size={18} />
              <div>
                <p className="font-semibold">Fechas</p>
                <p>
                  <strong>Servicio creado el:</strong>{" "}
                  {formatDate(task.creationDate)}
                </p>
                <p>
                  <strong>Programado para:</strong> {formatDate(task.startDate)}
                </p>
                {task.endDate && (
                  <p>
                    <strong>Finalizado el:</strong> {formatDate(task.endDate)}
                  </p>
                )}
              </div>
            </div>
          </div>

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
