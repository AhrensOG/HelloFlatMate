import Image from "next/image";

export default function ApplicationCardHistory({ data, action }) {
  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    // Formatear la fecha y hora
    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );

    return formattedDate.replace(",", " a las");
  }

  return (
    <section
      onClick={action}
      className="flex items-center justify-between gap-1 cursor-pointer"
    >
      <div className=" w-14">
        <div className="rounded-full h-14 w-14 flex justify-center items-center bg-[#0E165C]">
          {data?.type === "CLEAN" ? (
            <Image
              src={"/history/application/clean-icon.svg"}
              width={38}
              height={38}
              alt="Icono de limpieza"
            />
          ) : (
            <Image
              src={"/history/application/repair-icon.svg"}
              width={38}
              height={38}
              alt="Icono de reparacion"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col grow p-2">
        <h2 className="font-semibold text-lg">{data?.title}</h2>
        <div className="flex justify-between">
          <div>
            <p className="font-normal text-sm text-[#000000B2] pb-1">
              {data?.body}
            </p>
            <p className="font-normal text-[0.67rem] text-[#919191]">
              {formatDate(data?.startDate)}
            </p>
          </div>
          <div className="flex items-end">
            {data?.status === "IN_PROGRESS" ? (
              <h3 className="font-bold text-sm text-[#0E165C] align-text-bottom">
                En Proceso
              </h3>
            ) : data?.status === "COMPLETED" ? (
              <h3 className="font-bold text-sm text-[#214802] align-text-bottom">
                Completado
              </h3>
            ) : (
              <h3 className="font-bold text-sm text-[#FF0000] align-text-bottom">
                Pendiente
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
