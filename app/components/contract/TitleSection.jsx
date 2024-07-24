import { poppins } from "@/font";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function TitleSection({ title, action }) {
  return (
    <div className="flex items-center gap-5">
      <button onClick={action} type="button" className="self-start m-1">
        <ArrowLeftIcon className="size-6"/>
      </button>
      <h1
        className={`${poppins.className} text-[#191B23] font-semibold text-xl`}
      >
        {title}
      </h1>
    </div>
  );
}
