"use client";

import CategorySelectSection from "@/app/components/owner/property_magnament/create/CategorySelectSection";
import NewProperty from "@/app/components/owner/property_magnament/create/NewProperty";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState(false);

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep - 1 === 0) {
      return router.push("/pages/owner");
    }
    setCurrentStep(currentStep - 1);
  };
  return (
    <AnimatePresence mode="wait">
      {currentStep === 1 && (
        <CategorySelectSection
          handleContinue={handleContinue}
          handleBack={handleBack}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      )}
      {currentStep === 2 && (
        <NewProperty category={currentCategory} handleBack={handleBack} />
      )}
    </AnimatePresence>
  );
}