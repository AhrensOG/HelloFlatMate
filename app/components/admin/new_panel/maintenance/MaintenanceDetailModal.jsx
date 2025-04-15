import React from "react";

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

const MaintenanceDetailModal = ({ task, onClose }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleString("es-ES") : "-";

  return (
    <div onClick={onClose} className="p-2 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg max-w-3xl w-full p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">Detalle de Tarea</h2>

        {/* Sección: Datos de la tarea */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            🛠️ Datos de la orden
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>ID:</strong> {task.id}
            </div>
            <div>
              <strong>Título:</strong> {task.title}
            </div>
            <div>
              <strong>Descripción:</strong> {task.body}
            </div>
            <div>
              <strong>Tipo:</strong> {TYPE_LABELS[task.type] || task.type}
            </div>
            <div>
              <strong>Estado:</strong>{" "}
              {STATUS_LABELS[task.status] || task.status}
            </div>
            <div>
              <strong>Fecha creación:</strong> {formatDate(task.creationDate)}
            </div>
            <div>
              <strong>Inicio programado:</strong> {formatDate(task.startDate)}
            </div>
            <div>
              <strong>Fecha de fin:</strong> {formatDate(task.endDate)}
            </div>
            <div>
              <strong>Comentario del trabajador:</strong> {task.comment || "-"}
            </div>
            <div>
              <strong>Mensaje del cliente:</strong> {task.clientMessage || "-"}
            </div>
            <div>
              <strong>¿EL cliente estará presente?:</strong>{" "}
              {task.isPresent ? "Sí" : "No"}
            </div>
            <div>
              <strong>Imagen:</strong>{" "}
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
            </div>
          </div>
        </section>

        {/* Sección: Trabajador */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            👷‍♂️ Datos del trabajador
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            {task.worker ? (
              <>
                <div>
                  <strong>Nombre:</strong> {task.worker.name}
                </div>
                <div>
                  <strong>Apellido:</strong> {task.worker.lastName}
                </div>
              </>
            ) : (
              <div className="text-gray-500">No asignado</div>
            )}
          </div>
        </section>

        {/* Sección: Cliente */}
        <section>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            👤 Datos del cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Nombre:</strong> {task.client?.name}
            </div>
            <div>
              <strong>Apellido:</strong> {task.client?.lastName}
            </div>
            <div>
              <strong>Email:</strong> {task.client?.email}
            </div>
            <div>
              <strong>Teléfono:</strong> {task.client?.phone}
            </div>
            <div>
              <strong>Propiedad:</strong> {task.property?.serial} (
              {task.property?.city})
            </div>
            <div>
              <strong>Dirección:</strong> {task.property?.street}{" "}
              {task.property?.streetNumber}, {task.property?.postalCode}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MaintenanceDetailModal;
