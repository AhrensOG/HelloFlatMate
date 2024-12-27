import { CurrencyEuroIcon } from "@heroicons/react/24/outline";

export default function PriceSection({ data }) {
  return (
    <section className="flex gap-2">
      <h1 className="font-bold text-[1.37rem]">Precio:</h1>
      <h4 className="text-[#000000B2] text-[1.37rem] font-semibold flex gap-1 items-center">
        {data}
        {/* <span className="h-6 w-6 flex items-center">
          <CurrencyEuroIcon />
        </span> */}
        <span className="text-base">€ / mes</span>
      </h4>
    </section>
  );
}
