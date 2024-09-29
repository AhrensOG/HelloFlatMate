export default function LeaseOrderOwnerSection({ data, formatDate }) {
  return (
    <section className="w-full min-h-full bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <h2 className="text-xl font-bold text-gray-800">Datos del dueño</h2>
      <p className="text-gray-600">
        Nombre y apellido: {data?.name + " " + data?.lastName || "No definido"}
      </p>
      <p className="text-gray-600">
        Correo electrónico: {data?.email || "No definido"}
      </p>
      <p className="text-gray-600">Teléfono: 0000000</p>
      <p className="text-gray-600">Fecha de nacimiento</p>
      <p className="text-gray-600">Domicilio</p>
      <p className="text-gray-600">Identificación</p>
    </section>
  );
}
