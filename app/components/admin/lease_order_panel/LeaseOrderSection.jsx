export default function LeaseOrderSection({ data, formatDate }) {
  return (
    <section class="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
      <h2 class="text-xl font-bold text-gray-800">
        Número de Orden: {data?.id || 0}
      </h2>
      <p class="text-gray-600">
        Fecha de creación: {formatDate(data?.date) || 0}
      </p>
      <p class="text-gray-600">
        Fecha de inicio de la ocupación: {formatDate(data?.startDate) || 0}
      </p>
      <p class="text-gray-600">
        Fecha de fin de la ocupación: {formatDate(data?.endDate) || 0}
      </p>
      <p class="text-gray-600">Precio: € {data?.price || 0}</p>
      <p class=" w-[12rem] px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition">
        Status: {data?.status === "PENDING" ? "En progreso" : ""}
      </p>
    </section>
  );
}
