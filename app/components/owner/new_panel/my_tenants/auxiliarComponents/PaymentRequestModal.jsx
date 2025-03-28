"use client";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";

export default function PaymentRequestModal({
    onClose,
    clientName,
    clientId,
    roomSerial,
    leaseOrderId,
}) {
    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required("Importe requerido")
            .min(1, "Debe ser mayor a 0"),
        title: Yup.string()
            .required("Concepto requerido")
            .max(100, "Máximo 100 caracteres"),
    });

    const initialValues = {
        amount: "",
        title: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        const toastId = toast.loading("Solicitando pago...");

        try {
            await axios.post("/api/owner/new_panel/request_payment", {
                amount: values.amount,
                name: values.title,
                leaseOrderId,
                status: "PENDING",
                type: "OTHERS",
                userId: clientId,
            });
            toast.success("Solicitud enviada con éxito", {
                id: toastId,
                description:
                    "Recuerda actualizar la pagina para ver los cambios",
            });
            resetForm();
            onClose();
        } catch (error) {
            toast.info("Error al solicitar el pago", { id: toastId });
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-[#440cac]">
                        Solicitar pago
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4">
                            {/* Cliente */}
                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Inquilino
                                </label>
                                <input
                                    type="text"
                                    value={clientName}
                                    disabled
                                    className="w-full text-sm px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700"
                                />
                            </div>

                            {/* Room serial */}
                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Orden - Room
                                </label>
                                <input
                                    type="text"
                                    value={roomSerial}
                                    disabled
                                    className="w-full text-sm px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700"
                                />
                            </div>

                            {/* Importe */}
                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Importe (€)
                                </label>
                                <Field
                                    name="amount"
                                    type="number"
                                    className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#440cac]/50"
                                    placeholder="Ej: 120"
                                />
                                <ErrorMessage
                                    name="amount"
                                    component="p"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>

                            {/* Concepto */}
                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Concepto / título
                                </label>
                                <Field
                                    name="title"
                                    type="text"
                                    className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#440cac]/50"
                                    placeholder="Ej: Reparación lámpara"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="p"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>

                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#440cac] hover:bg-[#37108c] text-white text-sm font-medium px-4 py-2 rounded-md transition"
                                >
                                    Enviar solicitud
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </motion.div>
    );
}
