import { plus_jakarta } from "@/font";
import DocumentListItem from "./DocumentListItem";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export default function DocumentsList({ action }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} flex flex-col justify-center gap-6 items-center`}
    >
      <div className="flex items-center justify-between w-full  mt-7">
        <button
          onClick={action}
          type="button"
          className="h-7 w-7 ml-3 opacity-70"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-center ">
          Documentos importantes
        </h1>
      </div>
      <div className="flex flex-col gap-3 py-4 px-4 w-full">
        <DocumentListItem
          type="pdf"
          title="Contrato activo"
          date="28 Oct 2023 | 122 MB"
        />
        <DocumentListItem type="raw" title="DNI" date="28 Oct 2023 | 122 MB" />
        <DocumentListItem
          type="raw"
          title="Pasaporte"
          date="28 Oct 2023 | 122 MB"
        />
      </div>
      <button
        className="w-[20.31rem] h-[3.25rem] bg-payment-button-gradient hover:bg-payment-button-gradient-hover text-white font-normal text-base rounded-xl"
        type="button"
      >
        Subir documentacion
      </button>
    </motion.main>
  );
}
