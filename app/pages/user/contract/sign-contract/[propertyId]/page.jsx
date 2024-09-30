"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import ContractDetail from "@/app/components/user/contract/contract_detail/ContractDetail";
import { useRouter } from "next/navigation";
import ThankYou from "@/app/components/user/thank_you/ThankYou";
import axios from "axios";

export default function Contract({ params }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [owner, setOwner] = useState();
  const [property, setProperty] = useState();
  const [room, setRoom] = useState(false); // Estado para la room
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
    const fetchData = async () => {
      try {
        const ownerData = await axios.get(`/api/user?propertyId=${propertyId}`);
        const propertyData = await axios.get(`/api/property?id=${propertyId}`);

        setOwner(ownerData.data || null);
        setProperty(propertyData?.data?.property || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [propertyId]);

  if (!owner || !property) {
    return (
      <div className="w-full h-screen">
        <header>
          <NavBar />
        </header>
        <div className="flex items-center justify-center grow">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className={`${plus_jakarta.className} p-2 text-[#000000]`}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          }
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <ContractDetail
                owner={owner}
                property={property}
                room={room}
                handleContinue={handleContinue}
                handleBack={handleBack}
              />
            )}
            {currentStep === 2 && (
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
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}
