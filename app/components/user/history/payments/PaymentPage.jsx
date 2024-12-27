import NavBar from "@/app/components/nav_bar/NavBar";
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PayModal from "./PayModal";
import { useTranslations } from "next-intl";

// Función para obtener el fondo de la etiqueta según el estado
const getStatusBgColor = (status, paid) => {
    if (paid) {
        return "bg-green-100 text-green-500"; // Pagado
    } else {
        switch (status) {
            case "PENDING":
                return "bg-blue-100 text-blue-500"; // Pendiente
            case "APPROVED":
                return "bg-green-100 text-green-500"; // Aprobado
            case "REJECTED":
                return "bg-yellow-100 text-yellow-500"; // Rechazado
            default:
                return "bg-gray-100 text-gray-500"; // Desconocido
        }
    }
};

// Función para obtener el ícono según el estado
const getStatusIcon = (status, paid) => {
    if (paid) {
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />; // Pagado
    } else {
        switch (status) {
            case "PENDING":
                return <ExclamationCircleIcon className="w-6 h-6 text-blue-500" />; // Pendiente
            case "APPROVED":
                return <CheckCircleIcon className="w-6 h-6 text-green-500" />; // Aprobado
            case "REJECTED":
                return <XCircleIcon className="w-6 h-6 text-yellow-500" />; // Rechazado
            default:
                return <ExclamationCircleIcon className="w-6 h-6 text-gray-500" />; // Desconocido
        }
    }
};

const PaymentPage = ({ redirect, user }) => {
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

    // Función para calcular la cantidad de meses entre dos fechas
    const calculateMonthsBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth() + 1;
        return months;
    };

    // Función para obtener el estado descriptivo
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

    const [paymentsToShow, setPaymentsToShow] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const [selectedPayment, setSelectedPayment] = useState(null); // Información del pago seleccionado

    useEffect(() => {
        if (user) {
            const activeLeaseOrders = [
                // ...(user.leaseOrdersProperty || []),
                ...(user.leaseOrdersRoom || []),
            ].filter((order) => order.isActive);

            const allPayments = [];

            activeLeaseOrders.forEach((order) => {
                const startDate = new Date(order.startDate);
                const endDate = new Date(order.endDate);
                const totalMonths = calculateMonthsBetweenDates(startDate, endDate);

                const rentPayments = user.rentPayments?.filter((payment) => payment.leaseOrderId === order.id) || [];

                const paidQuotas = rentPayments.map((payment) => payment.quotaNumber);

                for (let i = 1; i <= totalMonths; i++) {
                    if (!paidQuotas.includes(i)) {
                        const pendingMonth = new Date(startDate);
                        pendingMonth.setMonth(startDate.getMonth() + i - 1);

                        allPayments.push({
                            order: order,
                            id: ``,
                            month: getMonthName(pendingMonth),
                            amount: order.price,
                            status: "PENDING",
                            type: "MONTHLY",
                            quotaNumber: i,
                            description: `${t("desc")} ${getMonthName(pendingMonth)}`,
                            paid: false,
                            orderType: order.hasOwnProperty("roomId") ? "ROOM" : "PROPERTY",
                        });
                    }
                }
            });

            allPayments.sort((a, b) => a.paid - b.paid || a.quotaNumber - b.quotaNumber);
            setPaymentsToShow(allPayments.filter((payment) => !payment.paid)); // Mostrar solo pagos pendientes
        }
    }, [user]);

    const handlePaymentClick = (payment) => {
        if (payment.paid) {
            toast.info(t("toast.info")); // Muestra un toast si el pago está realizado
        } else {
            setSelectedPayment(payment); // Establece el pago pendiente seleccionado
            setShowModal(true); // Abre el modal para pagos pendientes
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cierra el modal
        setSelectedPayment(null); // Limpia el pago seleccionado
    };

    return (
        <div className="w-full">
            <header>
                <NavBar />
            </header>
            <div className="w-full flex justify-center items-center p-6">
                <div className="w-full max-w-screen-xl flex items-center justify-center relative">
                    <button onClick={redirect} type="button" className="w-6 h-6 opacity-90 ml-4 absolute left-0">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold">{t("pays")}</h1>
                </div>
            </div>
            <main className="flex w-full justify-center items-start px-4">
                <div className="flex flex-col gap-4 py-4 w-full max-w-screen-xl">
                    {paymentsToShow.length > 0 ? (
                        paymentsToShow.map((payment, index) => (
                            <button
                                key={index}
                                onClick={() => handlePaymentClick(payment)} // Se agrega el onClick al botón
                                className="p-4 border rounded-lg shadow-md transition hover:shadow-lg bg-white shadow-amenity-template cursor-pointer"
                            >
                                <div className="flex flex-col gap-4 justify-between items-start sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-4">
                                        {getStatusIcon(payment.status, payment.paid)}
                                        <div className="flex flex-col items-start justify-center">
                                            <h2 className="text-lg font-semibold">
                                                {payment.type === "RESERVATION"
                                                    ? `${t("desc_res")} - ${payment.month}`
                                                    : `${t("desc")} ${payment.month}`}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {t("pay_id")} {payment.id}
                                            </p>
                                            <p className="text-sm">
                                                {t("desc_pay")} {payment.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span
                                            className={`px-4 py-1 text-sm font-semibold rounded-full ${getStatusBgColor(
                                                payment.status,
                                                payment.paid
                                            )}`}
                                        >
                                            {payment.paid ? t("paid") : getStatusDescription(payment.status)}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">{t("not_pend_pay")}</p>
                    )}
                </div>
            </main>

            {/* Modal para pagos pendientes */}
            {showModal && selectedPayment && <PayModal payment={selectedPayment} onClose={handleCloseModal} />}
        </div>
    );
};

export default PaymentPage;
