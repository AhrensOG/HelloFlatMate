import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

const validationSchema = Yup.object().shape({
    startDate: Yup.date()
        .required("Fecha de inicio es requerida")
        .max(Yup.ref("endDate"), "La fecha de inicio no puede ser posterior a la fecha de fin"),
    endDate: Yup.date().required("Fecha de fin es requerida"),
});

export default function RentalPeriodModal({ data, isOpen, onClose, onSave }) {
    const [initialStartDate, setInitialStartDate] = useState("");
    const [initialEndDate, setInitialEndDate] = useState("");

    useEffect(() => {
        if (data) {
            const formattedStartDate = formatDate(data.startDate);
            const formattedEndDate = formatDate(data.endDate);

            setInitialStartDate(formattedStartDate);
            setInitialEndDate(formattedEndDate);
        }
    }, [data]);

    const formatDate = (dateString) => {
        if (!dateString) return "";

        try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "";
        }
    };

    const formik = useFormik({
        initialValues: {
            startDate: initialStartDate,
            endDate: initialEndDate,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave({ id: data.id, startDate: values.startDate, endDate: values.endDate });
            toast.success("Periodo de renta guardado correctamente!");
        },
    });

    const handleConfirm = () => {
        toast(
            <div className="flex items-center mx-auto gap-2 flex-col">
                <p>¿Estás seguro que deseas guardar los cambios?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            formik.submitForm(); // Usa formik.submitForm() para disparar la validación y el envío
                            toast.dismiss();
                        }}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                        Sí
                    </button>
                    <button onClick={() => toast.dismiss()} className="bg-red-500 text-white px-2 py-1 rounded">
                        No
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
            <div className="bg-white w-full max-w-md mx-auto rounded shadow-lg p-6 relative z-50">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                >
                    X
                </button>
                <h2 className="text-lg font-bold mb-4">Periodo de Renta</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    {" "}
                    {/* Previene la recarga de la página */}
                    <div className="mb-4">
                        <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">
                            ID:
                        </label>
                        <input
                            type="text"
                            id="id"
                            value={data.id}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Fecha de Inicio:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startDate}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                formik.touched.startDate && formik.errors.startDate ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.startDate}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Fecha de Fin:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.endDate}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                formik.touched.endDate && formik.errors.endDate ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.endDate}</div>
                        ) : null}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button" // Cambiado a type="button"
                            onClick={handleConfirm} // Llama a handleConfirm
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
