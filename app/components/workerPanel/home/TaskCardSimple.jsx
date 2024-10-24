import Image from "next/image";

export default function TaskCardSimple({ type, status, title, action }) {
  return (
    <section
      onClick={action}
      className="flex items-center justify-between gap-1 cursor-pointer"
    >
      <div className=" w-14">
        <div className="rounded-full h-14 w-14 flex justify-center items-center bg-[#0E165C]">
          {type === "clean" ? (
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
              alt="Icono de limpieza"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col p-2">
        <h2 className="font-semibold text-base break-words">{title}</h2>
        <div className="flex justify-between w-full">
          <div className="flex items-end w-full">
            {status === "in_process" ? (
              <h3 className="font-bold text-sm text-[#0E165C] align-text-bottom w-full text-end">
                En Proceso
              </h3>
            ) : status === "completed" ? (
              <h3 className="font-bold text-sm text-[#214802] align-text-bottom w-full text-end">
                Completado
              </h3>
            ) : (
              <h3 className="font-bold text-sm text-[#FF0000] align-text-bottom w-full text-end">
                Pendiente
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
