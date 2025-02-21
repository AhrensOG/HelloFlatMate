import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const modalStyles = {
    overlay: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",
    modalContainer: "relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto",
    closeButton: "absolute top-1 right-1 bg-gray-200 rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-gray-300",
    title: "text-lg font-semibold pb-2",
    input: "outline-none border p-2 w-full rounded",
    select: "outline-none border p-2 w-full rounded",
    buttonContainer: "flex justify-end gap-2 mt-4",
    saveButton: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600",
    cancelButton: "bg-gray-400 text-white p-2 rounded hover:bg-gray-500",
};

const validationSchema = Yup.object().shape({
    price: Yup.number().required("El precio es obligatorio.").positive("Debe ser un número positivo."),
    type: Yup.string().oneOf(["Supply", "Others"], "Selecciona una opción válida").required("El tipo es obligatorio."),
});

export default function EditConsumptionModal({ isOpen, onClose, consumption, update }) {
    if (!isOpen || !consumption) return null;

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Guardando...");
        try {
            const response = await axios.put(`/api/admin/consumptions`, {
                amount: values.price,
                type: values.type.toUpperCase(),
                id: consumption.id,
            });
            toast.success("Datos actualizados correctamente.", { id: toastId });
            if (response.status === 200) {
                update({ id: consumption.id, amount: values.price, type: values.type.toUpperCase() });
                onClose();
            }
        } catch (error) {
            toast.info("Error al actualizar los datos.", { id: toastId });
        }
    };

    return (
        <div className={modalStyles.overlay} onClick={onClose}>
            <div className={modalStyles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={modalStyles.closeButton}>
                    X
                </button>
                <h2 className={modalStyles.title}>Editar Consumo</h2>

                <Formik
                    initialValues={{ price: consumption.amount, type: consumption.type }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <label className="text-xs font-light">Usuario</label>
                                <input
                                    type="text"
                                    value={`${consumption.client.name} ${consumption.client.lastName}`}
                                    className={modalStyles.input}
                                    disabled
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Orden de Alquiler</label>
                                <input type="text" value={consumption.leaseOrderRoomId} className={modalStyles.input} disabled />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Precio</label>
                                <Field type="number" name="price" className={modalStyles.input} />
                                <ErrorMessage name="price" component="div" style={{ color: "red" }} />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Tipo</label>
                                <Field as="select" name="type" className={modalStyles.select}>
                                    <option value="Supply">Supply</option>
                                    <option value="Others">Others</option>
                                </Field>
                                <ErrorMessage name="type" component="div" style={{ color: "red" }} />
                            </div>

                            <div className={modalStyles.buttonContainer}>
                                <button type="button" className={modalStyles.cancelButton} onClick={onClose}>
                                    Cancelar
                                </button>
                                <button type="submit" className={modalStyles.saveButton}>
                                    Guardar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
