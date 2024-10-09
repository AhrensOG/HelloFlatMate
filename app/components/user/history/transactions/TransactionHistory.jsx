import NavBar from "@/app/components/nav_bar/NavBar";
import NavBarHistory from "../NavBarHistory";
import TransactionCardHistory from "./TransactionCardHistory";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import { v4 as uuidv4 } from "uuid"; // Importar uuid para generar identificadores únicos

export default function TransactionHistory({ redirect }) {
  const { state } = useContext(Context);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Setear el estado local con los pagos del usuario
    if (state.user?.payments) {
      // Añadir un identificador único a cada pago si no existe
      const paymentsWithId = state.user.payments.map((payment) => ({
        ...payment,
        uniqueKey: uuidv4(), // Generar un UUID único para cada pago
      }));
      setPayments(paymentsWithId);
    }
  }, [state.user]);

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
            <h1 className="text-xl font-bold">Transacciones</h1>
          </div>
        </div>
        <main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 py-4 mx-4"
        >
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TransactionCardHistory
                key={`mobile-${payment.uniqueKey}`} // Prefijo para diferenciar en móvil
                tittle={
                  payment.type === "RESERVATION" ? "Reserva" : "Pago Renta"
                }
                price={payment.amount}
                date={new Date(payment.date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                typeRoom={payment.paymentableType}
                status={payment.status} // Pasar el estado del pago
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay transacciones disponibles.
            </p>
          )}
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
            <h1 className="text-xl font-bold">Transacciones</h1>
          </div>
        </div>
        <div className="grow flex w-full justify-center items-start">
          <main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 py-4 mx-4 w-full max-w-screen-lg"
          >
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TransactionCardHistory
                  key={`desktop-${payment.uniqueKey}`} // Prefijo para diferenciar en escritorio
                  tittle={
                    payment.type === "RESERVATION" ? "Reserva" : "Pago Renta"
                  }
                  price={payment.amount}
                  date={new Date(payment.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  typeRoom={payment.paymentableType}
                  status={payment.status} // Pasar el estado del pago
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No hay transacciones disponibles.
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
