import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ContractListItem from "./ContractListItem";

export default function ContractList() {
  return (
    <main className=" mx-4">
      <div className="flex items-center justify-between w-full  mt-7">
        <button type="button" className="h-7 w-7 ml-3 opacity-70">
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-center pr-7">
          Contratos pendientes
        </h1>
      </div>
      <section className="flex flex-col gap-3 mt-8">
        <h2 className="hidden">Contratos Pendientes</h2>
        <ContractListItem status="pending" />
        <ContractListItem status="pending" />
      </section>
      <section className="flex flex-col gap-3 mt-10">
        <h2 className="font-semibold text-xl text-[#222222] text-center mb-3">
          Historial de contratos
        </h2>
        <ContractListItem status="completed" />
        <ContractListItem status="completed" />
      </section>
    </main>
  );
}
