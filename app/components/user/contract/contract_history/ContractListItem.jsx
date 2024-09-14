import { plus_jakarta } from "@/font";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function ContractListItem({ contract }) {
  console.log(contract);

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
          <p className="text-sm text-[#A6A6A6] font-normal">{contract.date}</p>
          <h3 className="font-semibold text-base">{contract.name}</h3>
        </div>
        <div className="h-6 w-6">
          <EllipsisVerticalIcon />
        </div>
      </div>
      {contract.status == "APPROVED" && (
        <span className="bg-[#52B46B] text-white h-[2rem] px-4 min-w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center">
          Aprobado
        </span>
      )}
    </article>
  );
}
