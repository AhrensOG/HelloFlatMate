export default function LeaseOrderSection({ data, formatDate, isAll = false }) {
  const statusLabels = {
    PENDING: "Pendiente (El usuario debe pagar y firmar el contrato)",
    READY_TO_SIGN: "Listo para firmar",
    APPROVED: "Aprobado",
    REJECTED: "Rechazado",
    IN_PROGRESS: "En progreso",
    CANCELED: "Cancelado",
    FINISHED: "Finalizado",
  };

  const statusColors = {
    PENDING: "bg-blue-300 text-white",
    READY_TO_SIGN: "bg-blue-300 text-white",
    APPROVED: "bg-green-300 text-white",
    REJECTED: "bg-red-300 text-white",
    IN_PROGRESS: "bg-orange-300 text-white",
    CANCELED: "bg-gray-300 text-white",
    FINISHED: "bg-purple-300 text-white",
  };

  return (
    <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
      <h2 className="text-xl font-bold text-gray-800">
        Número de Orden: {data?.id || "No definido"}
      </h2>
      <p className="text-gray-600">
        Fecha de creación: {formatDate(data?.date) || "No definido"}
      </p>
      <p className="text-gray-600">
        Fecha de inicio de la ocupación:{" "}
        {formatDate(data?.startDate) || "No definido"}
      </p>
      <p className="text-gray-600">
        Fecha de fin de la ocupación:{" "}
        {formatDate(data?.endDate) || "No definido"}
      </p>
      <p className="text-gray-600">Precio: € {data?.price || "No definido"}</p>

      <div
        className={`inline-block px-4 py-2 mt-4 rounded-full text-sm font-semibold ${
          statusColors[data?.status] || "bg-gray-300 text-black"
        }`}
      >
        {statusLabels[data?.status] || "Estado desconocido"}
      </div>
    </section>
  );
}
