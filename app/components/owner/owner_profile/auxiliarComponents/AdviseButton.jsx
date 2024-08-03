import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdviseButton = ({
  link = "#",
  image = "/profile/owner_profile/services.svg",
  title = "Servicios",
  currency = false,
}) => {
  return (
    <Link href={link} className="w-full h-[61px]">
      <span className="flex justify-center items-center gap-2 font-medium text-lg p-2 w-full h-full shadow-profile border rounded-3xl shadow-black/30">
        {currency ? (
          <div className="h-9 w-9 rounded-full bg-[#21ABCC4D] flex items-center justify-center text-[#0E155F]">
            <CurrencyEuroIcon className="h-8 w-8" />
          </div>
        ) : (
          <Image src={image} width={36} height={36} alt="Service Icon" />
        )}
        {title}
      </span>
    </Link>
  );
};

export default AdviseButton;
