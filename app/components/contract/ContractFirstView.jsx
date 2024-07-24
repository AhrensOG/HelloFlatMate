import ContractActions from "@/app/components/contract/ContractActions";
import DetailsContract from "@/app/components/contract/DetailsContract";
import NextPaymentDetails from "@/app/components/contract/NextPaymentDetails";
import TitleSection from "@/app/components/contract/TitleSection";
export default function ContractFirstView() {
  return (
    <div className="flex flex-col gap-5">
      <TitleSection title={"Contrato de renta"} action={() => {}} />
      <DetailsContract
        nameRoom={"HelloRoom"}
        totalPay={"$350"}
        dateStart={"07 de julio 2024"}
        dateEnd={"07 de diciembre 2024"}
        totalMonths={"5"}
        lastPay={"07 de agosto 2024"}
      />
      <NextPaymentDetails
        month={"Septiembre"}
        year={"2024"}
        daysLeft={"30"}
        price={"$128"}
        dueDate={"07 de septiembre"}
      />
      <ContractActions />
    </div>
  );
}
