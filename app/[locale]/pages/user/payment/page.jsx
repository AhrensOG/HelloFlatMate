"use client";
import AddPaymentMethod from "@/app/components/user/payment/AddPaymentMethod";
import PaymentComponent from "@/app/components/user/payment/PaymentComponent";
import Reserve from "@/app/components/user/payment/Reserve";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/app/components/nav_bar/NavBar";
import { useRouter } from "next/navigation";
import ThankYou from "@/app/components/user/thank_you/ThankYou";

export default function Payment() {
  const [currentStep, setCurrentStep] = useState(1);
  const route = useRouter();

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleRedirect = () => {
    route.push("/");
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Reserve
              handleContinue={handleContinue}
              handleBack={handleRedirect}
            />
          )}
          {currentStep === 2 && (
            <AddPaymentMethod
              handleContinue={handleContinue}
              handleBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <PaymentComponent
              handleContinue={handleContinue}
              handleBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <ThankYou
              title={"Pago realizado con exito"}
              body={
                "Serás redirigido a la página de inicio en breve o haga clic en el botón de abajo."
              }
              action={"Volver a inicio"}
              callback={handleRedirect}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
