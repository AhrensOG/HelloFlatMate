"use client";

import React, { useState, useEffect, useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import PayModal from "./PayModal";
import { useTranslations } from "next-intl";

const SUPPLY_TYPE_LABELS = {
    WATER: "Agua",
    GAS: "Gas",
    ELECTRICITY: "Electricidad",
    EXPENSES: "Expensas",
    INTERNET: "WIFI",
    AGENCY_FEES: "Tasa de la agencia",
    CLEANUP: "Limpieza check-out",
    OTHERS: "Otros",
    DEPOSIT: "Depósito",
    GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
};

const orderPriority = [
    "DEPOSIT",
    "AGENCY_FEES",
    "GENERAL_SUPPLIES",
    "INTERNET",
    "RESERVATION",
    "MONTHLY",
    "CLEANUP",
];

// 📌 Función para asignar estilos según el estado del pago
const getStatusStyles = (status, paid) => {
    if (paid)
        return {
            bg: "bg-green-100 text-green-500",
            icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        };

    const styles = {
        PENDING: {
            bg: "bg-blue-100 text-blue-500",
            icon: <ExclamationCircleIcon className="w-5 h-5 text-blue-500" />,
        },
        APPROVED: {
            bg: "bg-green-100 text-green-500",
            icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        },
        REJECTED: {
            bg: "bg-yellow-100 text-yellow-500",
            icon: <XCircleIcon className="w-5 h-5 text-yellow-500" />,
        },
    };

    return styles[status] || { bg: "bg-gray-100 text-gray-500" };
};

const PaymentsV2 = () => {
    const { state } = useContext(Context);
    const [selectedTab, setSelectedTab] = useState("pending");
    const [paymentsToShow, setPaymentsToShow] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const t = useTranslations("user_payment_history");
    const t_supply = useTranslations("supplies");

    useEffect(() => {
        if (!state?.user) return;

        const activeLeaseOrders = [
            ...(state.user.leaseOrdersRoom || []),
        ].filter((order) => order.isActive);

        const getMonthName = (date) => {
            const months = [
                t("months.1"),
                t("months.2"),
                t("months.3"),
                t("months.4"),
                t("months.5"),
                t("months.6"),
                t("months.7"),
                t("months.8"),
                t("months.9"),
                t("months.10"),
                t("months.11"),
                t("months.12"),
            ];
            return months[date.getMonth()] + " " + date.getFullYear();
        };

        const getSupplyName = (supplyType) => {
            const supplies = {
                WATER: t_supply("supply_names.water"),
                GAS: t_supply("supply_names.gas"),
                ELECTRICITY: t_supply("supply_names.electricity"),
                EXPENSES: t_supply("supply_names.expenses"),
                INTERNET: t_supply("supply_names.internet"),
                AGENCY_FEES: t_supply("supply_names.agency_fees"),
                CLEANUP: t_supply("supply_names.cleanup"),
                OTHERS: t_supply("supply_names.others"),
                DEPOSIT: t_supply("supply_names.deposit"),
                GENERAL_SUPPLIES: t_supply("supply_names.general_supplies"),
            };

            return supplies[supplyType] || supplyType;
        };

        const processPayments = (statusFilter) => {
            const normalizedStatus =
                statusFilter === "COMPLETED"
                    ? ["APPROVED", "PAID"]
                    : ["PENDING"];

            const monthlyPayments = (state.user?.rentPayments || [])
                ?.filter((payment) => normalizedStatus.includes(payment.status))
                .map((payment) => {
                    const matchedOrder = activeLeaseOrders.find(
                        (order) => order.id === payment.leaseOrderId
                    );

                    if (
                        !matchedOrder ||
                        matchedOrder.room?.property?.category ===
                            "HELLO_LANDLORD"
                    ) {
                        return null;
                    }

                    const startDate = new Date(matchedOrder.startDate);
                    const paymentMonth = new Date(startDate);
                    paymentMonth.setMonth(
                        startDate.getUTCMonth() + payment.quotaNumber - 1
                    );

                    return {
                        id: payment.id,
                        month: getMonthName(paymentMonth),
                        amount: payment.amount,
                        status: payment.status,
                        type: payment.type,
                        quotaNumber: payment.quotaNumber,
                        description: `${t("desc")} - ${getMonthName(
                            paymentMonth
                        )}`,
                        title: `${t("desc")}`,
                        paid: statusFilter === "COMPLETED",
                        orderType: "ROOM",
                        order: matchedOrder,
                        paymentType: payment.type,
                    };
                })
                .filter(Boolean);
            console.log(monthlyPayments);
            console.log(state.user?.rentPayments);

            const supplyPayments = (state.user?.supplies || [])
                .filter((sup) => normalizedStatus.includes(sup.status))
                .map((sup) => {
                    const matchedOrder = activeLeaseOrders.find(
                        (o) => o.id === sup.leaseOrderId
                    );
                    return {
                        id: sup.id,
                        month: null,
                        amount: sup.amount,
                        status: sup.status,
                        type: sup.type,
                        quotaNumber: null,
                        description: `${t("supply_desc")} - ${getSupplyName(
                            sup.type
                        )}`,
                        supplyLabel: `${
                            SUPPLY_TYPE_LABELS[sup.type] || sup.type
                        }`,
                        paid: statusFilter === "COMPLETED",
                        orderType: sup.leaseOrderType,
                        order: matchedOrder,
                        paymentType: "SUPPLY",
                    };
                });

            return [...monthlyPayments, ...supplyPayments].sort((a, b) => {
                const indexA = orderPriority.indexOf(a.type);
                const indexB = orderPriority.indexOf(b.type);

                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;

                return indexA - indexB;
            });
        };

        // 🔹 Ahora el estado "COMPLETED" funcionará para ambos tipos de pagos
        setPaymentsToShow({
            pending: processPayments("PENDING"),
            completed: processPayments("COMPLETED"),
        });
    }, [state.user, t]);

    const handlePaymentClick = (payment) => {
        if (payment.paid) {
            toast.info(t("toast.info"));
        } else {
            setSelectedPayment(payment);
            setShowModal(true);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-6 bg-white">
            <div className="w-full max-w-screen-xl">
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Pagos
                </h1>
                {/* 📌 Tabs de "Pendientes" y "Realizados" */}

                <div className="flex border-b">
                    {["pending", "completed"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2 text-sm font-semibold uppercase transition-all ${
                                selectedTab === tab
                                    ? "border-b-2 border-blue-700 text-blue-700"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}>
                            {tab === "pending"
                                ? t("new_panel.tab.pending")
                                : t("new_panel.tab.history")}
                        </button>
                    ))}
                </div>

                {/* 📌 Secciones dinámicas para pagos */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4">
                        {paymentsToShow[selectedTab]?.length > 0 ? (
                            paymentsToShow[selectedTab].map(
                                (payment, index) => {
                                    const { bg, icon } = getStatusStyles(
                                        payment.status,
                                        payment.paid
                                    );

                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handlePaymentClick(payment)
                                            }
                                            className="p-4 border rounded-lg shadow-sm shadow-gray-100 bg-white hover:shadow-md transition text-left w-full flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                {icon}
                                                <h2 className="text-lg font-semibold">
                                                    {payment.description}
                                                </h2>
                                            </div>
                                            <span
                                                className={`px-4 py-1 text-sm font-semibold rounded-full ${bg}`}>
                                                {payment.paid
                                                    ? t("paid")
                                                    : t(
                                                          `status.${payment.status.toLowerCase()}`
                                                      )}
                                            </span>
                                        </button>
                                    );
                                }
                            )
                        ) : (
                            <p className="text-gray-500 text-center">
                                {t("not_pend_pay")}
                            </p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showModal && selectedPayment && (
                    <PayModal
                        payment={selectedPayment}
                        user={state.user}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentsV2;
