"use client";
import ContractFirstView from "@/app/components/contract/ContractFirstView";
import ContractSecondView from "@/app/components/contract/ContractSecondView";
import NavBar from "@/app/components/nav_bar/NavBar";
import GlobalContext from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";

export default function Contract() {
  return (
    <GlobalContext>
      <>
        <header className="px-2">
          <NavBar />
        </header>
        <main className={`${plus_jakarta.className} px-2 text-[#000000]`}>
          {/* <ContractFirstView /> */}
          <ContractSecondView />
        </main>
      </>
    </GlobalContext>
  );
}
