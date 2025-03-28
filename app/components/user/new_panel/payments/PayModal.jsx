"use client";

import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
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
    const t = useTranslations("user_payment_history.pay_modal");

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
                description:
                    "Intenta nuevamente o contacta con nuestro soporte.",
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-2">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200">
                    ✖
                </button>

                {/* Título */}
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
                    <span className="font-bold">{t("title")}</span> <br />
                    <span className="text-blue-600">
                        {" "}{payment.month || payment.supplyLabel}
                    </span>
                </h2>

                {/* Contenedor de información */}
                <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">{t("amount")}</span>
                        {" "}{`€ ${payment.amount.toFixed(2)}`}
                    </p>
                    {payment.paymentType === "MONTHLY" && (
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">{t("month")}</span>
                            {" "}{payment.month}
                        </p>
                    )}
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">{t("desc_1")}</span>
                        {" "}{payment.description}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">{t("room_code")}</span>
                        {" "}{payment.orderType === "ROOM"
                            ? payment.order?.room?.serial
                            : payment.order?.property?.serial}
                    </p>
                </div>

                {/* Botones */}
                <div className="flex justify-between mt-6">
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400 transition duration-200">
                        {t("close")}
                    </motion.button>
                    <motion.button
                        onClick={handlePayment}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200">
                        {t("pay_now")}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PayModal;
