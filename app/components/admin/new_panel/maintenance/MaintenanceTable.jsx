import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { toast } from "sonner";
import MaintenanceDetailModal from "./MaintenanceDetailModal";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

const TYPE_LABELS = {
  REPAIR: "Reparación",
  CLEAN: "Limpieza",
  INSPECTION: "Inspección",
  OTHER: "Otro",
};

const MaintenanceTable = ({ tasks, loading, error, onDelete, onEdit }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  if (loading) {
    return (
      <p className="text-center text-gray-500 p-4">
        Cargando tareas de mantenimiento...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 p-4">
        Error al cargar tareas de mantenimiento.
      </p>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th
              className="border border-t-0 p-2 text-center font-semibold text-gray-700"
              colSpan="11">
              Tareas de Mantenimiento
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="11" className="border p-4 text-center text-gray-500">
              No hay tareas de mantenimiento registradas.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              ID
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Título
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Estado
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Tipo
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Inicio
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Fin
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Propiedad
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Cliente
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Comentario
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Imagen
            </th>
            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedTask(task)}>
              <td className="border p-2 text-center text-gray-700">
                {task.id}
              </td>
              <td className="border p-2 text-start text-gray-700">
                {task.title}
              </td>
              <td className="border p-2 text-center text-gray-700">
                {STATUS_LABELS[task.status] || task.status}
              </td>
              <td className="border p-2 text-center text-gray-700">
                {TYPE_LABELS[task.type] || task.type}
              </td>
              <td className="border p-2 text-center text-gray-700">
                {task.startDate
                  ? new Date(task.startDate).toLocaleString("es-ES")
                  : "-"}
              </td>
              <td className="border p-2 text-center text-gray-700">
                {task.endDate
                  ? new Date(task.endDate).toLocaleString("es-ES")
                  : "-"}
              </td>
              <td className="border p-2 text-center text-gray-700">
                {task.property?.serial || "-"} ({task.property?.city})
              </td>
              <td className="border p-2 text-start text-gray-700">
                {task.client?.name} {task.client?.lastName} <br />
                <span className="text-sm text-gray-500">
                  {task.client?.email}
                </span>
              </td>
              <td className="border p-2 text-center text-gray-700">
                {task.comment || "-"}
              </td>
              <td className="border p-2 text-center text-gray-700">
                {task.imageUrl ? (
                  <a
                    href={task.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline">
                    Ver imagen
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="border p-2 text-center text-gray-700">
                <div className="w-full h-full flex gap-2 items-center justify-around">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(task);
                    }}>
                    <PencilIcon
                      title="Editar"
                      className="size-6 text-green-500"
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast("Eliminar tarea", {
                        action: {
                          label: "Confirmar",
                          onClick: () => onDelete(task.id),
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
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <MaintenanceDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
};

export default MaintenanceTable;
