import NavBar from "@/app/components/nav_bar/NavBar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import { v4 as uuidv4 } from "uuid"; // Importar uuid para generar identificadores únicos
import TransactionCardHistory from "./TransactionCardHistory";

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-blue-100 text-blue-800",
  REJECTED: "bg-red-100 text-red-800",
  PAID: "bg-green-100 text-green-800",
  NOT_PAID: "bg-gray-100 text-gray-800",
  CANCELED: "bg-red-200 text-red-800",
};

const SUPPLY_TYPES_TRANSLATIONS = {
  WATER: "Agua",
  GAS: "Gas",
  ELECTRICITY: "Electricidad",
  EXPENSES: "Gastos Comunes",
  INTERNET: "Internet",
  OTHERS: "Otros",
};

export default function TransactionHistory({ redirect }) {
  const { state } = useContext(Context);
  const [allPayments, setAllPayments] = useState({});

  useEffect(() => {
    if (state.user?.rentPayments && state.user?.supplies) {
      const rentPaymentsWithId = state.user.rentPayments.map((payment) => ({
        ...payment,
        uniqueKey: uuidv4(),
      }));
      const supplyPaymentsWithId = state.user.supplies.map((payment) => ({
        ...payment,
        uniqueKey: uuidv4(),
      }));

      setAllPayments({
        rentPayments: rentPaymentsWithId,
        supplies: supplyPaymentsWithId,
      });
    }
  }, [state.user]);
  console.log(allPayments);

  const renderPaymentStatus = (status) => {
    const colorClass = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
    let statusText = "";

    switch (status) {
      case "PENDING":
        statusText = "Pendiente";
        break;
      case "APPROVED":
        statusText = "Aprobado";
        break;
      case "REJECTED":
        statusText = "Rechazado";
        break;
      case "PAID":
        statusText = "Pagado";
        break;
      case "NOT_PAID":
        statusText = "No Pagado";
        break;
      case "CANCELED":
        statusText = "Cancelado";
        break;
      default:
        statusText = "Desconocido";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
      >
        {statusText}
      </span>
    );
  };

  const renderRentPayments = () => {
    const rentPayments = allPayments.rentPayments || [];
    const reservationPayments = rentPayments.filter(
      (payment) => payment.type === "RESERVATION"
    );
    const monthlyPayments = rentPayments.filter(
      (payment) => payment.type === "MONTHLY"
    );

    return (
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Pagos de Reserva
        </h2>
        <div className="grid gap-4 mt-4">
          {reservationPayments.length > 0 ? (
            reservationPayments.map((payment) => (
              <div
                key={`reservation-${payment.uniqueKey}`}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium">Reserva</h3>
                  {renderPaymentStatus(payment.status)}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(payment.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {payment.amount} €
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No hay pagos de reserva disponibles.
            </p>
          )}
        </div>

        <h2 className="text-lg font-semibold mt-6 flex items-center gap-2">
          Pagos Mensuales
        </h2>
        <div className="grid gap-4 mt-4">
          {monthlyPayments.length > 0 ? (
            monthlyPayments.map((payment) => (
              <div
                key={`monthly-${payment.uniqueKey}`}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium">
                    Pago Mensual - Nº: {payment.quotaNumber}
                  </h3>
                  {renderPaymentStatus(payment.status)}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(payment.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {payment.amount} €
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  ID: {payment.paymentId ? payment.paymentId : "-"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay pagos mensuales disponibles.</p>
          )}
        </div>
      </div>
    );
  };

  const renderSupplyPayments = () => {
    const supplies = allPayments.supplies || [];
    return (
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2 mt-6">
          Pagos de Suministros
        </h2>
        <div className="grid gap-4 mt-4">
          {supplies.length > 0 ? (
            supplies.map((payment) => (
              <div
                key={`supply-${payment.uniqueKey}`}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium">
                    {SUPPLY_TYPES_TRANSLATIONS[payment.type] || "Suministros"}
                  </h3>
                  {renderPaymentStatus(payment.status)}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(payment.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {payment.amount} €
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  ID: {payment.paymentId ? payment.paymentId : "-"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No hay pagos de suministros disponibles.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* MOBILE */}
      <div className="sm:hidden">
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
            <h1 className="text-xl font-bold">Mis finanzas</h1>
          </div>
        </div>
        <main className="flex flex-col gap-4 py-4 mx-4">
          {renderRentPayments()}
          {renderSupplyPayments()}
        </main>
      </div>

      {/* DESKTOP */}
      <div className="hidden h-screen w-full sm:block">
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
            <h1 className="text-xl font-bold">Mis finanzas</h1>
          </div>
        </div>
        <div className="grow flex w-full justify-center items-start">
          <main className="flex flex-col gap-4 py-4 mx-4 w-full max-w-screen-lg">
            {renderRentPayments()}
            {renderSupplyPayments()}
          </main>
        </div>
      </div>
    </div>
  );
}
