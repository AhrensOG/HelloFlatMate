import Image from "next/image";
import ButtonReadAndSingContract from "./ButtonReadAndSingContract";
import DocumentsSection from "./contract_second_view/DocumentsSection";
import TitleSection from "./TitleSection";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";

export default function ContractSecondView({ handleContinue, handleBack }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
    >
      <div className="flex flex-col">
        <TitleSection
          title={"Contrato de renta"}
          action={() => {
            handleBack();
          }}
        />
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-center">
            Necesitaremos que subas algunos documentos
          </h2>
          <DocumentsSection
            id="dni"
            img={"/contract/second_view/dni-icon.svg"}
            description={"DNI (Frente y Dorso) o Pasaporte."}
            width={104}
            height={73}
          />
          <DocumentsSection
            id="nomina"
            img={"/contract/second_view/file-icon.svg"}
            description={
              "Nomina o Recibo de sueldo"
            }
            width={135}
            height={135}
          />
          <ButtonReadAndSingContract action={() => handleContinue()} title={"Leer y firmar contrato"} />
        </div>
      </div>
    </motion.section>
  );
}
