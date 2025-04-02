"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";

const modalStyles = {
    overlay:
        "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",
    modalContainer:
        "relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto",
    closeButton:
        "absolute top-1 right-1 bg-gray-200 rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-gray-300",
    title: "text-lg font-semibold pb-2",
    input: "outline-none border p-2 w-full rounded",
    select: "outline-none border p-2 w-full rounded",
    fileInput: "outline-none border p-2 w-full rounded cursor-pointer",
    buttonContainer: "flex justify-end gap-2 mt-4",
    saveButton: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600",
    cancelButton: "bg-gray-400 text-white p-2 rounded hover:bg-gray-500",
    userList:
        "absolute z-10 w-full bg-white border rounded shadow-md max-h-40 overflow-y-auto",
    userItem: "p-2 cursor-pointer hover:bg-gray-100",
};

const validationSchema = Yup.object().shape({
    price: Yup.number()
        .required("El importe es obligatorio.")
        .positive("Debe ser un número positivo."),
});

export default function CreatePropertyConsumptionsModal({
    onClose,
    properties,
    mutate,
}) {
    const [searchValue, setSearchValue] = useState("");
    const [filteredProps, setFilteredProps] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (!value) return setFilteredProps([]);
        const results = properties.filter((p) =>
            (p.serial || "").toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProps(results);
    };

    const handleSelectProperty = (property) => {
        setSelectedProperty(property);
        setSearchValue(property.serial || `ID ${property.id}`);
        setFilteredProps([]);
    };

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Guardando...");
        try {
            let files = [];
            if (values.bill) {
                files = await uploadFiles([values.bill], "Consumos");
            }
            const body = {
                propertyId: selectedProperty.id,
                amount: values.price,
                type: values.type.toUpperCase(),
                url: files.length > 0 ? files[0].url : null,
                period: values.period,
                startDate: values.startDate,
                endDate: values.endDate,
            };

            await axios.post("/api/admin/consumptions/property", body);
            toast.success("Datos guardados correctamente.", { id: toastId });
            await mutate();
        } catch (error) {
            console.error(error);
            toast.info("Error al guardar los datos.", { id: toastId });
        }
    };

    return (
        <div className={modalStyles.overlay} onClick={onClose}>
            <div
                className={modalStyles.modalContainer}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className={modalStyles.closeButton}>
                    X
                </button>
                <h2 className={modalStyles.title}>
                    Crear Consumo por Propiedad
                </h2>

                <Formik
                    initialValues={{
                        price: "",
                        type: "",
                        period: "",
                        startDate: "",
                        endDate: "",
                        bill: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ setFieldValue }) => (
                        <Form>
                            {/* Buscar propiedad */}
                            <div className="mb-4 relative">
                                <label className="text-xs font-light">
                                    Buscar Propiedad
                                </label>
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={handleSearch}
                                    placeholder="Escribe el serial..."
                                    className={modalStyles.input}
                                />
                                {filteredProps.length > 0 && (
                                    <ul className={modalStyles.userList}>
                                        {filteredProps.map((property) => (
                                            <li
                                                key={property.id}
                                                className={modalStyles.userItem}
                                                onClick={() =>
                                                    handleSelectProperty(
                                                        property
                                                    )
                                                }
                                            >
                                                {property.serial ||
                                                    `ID ${property.id}`}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {!selectedProperty && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Debes seleccionar una propiedad
                                    </p>
                                )}
                            </div>

                            {/* Importe */}
                            <div className="mb-4">
                                <label className="text-xs font-light">
                                    Importe (€)
                                </label>
                                <Field
                                    type="number"
                                    name="price"
                                    className={modalStyles.input}
                                />
                                <ErrorMessage
                                    name="price"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Tipo */}
                            <div className="mb-4">
                                <label className="text-xs font-light">
                                    Tipo
                                </label>
                                <Field
                                    as="select"
                                    name="type"
                                    className={modalStyles.select}
                                >
                                    <option value="">Seleccionar tipo</option>
                                    <option value="INTERNET">Wifi</option>
                                    <option value="WATER">Agua</option>
                                    <option value="GAS">Gas</option>
                                    <option value="ELECTRICITY">
                                        Electricidad
                                    </option>
                                    <option value="OTHER">Otro</option>
                                </Field>
                                <ErrorMessage
                                    name="type"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Periodo */}
                            <div className="mb-4">
                                <label className="text-xs font-light">
                                    Periodo
                                </label>
                                <Field
                                    as="select"
                                    name="period"
                                    className={modalStyles.select}
                                >
                                    <option value="">
                                        Seleccionar periodo
                                    </option>
                                    <option value="1Q">1Q</option>
                                    <option value="2Q">2Q</option>
                                </Field>
                                <ErrorMessage
                                    name="period"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Fecha Desde */}
                            <div className="mb-4">
                                <label className="text-xs font-light">
                                    Desde
                                </label>
                                <Field
                                    type="date"
                                    name="startDate"
                                    className={modalStyles.input}
                                />
                                <ErrorMessage
                                    name="startDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Fecha Hasta */}
                            <div className="mb-4">
                                <label className="text-xs font-light">
                                    Hasta
                                </label>
                                <Field
                                    type="date"
                                    name="endDate"
                                    className={modalStyles.input}
                                />
                                <ErrorMessage
                                    name="endDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Factura */}
                            <div className="mb-4">
                                <label className="text-xs font-light">
                                    Factura
                                </label>
                                <input
                                    type="file"
                                    className={modalStyles.fileInput}
                                    onChange={(event) =>
                                        setFieldValue(
                                            "bill",
                                            event.currentTarget.files[0]
                                        )
                                    }
                                />
                            </div>

                            {/* Botones */}
                            <div className={modalStyles.buttonContainer}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={modalStyles.cancelButton}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={modalStyles.saveButton}
                                >
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
