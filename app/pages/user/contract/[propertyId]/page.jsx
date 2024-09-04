"use client";
import ContractForm from "@/app/components/user/contract/contract_form/ContractForm";
import ContractSecondView from "@/app/components/user/contract/ContractSecondView";
import NavBar from "@/app/components/nav_bar/NavBar";
import PaymentComponent from "@/app/components/user/payment/PaymentComponent";
import GlobalContext from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ContractDetail from "@/app/components/user/contract/contract_detail/ContractDetail";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import ThankYou from "@/app/components/user/thank_you/ThankYou";
import axios from "axios";

export default function Contract({ params }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [owner, setOwner] = useState();
  const propertyId = params.propertyId;
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

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const data = await axios.get("/api/user?propertyId=" + propertyId);
        setOwner(data.data || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchOwner();
  }, [propertyId]);

  if (!owner) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
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
                owner={owner}
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
