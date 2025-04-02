import React from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { uploadFiles } from "@/app/firebase/uploadFiles";

const EditIncidenceModal = ({ onClose, incidence, mutate }) => {
    const handleSubmit = async (values) => {
        const toastId = toast.loading("Guardando cambios...");
        try {
            let files = [];
            if (values.bill) {
                files = await uploadFiles([values.bill], "Incidencias");
            }

            await axios.put(`/api/admin/incidences`, {
                ...values,
                url: files.length > 0 ? files[0].url : values.url,
            });
            await mutate();
            toast.success("Incidencia actualizada correctamente.", {
                id: toastId,
            });
            onClose();
        } catch (error) {
            console.log(error);
            toast.error("Error al actualizar la incidencia.", {
                id: toastId,
            });
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 bg-gray-200 rounded-full w-5 h-5 text-sm flex items-center justify-center"
                >
                    X
                </button>
                <h2 className="text-lg font-semibold pb-2">
                    Editar Incidencia
                </h2>

                <Formik
                    initialValues={{
                        id: incidence.id,
                        type: incidence.type || "",
                        title: incidence.title || "",
                        description: incidence.description || "",
                        amount: incidence.amount || "",
                        date: incidence.date ? incidence.date.slice(0, 10) : "",
                        url: incidence.url || "",
                        bill: null,
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-4">
                            {/* Propietario */}
                            <div>
                                <label className="text-xs font-light">
                                    Propietario
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={`${incidence.owner.name} ${incidence.owner.lastName}`}
                                    className="outline-none border p-2 w-full bg-gray-100"
                                />
                            </div>

                            {/* Propiedad */}
                            <div>
                                <label className="text-xs font-light">
                                    Propiedad
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={incidence.property.serial}
                                    className="outline-none border p-2 w-full bg-gray-100"
                                />
                            </div>

                            {/* Tipo */}
                            <div>
                                <label className="text-xs font-light">
                                    Tipo
                                </label>
                                <Field
                                    as="select"
                                    name="type"
                                    className="outline-none border p-2 w-full"
                                >
                                    <option value="">Seleccionar tipo</option>
                                    <option value="OTHER">Otros</option>
                                </Field>
                            </div>

                            {/* Título */}
                            <div>
                                <label className="text-xs font-light">
                                    Título
                                </label>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="Título de la incidencia"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="text-xs font-light">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Descripción de la incidencia"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Importe */}
                            <div>
                                <label className="text-xs font-light">
                                    Importe
                                </label>
                                <Field
                                    type="number"
                                    name="amount"
                                    placeholder="Importe"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Fecha */}
                            <div>
                                <label className="text-xs font-light">
                                    Fecha
                                </label>
                                <Field
                                    type="date"
                                    name="date"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* URL y File */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-light">
                                    Factura actual
                                </label>
                                {values.url ? (
                                    <Link
                                        href={values.url}
                                        target="_blank"
                                        className="text-xs text-blue-500 underline"
                                    >
                                        Ver factura actual
                                    </Link>
                                ) : (
                                    "Sin factura"
                                )}
                                <label className="text-xs font-light">
                                    Reemplazar factura
                                </label>
                                <input
                                    type="file"
                                    name="bill"
                                    className="outline-none border p-2 w-full"
                                    onChange={(event) =>
                                        setFieldValue(
                                            "bill",
                                            event.currentTarget.files[0]
                                        )
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 w-full"
                            >
                                Guardar Cambios
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditIncidenceModal;
