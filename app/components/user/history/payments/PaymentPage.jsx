import NavBar from "@/app/components/nav_bar/NavBar";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PayModal from "./PayModal";

// Función para obtener el nombre del mes en español
const getMonthName = (date) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
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

// Función para obtener el estado descriptivo
const getStatusDescription = (status) => {
  switch (status) {
    case "PENDING":
      return "Pendiente de pago";
    case "APPROVED":
      return "Pago aprobado";
    case "REJECTED":
      return "Pago rechazado";
    default:
      return "Desconocido";
  }
};

const PaymentPage = ({ redirect, user }) => {
  const [paymentsToShow, setPaymentsToShow] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [selectedPayment, setSelectedPayment] = useState(null); // Información del pago seleccionado

  useEffect(() => {
    if (user) {
      const activeLeaseOrders = [
        ...(user.leaseOrdersProperty || []),
        ...(user.leaseOrdersRoom || []),
      ].filter((order) => order.isActive);

      const allPayments = [];

      activeLeaseOrders.forEach((order) => {
        const startDate = new Date(order.startDate);
        const endDate = new Date(order.endDate);
        const totalMonths = calculateMonthsBetweenDates(startDate, endDate);

        const rentPayments =
          user.rentPayments?.filter(
            (payment) => payment.leaseOrderId === order.id
          ) || [];

        const paidQuotas = rentPayments.map((payment) => payment.quotaNumber);

        rentPayments.forEach((payment) => {
          const paymentMonth = new Date(startDate);
          paymentMonth.setMonth(startDate.getMonth() + payment.quotaNumber - 1);

          allPayments.push({
            id: payment.paymentId,
            month: getMonthName(paymentMonth),
            amount: payment.amount,
            status: payment.status,
            type: payment.type,
            quotaNumber: payment.quotaNumber,
            description: payment.description || "Pago realizado",
            paid: true,
            orderType: order.hasOwnProperty("roomId") ? "ROOM" : "PROPERTY",
          });
        });

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
              description: `Pago ${getMonthName(pendingMonth)}`,
              paid: false,
              orderType: order.hasOwnProperty("roomId") ? "ROOM" : "PROPERTY",
            });
          }
        }
      });

      allPayments.sort(
        (a, b) => a.paid - b.paid || a.quotaNumber - b.quotaNumber
      );
      setPaymentsToShow(allPayments);
    }
  }, [user]);

  const handlePaymentClick = (payment) => {
    if (payment.paid) {
      toast.info("¡Muy pronto podrás ver tu factura!"); // Muestra un toast si el pago está realizado
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
          <button
            onClick={redirect}
            type="button"
            className="w-6 h-6 opacity-90 ml-4 absolute left-0"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl font-bold">Pagos</h1>
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
                          ? `Pago (Reserva) - ${payment.month}`
                          : `Pago ${payment.month}`}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ID de Pago: {payment.id}
                      </p>
                      <p className="text-sm">
                        Descripción: {payment.description}
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
                      {payment.paid
                        ? "Pagado"
                        : getStatusDescription(payment.status)}
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-center">No hay pagos pendientes</p>
          )}
        </div>
      </main>

      {/* Modal para pagos pendientes */}
      {showModal && selectedPayment && (
        <PayModal payment={selectedPayment} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PaymentPage;
