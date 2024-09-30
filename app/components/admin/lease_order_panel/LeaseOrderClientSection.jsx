import Image from "next/image";
import Link from "next/link";

export default function LeaseOrderClientSection({
  data,
  formatDate,
  contract,
}) {
  console.log(data);

  return (
    <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md space-y-4">
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
        <p className="text-gray-600 pt-4">
          Nombre y apellido de emergencia:{" "}
          {data?.name + " " + data?.emergencyName || "No definido"}
        </p>
        <p className="text-gray-600">
          Correo electrónico de emergencia: {data?.emergencyEmail || "No definido"}
        </p>
        <p className="text-gray-600">
          Teléfono de emergencia: {data?.emergencyPhone || "No definido"}
        </p>
      </article>
      <article className="flex flex-col gap-4 pt-4">
        {/* <div className="bg-white p-4 rounded shadow w-full md:w-1/3 flex flex-col justify-center items-center">
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
        </div> */}
        <div className="w-full flex flex-row flex-wrap gap-4">
          <div className="bg-white p-4 rounded shadow w-full md:w-1/3 flex flex-col justify-center items-center">
            <p className="text-gray-600">Nómina</p>
            {data?.documents
              .filter((doc) => doc.type === "ROSTER")
              .map((doc) =>
                doc.urls.map((dc) => {
                  return (
                    <Link href={dc} target="_blank">
                      <Image
                        src={dc || ""}
                        height={200}
                        width={200}
                        className="mt-2"
                      />
                    </Link>
                  );
                })
              )}
          </div>
          <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
            <p className="text-gray-600">Firma</p>
            {data?.signature ? (
              <Link href={data?.signature || "#"} target="_blank">
                <Image
                  src={data?.signature || ""}
                  height={200}
                  width={200}
                  className="mt-2"
                />
              </Link>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <span className="text-sm text-slate-500">
                  El usuario aun no ha firmado
                </span>
              </div>
            )}
          </div>
        </div>

        <section className="bg-gray-100 rounded-lg shadow-md self-center w-full">
          <h2 className="text-xl font-bold text-gray-800 py-3">Contrato</h2>
          {contract && contract.url ? (
            <Link
              target="_blank"
              href={`${contract ? contract.url : "#"}`}
              className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Ver Contrato
            </Link>
          ) : (
            <span>El contrato aun no ha sido firmado</span>
          )}
        </section>
      </article>
    </section>
  );
}
