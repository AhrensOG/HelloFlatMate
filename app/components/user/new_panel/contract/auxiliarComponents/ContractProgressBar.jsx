"use client";

import React, { useContext, useEffect, useState } from "react";
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
    // Para pagos se usará un número de 0 a 1 (0 = 0%, 1 = 100% completado)
    const [isPaymentsComplete, setIsPaymentsComplete] = useState(0);
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
            // user.arrivalDate,
            // user.arrivalTime,
            user.genre,
            user.country,
            // user.reasonForValencia,
            user.personalReview,
        ];
        const totalPersonal = personalFields.length;
        const filledCount = personalFields.filter(
            (field) => field && String(field).trim() !== ""
        ).length;
        const fraction = filledCount / totalPersonal;
        setPersonalFraction(fraction);

        // Verificar si los documentos están completos
        let docsComplete = false;
        if (Array.isArray(user.documents) && leaseOrderId) {
            docsComplete = user.documents.some(
                (doc) => String(doc.leaseOrderId) === leaseOrderId
            );
        }
        setIsDocsComplete(docsComplete);

        // Calcular el progreso de pagos:
        // Buscar en state.user.supplies aquellos con leaseOrderId igual a leaseOrderId y con tipos permitidos.
        const allowedTypes = [
            "DEPOSIT",
            "AGENCY_FEES",
            "INTERNET",
            "GENERAL_SUPPLIES",
        ];
        let paymentsFraction = 0;
        if (Array.isArray(user.supplies) && leaseOrderId) {
            let supplies = user.supplies.filter(
                (sup) =>
                    String(sup.leaseOrderId) === leaseOrderId &&
                    allowedTypes.includes(sup.type)
            );

            let uniqueSupplies = {};

            supplies.forEach((sup) => {
                if (!uniqueSupplies[sup.type]) {
                    uniqueSupplies[sup.type] = sup;
                } else {
                    if (
                        sup.status === "PAID" &&
                        uniqueSupplies[sup.type].status !== "PAID"
                    ) {
                        uniqueSupplies[sup.type] = sup;
                    }
                }
            });

            const filteredSupplies = Object.values(uniqueSupplies);

            const totalPayments = filteredSupplies.length;
            const paidPayments = filteredSupplies.filter(
                (sup) => sup.status === "PAID"
            ).length;
            paymentsFraction =
                totalPayments > 0 ? paidPayments / totalPayments : 0;
        }
        setIsPaymentsComplete(paymentsFraction);

        // Actualizar isSignatureComplete según si existe un contrato en state.user.contracts
        let signatureComplete = false;
        if (Array.isArray(user.contracts) && leaseOrderId) {
            signatureComplete = user.contracts.some(
                (contract) => String(contract.leaseOrderId) === leaseOrderId
            );
        }
        setIsSignatureComplete(signatureComplete);
    }, [state.user, leaseOrderId]);

    useEffect(() => {
        const personalPoints = personalFraction * 25;
        const docPoints = isDocsComplete ? 25 : 0;
        const payPoints = isPaymentsComplete * 25;
        const signPoints = isSignatureComplete ? 25 : 0;

        const total = personalPoints + docPoints + payPoints + signPoints;
        setFillPercent(total);
    }, [
        personalFraction,
        isDocsComplete,
        isPaymentsComplete,
        isSignatureComplete,
    ]);

    // Función para determinar si un step está habilitado según el progreso:
    const isStepEnabled = (stepKey) => {
        if (stepKey === "personal") return true;
        if (stepKey === "documents") return personalFraction === 1;
        if (stepKey === "payments")
            return personalFraction === 1 && isDocsComplete;
        if (stepKey === "signature")
            return (
                personalFraction === 1 &&
                isDocsComplete &&
                isPaymentsComplete === 1
            );
        return false;
    };

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
                        const enabled = isStepEnabled(step.key);
                        let isDone = false;
                        if (step.key === "personal") {
                            isDone = personalFraction >= 1;
                        } else if (step.key === "documents") {
                            isDone = isDocsComplete;
                        } else if (step.key === "payments") {
                            isDone = isPaymentsComplete === 1;
                        } else if (step.key === "signature") {
                            isDone = isSignatureComplete;
                        }

                        const linkWithQuery = `${step.basePath}?${queryString}`;

                        return enabled ? (
                            <Link
                                key={step.key}
                                href={linkWithQuery}
                                className={`block w-1/4 text-center text-sm font-medium transition-colors duration-300 ${
                                    isDone ? "text-green-600" : "text-gray-600"
                                }`}
                            >
                                {step.label}
                            </Link>
                        ) : (
                            <span
                                key={step.key}
                                className="block w-1/4 text-center text-sm font-medium text-gray-400"
                            >
                                {step.label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
