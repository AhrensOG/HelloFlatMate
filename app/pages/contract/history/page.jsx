import ContractList from "@/app/components/contract/contract_history/ContractList";
import ContractsHistory from "@/app/components/contract/contract_history/ContractsHistory";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function ContractHistory() {
  return (
    <>
      <header className="px-2">
        <NavBar />
      </header>
      {/* <ContractsHistory title={"Mis contratos"} /> */}
      <ContractList />
    </>
  );
}
