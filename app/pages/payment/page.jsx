"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import AddPaymentMethod from "@/app/components/payment/AddPaymentMethod";
import PaymentComponent from "@/app/components/payment/PaymentComponent";
import Reserve from "@/app/components/payment/Reserve";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Payment() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <header className="w-full flex justify-between items-center h-[7vh] px-1.5 pt-1.5">
                <NavBar />
            </header>
            <main className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <Reserve
                            handleContinue={handleContinue}
                            handleBack={handleBack}
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
                </AnimatePresence>
            </main>
        </>
    );
}
