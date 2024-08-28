import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ActionCard from "./action_card/ActionCard";
import { plus_jakarta } from "@/font";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DocumentsList from "../../documents/DocumentsList";
import ContractList from "./ContractList";
import { useRouter } from "next/navigation";

export default function ContractsHistory() {
  const [open, setOpen] = useState("");
  const route = useRouter();

  const handleClick = (string) => {
    setOpen(string);
  };

  return (
    <AnimatePresence>
      {open == "" ? (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`${plus_jakarta.className} flex flex-col justify-center gap-6 items-center`}
        >
          <div className="flex items-center justify-between w-full  mt-7">
            <button
              onClick={() => route.back()}
              type="button"
              className="h-7 w-7 ml-3 opacity-70"
            >
              <ArrowLeftIcon />
            </button>
            <h1 className="font-semibold text-xl text-[#191B23] grow text-center pr-20">
              Mis contratos
            </h1>
          </div>
          <ActionCard
            action={() => {
              handleClick("contracts");
            }}
            title={"Administra tus contratos"}
            img={"/contract/history/contract.svg"}
            body={"Administra los contratos de renta."}
          />

          <h2 className="text-[#222222] font-semibold text-xl mt-6">
            Mis Documentos
          </h2>

          <ActionCard
            action={() => {
              handleClick("documents");
            }}
            title={"Administra tus documentos"}
            img={"/contract/history/document.svg"}
            body={"Administra y ve tus documentos importantes."}
          />
        </motion.main>
      ) : open == "contracts" ? (
        <ContractList action={() => handleClick("")} />
      ) : open == "documents" ? (
        <DocumentsList action={() => handleClick("")} />
      ) : null}
    </AnimatePresence>
  );
}
