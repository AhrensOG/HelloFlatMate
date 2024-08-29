"use client";
import ContractForm from "@/app/components/user/contract/contract_form/ContractForm";
import ContractSecondView from "@/app/components/user/contract/ContractSecondView";
import NavBar from "@/app/components/nav_bar/NavBar";
import PaymentComponent from "@/app/components/user/payment/PaymentComponent";
import GlobalContext from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContractDetail from "@/app/components/user/contract/contract_detail/ContractDetail";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import ThankYou from "@/app/components/user/thank_you/ThankYou";

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
    router.push("/");
  };

  return (
    <GlobalContext>
      <div>
        <Toaster richColors={true} duration={3000} />
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
              <PaymentComponent
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 5 && (
              <ThankYou
                title={"¡Felicidades!"}
                subTitle={"Tu firma digital y el contrato fueron registrados."}
                body={
                  "Te notificaremos cuando validemos la informacion enviada."
                }
                action={"Regresar "}
                callback={handleRedirect}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </GlobalContext>
  );
}
