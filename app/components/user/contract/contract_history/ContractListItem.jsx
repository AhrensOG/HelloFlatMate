import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function ContractListItem({ contract }) {
  return (
    <article className="flex flex-col gap-3 border border-[#ECECEC] p-3 rounded-2xl">
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
          <h3 className="font-semibold text-base">{contract.name}</h3>
          {contract.room && (
            <p className="text-xs text-gray-500">Habitación: {contract.room.serial}</p>
          )}
        </div>
        <div className="h-6 w-6">
          <Link target="_blank" href={contract.url}>
            <ArrowDownTrayIcon />
          </Link>
        </div>
      </div>
      {contract.status == "APPROVED" && (
        <div className="flex items-center gap-2 bg-[#52B46B] text-white h-[2rem] px-4 w-auto rounded-2xl font-medium text-base justify-center max-w-36">
          <CheckCircleIcon className="h-5 w-5" />
          <span>Aprobado</span>
        </div>
      )}
      {contract.status == "REJECTED" && (
        <div className="flex items-center gap-2 bg-[#F44336] text-white h-[2rem] px-4 w-auto rounded-2xl font-medium text-base justify-center">
          <XCircleIcon className="h-5 w-5" />
          <span>Rechazado</span>
        </div>
      )}
    </article>
  );
}