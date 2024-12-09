import Image from "next/image";
import Link from "next/link";

export default function LeaseOrderClientSection({
  data,
  formatDate,
  contract,
  isSigned = false,
}) {
  return (
    <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Datos del Cliente</h2>
      <article className="mb-4">
        <p className="text-gray-600">ID: {data?.id || "No definido"}</p>
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
          Género:{" "}
          {data?.genre === "FEMALE"
            ? "Femenino"
            : data?.genre === "MALE"
            ? "Masculino"
            : "Otro"}
        </p>
        <p className="text-gray-600">
          Fecha de nacimiento:{" "}
          {data?.birthDate ? formatDate(data?.birthDate) : "No definido"}
        </p>
        <p className="text-gray-600">
          Documento de identidad: {data?.idNum || "No definido"}
        </p>
        <p className="text-gray-600">
          Dirección:{" "}
          {`${data?.city || ""}, ${data?.street || ""} ${
            data?.streetNumber || ""
          }, ${data?.postalCode || "No definido"}`}
        </p>
        <p className="text-gray-600">País: {data?.country || "No definido"}</p>
        {/* <p className="text-gray-600">
          Universidad de destino: {data?.destinationUniversity || "No definido"}
        </p>
        <p className="text-gray-600">
          Universidad de origen: {data?.homeUniversity || "No definido"}
        </p> */}
        <p className="text-gray-600">
          Razón para venir Valencia: {data?.reasonForValencia || "No definido"}
        </p>
        <p className="text-gray-600">
          Razón adicional: {data?.reasonForValenciaOther || "No definido"}
        </p>
        <p className="text-gray-600">
          Información adicional: {data?.personalReview || "No definido"}
        </p>

        <h3 className="text-lg font-semibold text-gray-700 pt-4">
          Contacto de emergencia
        </h3>
        <p className="text-gray-600">
          Nombre: {data?.emergencyName || "No definido"}
        </p>
        <p className="text-gray-600">
          Teléfono: {data?.emergencyPhone || "No definido"}
        </p>
        <p className="text-gray-600">
          Correo electrónico: {data?.emergencyEmail || "No definido"}
        </p>
      </article>

      <article className="flex flex-col gap-4 pt-4">
        <div className="w-full flex flex-row flex-wrap gap-4">
          {/* Nómina */}
          <div className="bg-white p-4 rounded shadow w-full md:w-1/3 flex flex-col justify-center items-center">
            <p className="text-gray-600">Nómina</p>
            {data?.documents
              .filter((doc) => doc.type === "ROSTER")
              .map((doc, docIndex) =>
                doc.urls.map((dc, urlIndex) => {
                  return (
                    <Link
                      key={`doc-${docIndex}-url-${urlIndex}`}
                      href={dc}
                      target="_blank"
                    >
                      <Image
                        src={dc || ""}
                        height={200}
                        width={200}
                        className="mt-2"
                        alt={`Nómina ${docIndex}-${urlIndex}`}
                      />
                    </Link>
                  );
                })
              )}
          </div>

          {/* Firma */}
          <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
            <p className="text-gray-600">Firma</p>
            {data?.signature && isSigned ? (
              <Link href={data?.signature || "#"} target="_blank">
                <Image
                  src={data?.signature || ""}
                  height={200}
                  width={200}
                  className="mt-2"
                  alt="Firma"
                />
              </Link>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <span className="text-sm text-slate-500">
                  El usuario aún no ha firmado
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contrato */}
        <section className="bg-gray-100 rounded-lg shadow-md self-center w-full">
          <h2 className="text-xl font-bold text-gray-800 py-3">Contrato</h2>
          {contract && contract.url ? (
            <Link
              target="_blank"
              href={`${contract.url}`}
              className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Ver Contrato
            </Link>
          ) : (
            <span>El contrato aún no ha sido firmado</span>
          )}
        </section>
      </article>
    </section>
  );
}
