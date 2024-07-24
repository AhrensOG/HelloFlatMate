import { CurrencyEuroIcon } from "@heroicons/react/24/outline";

export default function TransactionCardHistory({
  tittle,
  price,
  date,
  typeRoom,
}) {
  return (
    <section className="flex items-center justify-around gap-3 m-2">
      <div className="h-12 w-12 rounded-full bg-[#21ABCC4D] flex items-center justify-center text-[#0E155F]">
        <CurrencyEuroIcon className="h-10 w-10" />
      </div>
      <div className="grow flex flex-col gap-1 justify-center h-11 ">
        <h2 className="font-semibold text-base">{tittle}</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">{typeRoom}</p>
      </div>
      <div>
        <h2 className="font-semibold text-base">€{price}</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">{date}</p>
      </div>
    </section>
  );
}
