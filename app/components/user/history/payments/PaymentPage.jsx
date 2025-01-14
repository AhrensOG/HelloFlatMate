import NavBar from "@/app/components/nav_bar/NavBar";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PayModal from "./PayModal";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

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
  "MONTHLY",
  "CLEANUP",
];

// Función para obtener el fondo de la etiqueta según el estado
const getStatusBgColor = (status, paid) => {
  if (paid) {
    return "bg-green-100 text-green-500"; // Pagado
  }
  switch (status) {
    case "PENDING":
      return "bg-blue-100 text-blue-500";
    case "APPROVED":
      return "bg-green-100 text-green-500";
    case "REJECTED":
      return "bg-yellow-100 text-yellow-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

// Función para obtener el ícono según el estado
const getStatusIcon = (status, paid) => {
  if (paid) {
    return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
  }
  switch (status) {
    case "PENDING":
      return <ExclamationCircleIcon className="w-6 h-6 text-blue-500" />;
    case "APPROVED":
      return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
    case "REJECTED":
      return <XCircleIcon className="w-6 h-6 text-yellow-500" />;
    default:
      return <ExclamationCircleIcon className="w-6 h-6 text-gray-500" />;
  }
};

// Función para calcular la cantidad de meses entre dos fechas
const calculateMonthsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth() + 1;
  return months;
};

const PaymentPage = ({ redirect, user }) => {
  const [paymentsToShow, setPaymentsToShow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations("user_payment_history");

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

  const getStatusDescription = (status) => {
    switch (status) {
      case "PENDING":
        return t("status.pending");
      case "APPROVED":
        return t("status.success");
      case "REJECTED":
        return t("status.rejected");
      default:
        return t("status.other");
    }
  };

  useEffect(() => {
    if (!user) return;

    const activeLeaseOrders = [...(user.leaseOrdersRoom || [])].filter(
      (order) => order.isActive
    );

    const monthlyPendingPayments = [];
    activeLeaseOrders.forEach((order) => {
      const startDate = new Date(order.startDate);
      const endDate = new Date(order.endDate);
      const totalMonths = calculateMonthsBetweenDates(startDate, endDate);

      const rentPayments =
        user.rentPayments?.filter(
          (payment) => payment.leaseOrderId === order.id
        ) || [];

      const paidQuotas = rentPayments.map((payment) => payment.quotaNumber);

      for (let i = 1; i <= totalMonths; i++) {
        if (!paidQuotas.includes(i)) {
          const pendingMonth = new Date(startDate);
          pendingMonth.setMonth(startDate.getMonth() + i - 1);

          monthlyPendingPayments.push({
            id: "",
            month: getMonthName(pendingMonth),
            amount: order.price,
            status: "PENDING",
            type: "MONTHLY",
            quotaNumber: i,
            description: `${t("desc")} - ${getMonthName(pendingMonth)}`,
            paid: false,
            orderType: "ROOM",
            order,
            paymentType: "MONTHLY",
          });
        }
      }
    });

    const pendingSupplies = (user.supplies || [])
      .filter((sup) => sup.status === "PENDING")
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
          description: `Pago - ${SUPPLY_TYPE_LABELS[sup.type] || sup.type}`,
          paid: sup.status !== "PENDING",
          orderType: sup.leaseOrderType,
          order: matchedOrder,
          paymentType: "SUPPLY",
        };
      });

    const allPending = [...monthlyPendingPayments, ...pendingSupplies];

    allPending.sort((a, b) => {
      const typeA = a.type || "";
      const typeB = b.type || "";

      const indexA = orderPriority.indexOf(typeA);
      const indexB = orderPriority.indexOf(typeB);

      if (indexA === -1 && indexB === -1) {
        return 0;
      } else if (indexA === -1) {
        return 1;
      } else if (indexB === -1) {
        return -1;
      }

      return indexA - indexB;
    });

    setPaymentsToShow(allPending);
  }, [user, t]);

  const handlePaymentClick = (payment) => {
    if (payment.paid) {
      toast.info(t("toast.info"));
    } else {
      setSelectedPayment(payment);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  return (
    <div className="w-full">
      <header>
        <NavBar />
      </header>
      <div className="w-full flex justify-center items-center p-6">
        <div className="w-full max-w-screen-xl flex items-center justify-center relative">
          <button
            onClick={redirect}
            type="button"
            className="w-6 h-6 opacity-90 ml-4 absolute left-0"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl font-bold">{t("pays")}</h1>
        </div>
      </div>
      <main className="flex w-full justify-center items-start px-4">
        <div className="flex flex-col gap-1 py-4 w-full max-w-screen-xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left flex items-center justify-between bg-white border rounded-lg shadow-md px-4 py-4 hover:shadow-lg transition"
          >
            <span className="text-lg font-semibold text-blue-700">
              Pagos pendientes
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDownIcon className="size-4" />
            </span>
          </button>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 mt-2">
              {paymentsToShow.length > 0 ? (
                paymentsToShow.map((payment, index) => {
                  // Revisar si hay order y si su room tiene serial
                  const hasRoomSerial =
                    payment.order?.room?.serial !== undefined;

                  return (
                    <button
                      key={index}
                      onClick={() => handlePaymentClick(payment)}
                      className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition cursor-pointer text-left"
                    >
                      <div className="flex flex-col gap-2 justify-between sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(payment.status, payment.paid)}
                          <div>
                            {payment.type === "MONTHLY" ? (
                              <h2 className="text-lg font-semibold">
                                {t("desc")} {payment.month}
                              </h2>
                            ) : (
                              <h2 className="text-lg font-semibold">
                                {SUPPLY_TYPE_LABELS[payment.type] ||
                                  payment.description ||
                                  payment.type}
                              </h2>
                            )}

                            {/* ID de pago (en monthly era ""), en supply es supply.id */}
                            <p className="text-sm text-gray-500">
                              {t("pay_id")} {"-"}
                            </p>

                            {/* Descripción final */}
                            <p className="text-sm">
                              {t("desc_pay")} {payment.description}
                            </p>

                            {/* Alojamiento (serial) si aplica */}
                            {hasRoomSerial && (
                              <p className="text-sm text-blue-700 font-medium">
                                Alojamiento: {payment.order.room.serial}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <span
                            className={`px-4 py-1 text-sm font-semibold rounded-full ${getStatusBgColor(
                              payment.status,
                              payment.paid
                            )}`}
                          >
                            {payment.paid
                              ? t("paid")
                              : getStatusDescription(payment.status)}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">{t("not_pend_pay")}</p>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* MODAL para pagos pendientes */}
      {showModal && selectedPayment && (
        <PayModal
          payment={selectedPayment}
          user={user}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PaymentPage;
