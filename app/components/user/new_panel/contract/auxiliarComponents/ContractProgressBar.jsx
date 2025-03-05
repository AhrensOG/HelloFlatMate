"use client";

import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Context } from "@/app/context/GlobalContext";

export default function ContractProgressBar() {
    const { state } = useContext(Context);
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const leaseOrderId = searchParams.get("lo");

    const steps = [
        {
            label: "Información personal",
            key: "personal",
            basePath: "/pages/user/contractv2",
        },
        {
            label: "Documentos",
            key: "documents",
            basePath: "/pages/user/contractv2/docs",
        },
        {
            label: "Pagos",
            key: "payments",
            basePath: "/pages/user/contractv2/payments",
        },
        {
            label: "Firma del contrato",
            key: "signature",
            basePath: "/pages/user/contractv2/signature",
        },
    ];

    const [personalFraction, setPersonalFraction] = useState(0);
    const [isDocsComplete, setIsDocsComplete] = useState(false);
    const [isPaymentsComplete, setIsPaymentsComplete] = useState(false);
    const [isSignatureComplete, setIsSignatureComplete] = useState(false);

    const [fillPercent, setFillPercent] = useState(0);

    useEffect(() => {
        if (!state?.user) return;

        const user = state.user;

        // Calcular fracción de "Información Personal"
        const personalFields = [
            user.name,
            user.lastName,
            user.idNum,
            user.phone,
            user.emergencyPhone,
            user.city,
            user.email,
            user.street,
            user.streetNumber,
            user.postalCode,
            user.birthDate,
            user.emergencyName,
            user.emergencyEmail,
            user.howMetUs,
            user.destinationUniversity,
            user.homeUniversity,
            user.arrivalDate,
            user.arrivalTime,
            user.genre,
            user.country,
            user.reasonForValencia,
            user.personalReview,
        ];
        const totalPersonal = personalFields.length;
        const filledCount = personalFields.filter(
            (field) => field && String(field).trim() !== ""
        ).length;

        const fraction = filledCount / totalPersonal;
        setPersonalFraction(fraction);

        let docsComplete = false;
        if (Array.isArray(user.documents) && leaseOrderId) {
            docsComplete = user.documents.some(
                (doc) =>
                    doc.documentableId === user.id &&
                    String(doc.leaseOrderId) === leaseOrderId
            );
        }
        setIsDocsComplete(docsComplete);

        setIsPaymentsComplete(false);
        setIsSignatureComplete(false);
    }, [state.user, leaseOrderId]);

    useEffect(() => {
        const personalPoints = personalFraction * 25;
        const docPoints = isDocsComplete ? 25 : 0;
        const payPoints = isPaymentsComplete ? 25 : 0;
        const signPoints = isSignatureComplete ? 25 : 0;

        const total = personalPoints + docPoints + payPoints + signPoints;
        setFillPercent(total);
    }, [
        personalFraction,
        isDocsComplete,
        isPaymentsComplete,
        isSignatureComplete,
    ]);

    return (
        <div className="w-full h-[86px] px-4 grid place-items-center">
            <div className="pt-4 relative h-full w-full max-w-screen-xl flex flex-col items-center">
                <p className="text-center text-gray-700 font-bold">
                    ¡Sigue los pasos para completar tu reserva!
                </p>

                {/* Barra de progreso */}
                <div className="relative w-full h-2.5 overflow-hidden rounded-full mt-2">
                    {/* Fondo */}
                    <div className="absolute inset-0 bg-gray-300" />
                    {/* Parte verde animada */}
                    <motion.div
                        className="absolute inset-0 bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>

                {/* Porcentaje */}
                <p className="absolute z-10 bottom-0 text-center text-green-600 font-semibold mt-1">
                    {Math.round(fillPercent)}% completado
                </p>

                {/* Etiquetas con links debajo */}
                <div className="flex w-full justify-between pt-1">
                    {steps.map((step) => {
                        let isDone = false;
                        if (step.key === "personal") {
                            isDone = personalFraction >= 1;
                        } else if (step.key === "documents") {
                            isDone = isDocsComplete;
                        } else if (step.key === "payments") {
                            isDone = isPaymentsComplete;
                        } else if (step.key === "signature") {
                            isDone = isSignatureComplete;
                        }

                        // Reconstruir URL con la query
                        const linkWithQuery = `${step.basePath}?${queryString}`;

                        return (
                            <Link
                                key={step.key}
                                href={linkWithQuery}
                                className={`block w-1/4 text-center text-sm font-medium transition-colors duration-300 ${
                                    isDone ? "text-green-600" : "text-gray-600"
                                }`}>
                                {step.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
