import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import React from "react";

const TransactionCard = ({ tittle, price, date, location }) => {
  return (
    <section className="w-full flex items-center justify-around gap-3 m-2">
      <div className="h-12 w-12 rounded-full bg-[#21ABCC4D] flex items-center justify-center text-[#0E155F]">
        <CurrencyEuroIcon className="h-10 w-10" />
      </div>
      <div className="grow flex flex-col gap-1 justify-center h-11 ">
        <h2 className="text-base">{tittle}</h2>
        <p className="text-sm text-[#A5A2A1]">{location}</p>
      </div>
      <div>
        <h2 className="font-semibold text-sm text-green-400">+€{price}</h2>
        <p className="font-medium text-sm text-[#A5A2A1]">{date}</p>
      </div>
    </section>
  );
};

export default TransactionCard;
