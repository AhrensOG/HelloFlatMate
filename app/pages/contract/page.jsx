"use client";
import ContractForm from "@/app/components/contract/contract_form/ContractForm";
import ContractSecondView from "@/app/components/contract/ContractSecondView";
import NavBar from "@/app/components/nav_bar/NavBar";
import PaymentComponent from "@/app/components/payment/PaymentComponent";
import GlobalContext from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContractDetail from "@/app/components/contract/contract_detail/ContractDetail";
import { useRouter } from "next/navigation";
import ThankYou from "@/app/components/thank_you/ThankYou";

export default function Contract() {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (!(currentStep - 1)) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleRedirect = () => {
    router.push("/pages/payment");
  };

  return (
    <GlobalContext>
      <div>
        <header>
          <NavBar />
        </header>
        <main className={`${plus_jakarta.className} p-2 text-[#000000]`}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <ContractForm
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 2 && (
              <ContractSecondView
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <ContractDetail
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 4 && (
              <ThankYou
                title={"Firma recibida con exito"}
                body={
                  "Serás redirigido para realizar el pago en breve o haga clic en el botón de abajo."
                }
                action={"Ir a pagar"}
                callback={handleRedirect}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </GlobalContext>
  );
}
