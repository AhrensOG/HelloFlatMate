import Image from "next/image";

export default function ApplicationCardHistory({
  type,
  status,
  title,
  resumen,
  date,
  body,
  action,
}) {
  return (
    <section
      onClick={() => {
        action({
          type: type,
          status: status,
          title: title,
          resumen: resumen,
          date: date,
          body: body || null,
        });
      }}
      className="flex items-center justify-between gap-1 m-2"
    >
      <div className="rounded-full h-14 w-14 flex justify-center items-center bg-[#0E165C]">
        {type === "clean" ? (
          <Image
            src={"/history/application/clean-icon.svg"}
            width={40}
            height={40}
            alt="Icono de limpieza"
          />
        ) : (
          <Image
            src={"/history/application/repair-icon.svg"}
            width={40}
            height={40}
            alt="Icono de limpieza"
          />
        )}
      </div>
      <div className="flex flex-col grow p-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="flex justify-between">
          <div>
            <p className="font-normal text-sm text-[#000000B2] pb-1">
              {resumen}
            </p>
            <p className="font-normal text-[0.67rem] text-[#919191]">{date}</p>
          </div>
          <div className="flex items-end">
            {status === "in_process" ? (
              <h3 className="font-bold text-sm text-[#0E165C] align-text-bottom">
                En Proceso
              </h3>
            ) : status === "completed" ? (
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
