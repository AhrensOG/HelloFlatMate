export default function LeaseOrderPropertySection({ data, formatDate }) {
  return (
    <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Datos de la propiedad</h2>
      <p className="text-gray-600">
        Tipo de propiedad: {data?.category || "No definido"}
      </p>
      <p className="text-gray-600">
        Ubicación:{" "}
        {data?.city + ", " + data?.street + " " + data?.streetNumber || ""}
      </p>
      <p className="text-gray-600">Superficie: {data?.size || "No definido"}</p>
      <p className="text-gray-600">
        Precio por mes: {data?.price || "No definido"}
      </p>
      <p className="text-gray-600">
        Número de habitaciones: {data?.rooms?.length || "No definido"}
      </p>
      <p className="text-gray-600">
        Número de baños: {data?.bathrooms || "No definido"}
      </p>
      <p className="text-gray-600">Número de camas: {data?.bed || "No definido"}</p>
    </section>
  );
}
