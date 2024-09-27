export default function LeaseOrderSection({ data, formatDate, isAll = false }) {
  return (
    <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
      <h2 className="text-xl font-bold text-gray-800">
        Número de Orden: {data?.id || 0}
      </h2>
      <p className="text-gray-600">
        Fecha de creación: {formatDate(data?.date) || 0}
      </p>
      <p className="text-gray-600">
        Fecha de inicio de la ocupación: {formatDate(data?.startDate) || 0}
      </p>
      <p className="text-gray-600">
        Fecha de fin de la ocupación: {formatDate(data?.endDate) || 0}
      </p>
      <p className="text-gray-600">Precio: € {data?.price || 0}</p>
      {(data?.status === "PENDING" ||
        (data?.status === "APPROVED" && !isAll)) && (
        <p className=" w-[12rem] px-6 py-2 bg-resolution-blue text-white rounded-lg hover:bg-blue-500 transition">
          Status:{" "}
          {data?.status === "PENDING"
            ? "En progreso"
            : data?.status === "APPROVED"
            ? "Aprobado"
            : ""}
        </p>
      )}
    </section>
  );
}
