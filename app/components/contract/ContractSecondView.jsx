import ButtonReadAndSingContract from "./ButtonReadAndSingContract";
import DocumentsSection from "./contract_second_view/DocumentsSection";
import TitleSection from "./TitleSection";

export default function ContractSecondView() {
  return (
    <div className="flex flex-col">
      <TitleSection title={"Contrato de renta"} action={() => {}} />
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-center">
          Necesitaremos que subas algunos documentos
        </h2>
        <DocumentsSection
          id="dni"
          img={"/contract/second_view/dni-icon.svg"}
          description={"Sube una foto de tu DNI o pasaporte"}
          width={104}
          height={73}
        />
        <DocumentsSection
          id="nomina"
          img={"/contract/second_view/file-icon.svg"}
          description={
            "Sube una fotografía de tu Nomina, recibo de sueldo, etc."
          }
          width={135}
          height={135}
        />
        <ButtonReadAndSingContract />
      </div>
    </div>
  );
}
