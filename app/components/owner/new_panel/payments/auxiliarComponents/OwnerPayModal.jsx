"use client";

import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const generateDsOrder = (id) => {
  const baseStr = String(id);
  const timePart = Date.now().toString().slice(-4);
  const randomDigit = Math.floor(Math.random() * 10).toString();
  let dsOrder = baseStr + timePart + randomDigit;
  return dsOrder.length > 12 ? dsOrder.slice(0, 12) : dsOrder;
};

const OwnerPayModal = ({ incidence, owner, onClose }) => {
  const t = useTranslations("owner_panel.payments_panel.pay_modal");

  const handlePayment = async () => {
    const dsOrder = generateDsOrder(incidence.id);
    const propertySerial = incidence.property?.serial;

    const body = {
      amount: incidence.amount * 100,
      order: dsOrder,
      paymentMetaData: {
        incidenceId: incidence.id,
        order: dsOrder,
        paymentType: "incidence",
        merchantName: `${incidence.title} - ${propertySerial}`,
        merchantDescription: `${
          incidence.description || ""
        } (${propertySerial} - ${owner.name} ${owner.lastName})`,
        merchantUrlOk: `/pages/owner/payments`,
        merchantUrlkO: `/pages/owner/payments`,
      },
    };

    const toastId = toast.loading(t("toast.loading"));

    try {
      const { data } = await axios.post("/api/redsys/checkout", body);
      if (data.error) throw new Error(data.error);

      toast.success(t("toast.success"), { id: toastId });

      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", data.redsysUrl);

      const hiddenInputs = {
        Ds_SignatureVersion: data.Ds_SignatureVersion,
        Ds_MerchantParameters: data.Ds_MerchantParameters,
        Ds_Signature: data.Ds_Signature,
      };

      for (const [name, value] of Object.entries(hiddenInputs)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error al iniciar el checkout:", error);
      toast.info(t("toast.error"), { id: toastId });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-2">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          ✖
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
          {t("title")}
          <br />
          <span className="text-blue-600 text-base">{incidence.title}</span>
        </h2>

        <div className="bg-gray-100 p-4 rounded-md shadow-sm text-sm text-gray-700 space-y-2">
          <p>
            <strong>{t("amount")}:</strong> {Number(incidence.amount).toFixed(2)} €
          </p>
          {incidence.description && (
            <p>
              <strong>{t("desc_1")}:</strong> {incidence.description}
            </p>
          )}
          <p>
            <strong>{t("room_code")}:</strong> {incidence.property?.serial}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400">
            {t("close")}
          </motion.button>

          <motion.button
            onClick={handlePayment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">
            {t("pay_now")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OwnerPayModal;
