"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useTranslations } from "next-intl";

function generateDsOrder(leaseOrderId) {
  // Ejemplo sencillo: leaseOrderId + últimos 4 dígitos de timestamp + 1 dígito random
  const baseStr = String(leaseOrderId);
  const timePart = Date.now().toString().slice(-4);
  const randomDigit = Math.floor(Math.random() * 10).toString();
  let dsOrder = baseStr + timePart + randomDigit;

  // Limitar a 12 chars si deseas
  if (dsOrder.length > 12) {
    dsOrder = dsOrder.slice(0, 12);
  }
  return dsOrder;
}

const PayModal = ({ payment, user, onClose }) => {
  const handlePayment = async () => {
    const dsOrder = generateDsOrder(payment.order?.id);

    const propertyId = payment.order?.roomId;

    const propertySerial = payment.order?.room?.serial;

    let body;
    if (payment.paymentType === "MONTHLY") {
      body = {
        amount: payment.amount * 100,
        order: dsOrder,
        paymentMetaData: {
          paymentId: payment.id,
          order: dsOrder,
          paymentType: "monthly",
          paymentableId: propertyId,
          paymentableType: payment.orderType,
          clientId: payment.order?.clientId,
          leaseOrderId: payment.order?.id,
          leaseOrderType: payment.orderType,
          quotaNumber: payment.quotaNumber,
          amount: payment.amount,
          month: payment.month,
          propertySerial,
          merchantName: `${payment.title} - ${propertySerial}`,
          merchantDescription: `${payment.description} (${propertySerial} - ${user.name} ${user.lastName})`,
          merchantUrlOk: `/pages/user/success/${propertyId}?type=monthly`,
          merchantUrlkO: `/pages/user/history/payments`,
        },
      };
    } else if (payment.paymentType === "SUPPLY") {
      body = {
        amount: payment.amount * 100,
        order: dsOrder,
        paymentMetaData: {
          supplyId: payment.id,
          order: dsOrder,
          paymentType: "supply",
          paymentableId: propertyId,
          paymentableType: payment.orderType,
          clientId: payment.order?.clientId,
          leaseOrderId: payment.order?.id,
          leaseOrderType: payment.orderType,
          amount: payment.amount,
          propertySerial,
          merchantName: `${payment.description}`,
          merchantDescription: `${payment.description} (${propertySerial} - ${user.name} ${user.lastName})`,
          merchantUrlOk: `/pages/user/success/${propertyId}?type=supply`,
          merchantUrlkO: `/pages/user/history/payments`,
        },
      };
    } else {
      toast.info("Tipo de pago no reconocido", {
        description: "Intenta nuevamente o contacta con nuestro soporte.",
      });
      return;
    }

    const toastId = toast.loading("Procesando el pago...");

    try {
      // 3) Llamada a tu endpoint /api/redsys/checkout (o el que uses)
      const { data } = await axios.post("/api/redsys/checkout", body);
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Redirigiendo a Redsys...", { id: toastId });

      // 4) Crear un formulario oculto y hacer submit a Redsys
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", data.redsysUrl);

      // Inputs ocultos
      const inputVersion = document.createElement("input");
      inputVersion.type = "hidden";
      inputVersion.name = "Ds_SignatureVersion";
      inputVersion.value = data.Ds_SignatureVersion;
      form.appendChild(inputVersion);

      const inputParams = document.createElement("input");
      inputParams.type = "hidden";
      inputParams.name = "Ds_MerchantParameters";
      inputParams.value = data.Ds_MerchantParameters;
      form.appendChild(inputParams);

      const inputSignature = document.createElement("input");
      inputSignature.type = "hidden";
      inputSignature.name = "Ds_Signature";
      inputSignature.value = data.Ds_Signature;
      form.appendChild(inputSignature);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error al iniciar el checkout de Redsys:", error);
      toast.error("Ocurrió un error al intentar el pago", {
        id: toastId,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 p-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold text-center text-blue-600 mb-4">
          <span className="font-bold">Detalles del pago</span> <br />
          <span className="font-bold">{payment.month}</span>
        </h2>
        <div className="flex flex-col items-center mb-6 gap-2">
          {/* Imagen */}
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
          {/* Info del pago */}
          <div className="w-full flex flex-col justify-center items-start">
            {payment.paymentType === "MONTHLY" && (
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Mes: </span> {payment.month}
              </p>
            )}
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Monto: </span>
              {`€ ${payment.amount.toFixed(2)}`}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Descripción: </span>
              {payment.description}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Código de Alojamiento: </span>
              {payment.orderType === "ROOM"
                ? payment.order?.room?.serial
                : payment.order?.property?.serial}
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cerrar
          </button>
          <button
            onClick={handlePayment}
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
