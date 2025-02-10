import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

const validationSchema = Yup.object().shape({
    startDate: Yup.date()
        .required("Fecha de inicio es requerida")
        .max(Yup.ref("endDate"), "La fecha de inicio no puede ser posterior a la fecha de fin"),
    endDate: Yup.date().required("Fecha de fin es requerida"),
});

export default function CreateRentalPeriodModal({ isOpen, onClose, onSave }) {
    const formik = useFormik({
        initialValues: {
            startDate: "",
            endDate: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave({ startDate: values.startDate, endDate: values.endDate });
            toast.success("Periodo de renta creado correctamente!");
            onClose(); // Cerrar el modal después de la creación exitosa
        },
    });

    const handleConfirm = () => {
        toast(
            <div className="flex items-center mx-auto gap-2 flex-col">
                <p>¿Estás seguro que deseas guardar los cambios?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            formik.submitForm();
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
                <h2 className="text-lg font-bold mb-4">Crear Periodo de Renta</h2>

                <form onSubmit={(e) => e.preventDefault()}>
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
                            type="button"
                            onClick={handleConfirm}
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
