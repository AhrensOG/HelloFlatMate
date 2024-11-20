 
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function ContractListItem({ contract }) {
  return (
    <article
      className={`  flex flex-col gap-3 border border-[#ECECEC] p-3 rounded-2xl`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center h-10 w-10 bg-[#FFD7D1] rounded-lg">
          <Image
            src={"/contract/history/PPT.svg"}
            width={24}
            height={24}
            alt="PPT icono"
          />
        </div>
        <div className="flex flex-col gap-1 grow pl-2">
          <p className="text-sm text-[#A6A6A6] font-normal">{contract.date}</p>
          <h3 className="font-semibold text-base">{contract.name}</h3>
        </div>
        <div className="h-6 w-6">
          <Link target="_blank" href={contract.url}>
            <ArrowDownTrayIcon />
          </Link>
        </div>
      </div>
      {contract.status == "APPROVED" && (
        <span className="bg-[#52B46B] text-white h-[2rem] px-4 w-[6.5rem] rounded-2xl font-medium text-base flex items-center justify-center">
          Aprobado
        </span>
      )}
      {contract.status == "REJECTED" && (
        <span className="bg-[#F44336] text-white h-[2rem] px-4 w-[6.5rem] rounded-2xl font-medium text-base flex items-center justify-center">
          Rechazado
        </span>
      )}
    </article>
  );
}
