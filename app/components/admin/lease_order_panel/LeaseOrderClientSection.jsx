import Image from "next/image";

export default function LeaseOrderClientSection({ data, formatDate }) {
  return (
    <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Datos del Cliente</h2>
      <article className="mb-4">
        <p className="text-gray-600">
          Nombre y apellido:{" "}
          {data?.name + " " + data?.lastName || "No definido"}
        </p>
        <p className="text-gray-600">
          Correo electrónico: {data?.email || "No definido"}
        </p>
        <p className="text-gray-600">Teléfono: {data?.phone || "No definido"}</p>
        <p className="text-gray-600">
          Fecha de nacimiento:{" "}
          {data?.birthDate ? formatDate(data?.birthDate) : "No definido"}
        </p>
        <p className="text-gray-600">
          Domicilio:{" "}
          {data?.city + " " + data?.street + " " + data?.streetNumber ||
            "No definido"}
        </p>
      </article>
      <article className="flex flex-wrap gap-4">
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
          <p className="text-gray-600">Identificación</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
          <p className="text-gray-600">Nómina</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
          <p className="text-gray-600">Firma</p>
          <Image
            src={data?.signature || ""}
            height={200}
            width={200}
            className="mt-2"
          />
        </div>
      </article>
    </section>
  );
}
