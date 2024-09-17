import Image from "next/image";
import Link from "next/link";

export default function LeaseOrderClientSection({
  data,
  formatDate,
  contract,
}) {
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
        <p className="text-gray-600">
          Teléfono: {data?.phone || "No definido"}
        </p>
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
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3 flex flex-col justify-center items-center">
          <p className="text-gray-600">Identificación</p>
          {data?.documents
            .filter((doc) => doc.type === "IDENTIFICATION")
            .map((doc) =>
              doc.urls.map((dc) => {
                return (
                  <Image
                    src={dc || ""}
                    height={200}
                    width={200}
                    className="mt-2"
                  />
                );
              })
            )}
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3 flex flex-col justify-center items-center">
          <p className="text-gray-600">Nómina</p>
          {data?.documents
            .filter((doc) => doc.type === "ROSTER")
            .map((doc) =>
              doc.urls.map((dc) => {
                return (
                  <Image
                    src={dc || ""}
                    height={200}
                    width={200}
                    className="mt-2"
                  />
                );
              })
            )}
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
          <p className="text-gray-600">Firma</p>
          {data?.signature ? (
            <Image
              src={data?.signature || ""}
              height={200}
              width={200}
              className="mt-2"
            />
          ) : (
            <span className="text-sm text-slate-500">
              El usuario aun no ha firmado
            </span>
          )}
        </div>

        <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md ">
          <h2 className="text-xl font-bold text-gray-800 py-3">Contrato</h2>
          <Link
            target="_blank"
            href={`${contract ? contract.url : "#"}`}
            className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Ver Contrato
          </Link>
        </section>
      </article>
    </section>
  );
}
