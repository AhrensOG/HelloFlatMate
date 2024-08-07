import { CurrencyEuroIcon } from "@heroicons/react/24/outline";

export default function PaymentCard({ name, amount, date, button }) {
  return (
    <article className="flex items-center justify-between gap-3 h-16 w-full">
      <div className="h-14 w-14 rounded-full bg-[#21ABCC4D] flex items-center justify-center text-[#0E155F]">
        <CurrencyEuroIcon className="h-10 w-10" />
      </div>
      <div className="grow flex flex-col gap-2 justify-center h-11 ">
        <h2 className="font-semibold text-base">Pago recibido</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">{name}</p>
      </div>
      <div className="flex flex-col gap-2 justify-center h-11 ">
        <h2 className="font-semibold text-base text-[#34A853]">+€{amount}</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">{date}</p>
      </div>
      <div>{button}</div>
    </article>
  );
}
