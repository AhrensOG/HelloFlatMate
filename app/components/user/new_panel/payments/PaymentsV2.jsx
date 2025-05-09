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
import axios from "axios";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";

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
  MAINTENANCE: "Mantenimiento",
};

const orderPriority = [
  "DEPOSIT",
  "AGENCY_FEES",
  "GENERAL_SUPPLIES",
  "INTERNET",
  "RESERVATION",
  "MONTHLY",
  "CLEANUP",
  "MAINTENANCE",
  "OTHERS",
];

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
  const [paymentsToShow, setPaymentsToShow] = useState({
    pending: [],
    completed: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const t = useTranslations("user_payment_history");
  const t_supply = useTranslations("supplies");

  useEffect(() => {
    if (!state?.user) return;

    const activeLeaseOrders = [...(state.user.leaseOrdersRoom || [])].filter(
      (order) => order.isActive
    );

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
        MAINTENANCE: t_supply("supply_names.maintenance"),
      };

      return supplies[supplyType] || supplyType;
    };

    const processPayments = (statusFilter) => {
      const normalizedStatus =
        statusFilter === "COMPLETED" ? ["APPROVED", "PAID"] : ["PENDING"];

      const paymentsRaw = [];

      // Rent Payments
      for (const payment of state.user?.rentPayments || []) {
        if (!normalizedStatus.includes(payment.status)) continue;

        const matchedOrder = activeLeaseOrders.find(
          (order) => order.id === payment.leaseOrderId
        );

        const isHelloLandlord =
          matchedOrder?.room?.property?.category === "HELLO_LANDLORD";

        if (
          !matchedOrder ||
          (isHelloLandlord &&
            payment.quotaNumber !== 1 &&
            payment.type !== "RESERVATION")
        ) {
          continue;
        }

        const startDate = new Date(matchedOrder.startDate);
        const paymentMonth = new Date(startDate);
        paymentMonth.setMonth(
          startDate.getUTCMonth() + payment.quotaNumber - 1
        );

        paymentsRaw.push({
          id: payment.id,
          month: getMonthName(paymentMonth),
          amount: payment.amount,
          status: payment.status,
          type: payment.type,
          quotaNumber: payment.quotaNumber,
          description: `${
            payment.quotaNumber === 1 ? t("desc_reservation") : t("desc")
          } - ${getMonthName(paymentMonth)}`,
          title: `${
            payment.quotaNumber === 1 ? t("desc_reservation") : t("desc")
          }`,
          paid: statusFilter === "COMPLETED",
          orderType: "ROOM",
          order: matchedOrder,
          paymentType: payment.type,
          _source: "rent",
        });
      }

      // Supply Payments
      for (const sup of state.user?.supplies || []) {
        if (!normalizedStatus.includes(sup.status)) continue;

        const matchedOrder = activeLeaseOrders.find(
          (o) => o.id === sup.leaseOrderId
        );

        let quarterSuffix = "";
        const isQuarteredType = ["INTERNET", "GENERAL_SUPPLIES"].includes(
          sup.type
        );

        if (isQuarteredType) {
          if (sup.name?.includes("2Q")) {
            quarterSuffix = " 2Q";
          } else {
            quarterSuffix = " 1Q";
          }
        }

        paymentsRaw.push({
          id: sup.id,
          month: null,
          amount: sup.amount,
          status: sup.status,
          type: sup.type,
          quotaNumber: null,
          description: `${t("supply_desc")} - ${getSupplyName(
            sup.type
          )}${quarterSuffix}`,
          supplyLabel: `${SUPPLY_TYPE_LABELS[sup.type] || sup.type}`,
          paid: statusFilter === "COMPLETED",
          orderType: sup.leaseOrderType,
          order: matchedOrder,
          paymentType: "SUPPLY",
          _source: "supply",
          _quarter: quarterSuffix.trim(),
        });
      }

      const groupedByLease = new Map();

      for (const payment of paymentsRaw) {
        const leaseId = payment.order?.id;
        if (!leaseId) continue;
        if (!groupedByLease.has(leaseId)) {
          groupedByLease.set(leaseId, []);
        }
        groupedByLease.get(leaseId).push(payment);
      }

      const allPaymentsSorted = [];

      for (const [leaseId, payments] of groupedByLease.entries()) {
        const lease = payments[0].order;
        const start = new Date(lease.startDate);
        const end = new Date(lease.endDate);
        const months =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());

        if (months <= 6) {
          const fixedOrder = [
            "DEPOSIT",
            "AGENCY_FEES",
            "GENERAL_SUPPLIES",
            "INTERNET",
            "RESERVATION",
            "MONTHLY",
            "CLEANUP",
            "MAINTENANCE",
            "OTHERS",
          ];

          payments.sort((a, b) => {
            const ia = fixedOrder.indexOf(a.type);
            const ib = fixedOrder.indexOf(b.type);
            return ia - ib;
          });

          allPaymentsSorted.push(...payments);
          continue;
        }

        const byType = (type, q = null) =>
          payments.filter(
            (p) => p.type === type && (q ? p._quarter === q : true)
          );

        const monthly = payments.filter((p) => p.type === "MONTHLY");
        const half = Math.ceil(monthly.length / 2);
        const monthly1 = monthly
          .slice(0, half)
          .sort((a, b) => a.quotaNumber - b.quotaNumber);
        const monthly2 = monthly
          .slice(half)
          .sort((a, b) => a.quotaNumber - b.quotaNumber);

        const ordered = [
          ...byType("DEPOSIT"),
          ...byType("AGENCY_FEES"),
          ...byType("GENERAL_SUPPLIES", "1Q"),
          ...byType("INTERNET", "1Q"),
          ...byType("RESERVATION"),
          ...monthly1,
          ...byType("GENERAL_SUPPLIES", "2Q"),
          ...byType("INTERNET", "2Q"),
          ...monthly2,
          ...byType("CLEANUP"),
          ...byType("MAINTENANCE"),
          ...byType("OTHERS"),
        ];

        allPaymentsSorted.push(...ordered);
      }

      return allPaymentsSorted;
    };

    setPaymentsToShow({
      pending: processPayments("PENDING"),
      completed: processPayments("COMPLETED"),
    });
  }, [state.user, t, t_supply]);

  const groupPaymentsBySerialAndLeaseOrder = (payments) => {
    return payments.reduce((groups, payment) => {
      const serial = payment.order?.room?.serial || "Sin Orden";
      const leaseOrder = payment.order;

      if (!serial || !leaseOrder) return groups;

      const leaseKey = `${formatDateToDDMMYYYY(
        leaseOrder.startDate
      )} - ${formatDateToDDMMYYYY(leaseOrder.endDate)}`;

      if (!groups[serial]) {
        groups[serial] = {};
      }

      if (!groups[serial][leaseKey]) {
        groups[serial][leaseKey] = [];
      }

      groups[serial][leaseKey].push(payment);
      return groups;
    }, {});
  };

  const handlePaymentClick = async (payment) => {
    if (payment.paid) {
      if (["RESERVATION", "MONTHLY"].includes(payment.type)) {
        await downloadBillPDF(payment, state.user, "monthly_or_reservation");
      } else {
        await downloadBillPDF(payment, state.user, "supply");
      }
    } else {
      setSelectedPayment(payment);
      setShowModal(true);
    }
  };
  return (
    <div className="w-full flex flex-col items-center p-6 bg-white">
      <div className="w-full max-w-screen-xl">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Pagos</h1>

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

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4">
            {paymentsToShow[selectedTab]?.length > 0 ? (
              Object.entries(
                groupPaymentsBySerialAndLeaseOrder(paymentsToShow[selectedTab])
              ).map(([serial, leaseOrders]) => (
                <div
                  key={serial}
                  className="mb-6 border grid place-items-center">
                  <h2 className="text-sm text-[#440cac] p-2 font-bold w-full border-b">
                    Habitación: {serial}
                  </h2>

                  {Object.entries(leaseOrders).map(([leaseKey, payments]) => (
                    <div
                      key={leaseKey}
                      className="p-2 bg-white w-full border-t">
                      <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Periodo: {leaseKey}
                      </h3>
                      {payments.map((payment, index) => {
                        const { bg, icon } = getStatusStyles(
                          payment.status,
                          payment.paid
                        );
                        return (
                          <button
                            key={index}
                            onClick={() => handlePaymentClick(payment)}
                            className="w-full flex justify-between items-center p-4 bg-helloflatmate rounded-lg border border-gray-200 hover:shadow-lg transition-all mb-3">
                            <div className="flex items-center gap-4">
                              {icon}
                              <h3 className="text-lg font-medium text-gray-800">
                                {payment.description}
                              </h3>
                            </div>
                            <span
                              className={`px-4 py-1 text-sm font-bold rounded-full ${bg}`}>
                              {payment.paid
                                ? t("paid")
                                : t(`status.${payment.status.toLowerCase()}`)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">{t("not_pend_pay")}</p>
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

const downloadBillPDF = async (payment, user, type) => {
  const toastId = toast.loading("Procesando...");
  try {
    if (!user) {
      toast.info("Debe iniciar sesión antes de descargar la factura.", {
        id: toastId,
      });
      return;
    }

    const requiredFields = [
      "name",
      "lastName",
      "idNum",
      "street",
      "streetNumber",
      "city",
      "postalCode",
      "phone",
      "email",
    ];
    const missingFields = requiredFields.filter((field) => !user[field]);

    if (missingFields.length > 0) {
      toast.info(
        `Debes completar la información de tu perfil para poder descargar la factura.`,
        {
          description: `¡Dirígete a 'Perfil' para hacerlo!`,
          id: toastId,
        }
      );
      return;
    }

    const pdfRes = await axios.post(
      "/api/payment/create_bill?type=" + type,
      {
        userId: user.id,
        paymentId: payment.id,
      },
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([pdfRes.data], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Factura_${payment.id}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("¡Factura descargada!", { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error("Hubo un problema al generar la factura.", {
      id: toastId,
    });
  }
};
