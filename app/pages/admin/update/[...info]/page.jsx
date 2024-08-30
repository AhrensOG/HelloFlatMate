"use client";

import CategorySelectSection from "@/app/components/admin/property_magnament/create/CategorySelectSection";
import UpdateProperty from "@/app/components/admin/property_magnament/update/UpdateProperty";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

export default function UpdatePropertyPage({ params }) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState(false);

  const id = params.info[0];
  const category = params.info[1];

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id && category) {
      const getData = async () => {
        try {
          const response = await axios.get(`/api/property?id=${id}`);
          console.log(response);

          setInitialData(response.data.property);
          setCurrentCategory(category);
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };
      getData();
      console.log(initialData);
    }
  }, [id]);

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep - 1 === 0) {
      return router.push("/pages/admin/properties");
    }
    setCurrentStep(currentStep - 1);
  };

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <UpdateProperty
            data={initialData}
            handleBack={handleBack}
            category={currentCategory}
          />
        )}
      </AnimatePresence>
    </Suspense>
  );
}
