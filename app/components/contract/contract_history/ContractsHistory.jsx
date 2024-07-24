import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import NavBar from "../../nav_bar/NavBar";
import ActionCard from "./action_card/ActionCard";
import { plus_jakarta } from "@/font";

export default function ContractsHistory() {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center gap-6 items-center`}
    >
      <div className="flex items-center justify-between w-full  mt-7">
        <button type="button" className="h-7 w-7 ml-3 opacity-70">
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-center pr-20">
          Mis contratos
        </h1>
      </div>
      <ActionCard
        title={"Administra tus contratos"}
        img={"/contract/history/contract.svg"}
        body={"Administra los contratos de renta."}
      />

      <h2 className="text-[#222222] font-semibold text-xl mt-6">
        Mis Documentos
      </h2>

      <ActionCard
        title={"Administra tus documentos"}
        img={"/contract/history/document.svg"}
        body={"Administra y ve tus documentos importantes."}
      />
    </main>
  );
}
