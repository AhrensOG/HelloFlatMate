import Image from "next/image";

export default function TaskCardHistory({
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
          title: title,
          resumen: resumen,
          date: date,
          body: body || null,
        });
      }}
      className="flex items-center w-full justify-between gap-1 m-2"
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
        </div>
      </div>
    </section>
  );
}
