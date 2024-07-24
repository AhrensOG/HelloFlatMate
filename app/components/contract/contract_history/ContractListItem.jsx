import { plus_jakarta } from "@/font";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function ContractListItem({ status }) {
  return (
    <article
      className={`${plus_jakarta.className} flex flex-col gap-3 border border-[#ECECEC] p-3 rounded-2xl`}
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
          <p className="text-sm text-[#A6A6A6] font-normal">
            28 Oct 2023 | 122 MB
          </p>
          <h3 className="font-semibold text-base">Contrato HelloRoom</h3>
        </div>
        <div className="h-6 w-6">
          <EllipsisVerticalIcon />
        </div>
      </div>
      {status == "completed" ? null : (
        <div className="grow flex justify-end">
          <button className="w-[7.94rem] h-[1.57rem] rounded-lg bg-[#0C1660] text-xs font-normal text-white">
            Firmar contrato
          </button>
        </div>
      )}
    </article>
  );
}
