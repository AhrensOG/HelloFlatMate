"use client";

import CategorySelectSection from "@/app/components/admin/property_magnament/create/CategorySelectSection";
import NewPropertyDesktop from "@/app/components/admin/property_magnament/create/desktop/NewPropertyDesktop";
import NewProperty from "@/app/components/admin/property_magnament/create/NewProperty";
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
      return router.push("/pages/admin/properties");
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
        <>
          <div className="block lg:hidden">
            <NewProperty category={currentCategory} handleBack={handleBack} />
          </div>
          <div className="hidden lg:block">
            <NewPropertyDesktop
              handleBack={handleBack}
              category={currentCategory}
            />
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
