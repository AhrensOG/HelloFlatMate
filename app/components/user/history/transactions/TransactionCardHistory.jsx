import { CurrencyEuroIcon } from "@heroicons/react/24/outline";

export default function TransactionCardHistory({
  tittle,
  price,
  date,
  typeRoom,
  status,
}) {
  // Definir el color del ícono basado en el estado
  const iconColor =
    status === "APPROVED"
      ? "text-green-500"
      : status === "REJECTED"
      ? "text-red-500"
      : "text-[#0E155F]";

  return (
    <section className="flex items-center justify-around gap-3 m-2">
      <div
        className={`h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center ${iconColor}`}
      >
        <CurrencyEuroIcon className="h-10 w-10" />
      </div>
      <div className="grow flex flex-col gap-1 justify-center h-11">
        <h2 className="font-semibold text-base">{`${tittle} - ${
          status === "APPROVED" ? "Pago aprobado" : "Pago rechazado"
        }`}</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">
          {typeRoom === "ROOM" ? "helloroom" : "hellostudio"}
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-base">€{price}</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">{date}</p>
      </div>
    </section>
  );
}
