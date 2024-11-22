import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PayModal = ({ payment, onClose }) => {
  const handlePayment = async () => {
    const data = {
      amount: payment.amount,
      type: payment.type,
      paymentableId:
        payment.orderType === "ROOM"
          ? payment.order?.roomId
          : payment.order?.propertyId,
      paymentableType: payment.orderType,
      clientId: payment.order?.clientId,
      leaseOrderId: payment.order?.id,
      leaseOrderType: payment.orderType,
      quotaNumber: payment.quotaNumber,
      propertyName:
        payment.orderType === "ROOM"
          ? payment.order?.room?.serial
          : payment.order?.property?.serial,
    };

    const toastId = toast.loading("Procesando el pago...");

    try {
      const res = await axios.post(
        "/api/stripe/create-monthly-checkout-session",
        data
      );
      const session = await res.data;
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success("Redirigiendo al sistema de pagos", { id: toastId });
    } catch (error) {
      toast.info("Ocurrió un error al intentar el pago", {
        id: toastId,
        description:
          "Intenta nuevamente más tarde o reporta el error por nuestro canal de soporte.",
      });
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 p-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-center text-blue-600 mb-4">
          <span className="font-bold">Detalles del Pago</span> <br />
          <span className="font-bold">{payment.month}</span>
        </h2>
        <div className="flex flex-col items-center mb-6 gap-2">
          <div className="relative w-full h-52">
            <Image
              src={
                payment.orderType === "ROOM"
                  ? payment.order?.room?.images[0]
                  : payment.order?.property?.images[0]
              }
              alt="Property/Room"
              fill
              className="object-cover object-center rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Mes: </span> {payment.month}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Monto: </span>
              {`€ ${payment.amount.toFixed(2)}`}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Descripción: </span>
              {payment.description}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Codigo de alojamiento: </span>
              {payment.orderType === "ROOM"
                ? payment.order?.room?.serial
                : payment.order?.property?.serial}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cerrar
          </button>
          <button
            onClick={() => handlePayment()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayModal;
