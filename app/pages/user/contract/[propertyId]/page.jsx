"use client";
import ContractForm from "@/app/components/user/contract/contract_form/ContractForm";
import ContractSecondView from "@/app/components/user/contract/ContractSecondView";
import NavBar from "@/app/components/nav_bar/NavBar";
import PaymentComponent from "@/app/components/user/payment/PaymentComponent";
import GlobalContext from "@/app/context/GlobalContext";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import ThankYou from "@/app/components/user/thank_you/ThankYou";
import axios from "axios";
import ContractDetail from "@/app/components/user/contract/contract_detail/ContractDetail";
import ContractCheckIn from "@/app/components/user/contract/ContractCheckIn";

export default function Contract({ params }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [owner, setOwner] = useState();
  const [property, setProperty] = useState();
  const [room, setRoom] = useState(false);
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
    router.push("/pages/user/my-bedrooms");
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const ownerData = await axios.get("/api/user?propertyId=" + propertyId);
        const propertyData = await axios.get(`/api/property?id=${propertyId}`);
        setOwner(ownerData.data || null);
        setProperty(propertyData?.data?.property || null);
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
        <main className={`  p-2 text-[#000000]`}>
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
              <ContractCheckIn
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <ContractDetail
                owner={owner}
                property={property}
                room={room}
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 4 && (
              <ThankYou
                title={"¡Felicidades!"}
                subTitle={
                  "Tu firma digital y contrato fueron generados con éxito."
                }
                body={
                  "Recuerda abonar los suministros antes de la fecha de ingreso a la propiedad."
                }
                action={"Regresar "}
                callback={handleRedirect}
              />
            )}
            {/* {currentStep === 3 && (
              <PaymentComponent
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )} */}
            {/* {currentStep === 3 && (
              <ContractDetail
                owner={owner}
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )} */}
            {/* {currentStep === 4 && (
              <ThankYou
                title={"¡Felicidades!"}
                subTitle={"Hemos recibido la información correctamente."}
                body={
                  "Te notificaremos cuando validemos la informacion enviada."
                }
                action={"Regresar "}
                callback={handleRedirect}
              />
            )} */}
          </AnimatePresence>
        </main>
      </div>
    </GlobalContext>
  );
}
