import Image from "next/image";
import ButtonReadAndSingContract from "./ButtonReadAndSingContract";
import DocumentsSection from "./contract_second_view/DocumentsSection";
import TitleSection from "./TitleSection";
import { motion } from "framer-motion";

export default function ContractSecondView({ handleContinue, handleBack }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`  w-full flex flex-col gap-7 p-4 `}
    >
      <TitleSection
        title={"Documentación necesaria"}
        action={() => {
          handleBack();
        }}
      />
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full max-w-screen-sm">
          <h2 className="text-sm font-semibold text-center">
            Necesitaremos que subas algunos documentos
          </h2>
          {/* <DocumentsSection
            id="dni"
            img={"/contract/second_view/dni-icon.svg"}
            description={"DNI (Frente y Dorso) o Pasaporte."}
            width={104}
            height={73}
          /> */}
          <DocumentsSection
            id="nomina"
            img={"/contract/second_view/file-icon.svg"}
            description={
              "Nómina si eres nómada digital o matrícula universitaria si eres estudiante"
            }
            width={135}
            height={135}
          />
          <ButtonReadAndSingContract
            action={() => handleContinue()}
            title={"Continuar"}
            isChecked={true}
          />
        </div>
      </div>
    </motion.section>
  );
}
