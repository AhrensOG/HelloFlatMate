import { plus_jakarta } from "@/font";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function DocumentListItem({ type, title, date }) {
  return (
    <article
      className={`${plus_jakarta.className} flex flex-col w-full gap-3 border border-[#ECECEC] p-3 rounded-2xl`}
    >
      <div className="flex items-center justify-between">
        {type === "pdf" ? (
          <div className="flex items-center justify-center h-10 w-10 bg-[#FFD7D1] rounded-lg">
            <Image
              src={"/contract/history/PPT.svg"}
              width={24}
              height={24}
              alt="PPT icono"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-10 w-10 rounded-lg">
            <Image
              src={"/documents/RAW.svg"}
              width={24}
              height={24}
              alt="RAW icono"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 grow pl-2">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-sm text-[#A6A6A6] font-normal">{date}</p>
        </div>
        <div className="h-6 w-6">
          <EllipsisVerticalIcon />
        </div>
      </div>
    </article>
  );
}
