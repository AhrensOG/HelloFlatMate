import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

const modalStyles = {
    overlay: "fixed inset-0 flex items-center justify-center z-50",
    overlayBackground: "fixed inset-0 bg-black bg-opacity-50 z-40",
    modalContainer: "bg-white w-full max-w-md mx-auto rounded shadow-lg p-6 relative z-50 max-h-[80vh] overflow-y-auto sm:max-w-sm",
    closeButton: "absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300",
    title: "text-lg font-bold mb-4",
    form: "flex flex-col gap-4",
    inputGroup: "mb-2",
    label: "block text-gray-700 text-sm font-bold mb-1",
    input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm",
    error: "text-red-500 text-xs italic",
    buttonContainer: "flex justify-center",
    saveButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 text-sm",
    cancelButton: "bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm",
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("El name es requerido"),
    city: Yup.string().required("La city es requerida"),
    zone: Yup.string().required("La zone es requerida"),
    street: Yup.string().required("La calle es requerida"),
    streetNumber: Yup.string().required("El número de calle es requerido"),
    isActive: Yup.boolean(),
});

export default function EditPropertyModal({ onClose, data, onSave }) {
    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            city: data?.city || "",
            zone: data?.zone || "",
            isActive: Boolean(data?.isActive),
            street: data?.street || "",
            streetNumber: data?.streetNumber || "",
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => onSave({ id: data.id, ...values })
    });

    return (
        <div className={modalStyles.overlay}>
            <div className={modalStyles.overlayBackground} onClick={onClose} />
            <div className={modalStyles.modalContainer}>
                <button onClick={onClose} className={modalStyles.closeButton}>
                    X
                </button>
                <h2 className={modalStyles.title}>Editar Ubicación</h2>
                <form onSubmit={formik.handleSubmit} className={modalStyles.form}>
                    {Object.entries({ id: data?.id, serial: data?.serial }).map(([key, value]) => (
                        <div key={key} className={modalStyles.inputGroup}>
                            <label className={modalStyles.label}>{key.toUpperCase()}:</label>
                            <input type="text" value={value || "-"} className={modalStyles.input} readOnly />
                        </div>
                    ))}

                    {Object.entries({ name: "name", city: "city", zone: "zone", street: "Calle", streetNumber: "Número de calle" }).map(
                        ([field, label]) => (
                            <div key={field} className={modalStyles.inputGroup}>
                                <label className={modalStyles.label} htmlFor={field}>
                                    {label}:
                                </label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[field]}
                                    className={`${modalStyles.input} ${formik.touched[field] && formik.errors[field] ? "border-red-500" : ""}`}
                                />
                                {formik.touched[field] && formik.errors[field] && <div className={modalStyles.error}>{formik.errors[field]}</div>}
                            </div>
                        )
                    )}

                    <div className={`flex flex-col gap-2 ${modalStyles.inputGroup} `}>
                        <label className={modalStyles.label}>Esta Activo?</label>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formik.values.isActive}
                                onChange={formik.handleChange}
                                className="form-checkbox h-5 w-5 text-blue-500 ml-3"
                            />
                            {""} <p>Si</p>
                        </div>
                        {formik.touched.isActive && formik.errors.isActive && <div className={modalStyles.error}>{formik.errors.isActive}</div>}
                    </div>

                    <div className={modalStyles.buttonContainer}>
                        <button type="submit" className={modalStyles.saveButton}>
                            Guardar
                        </button>
                        <button type="button" onClick={onClose} className={modalStyles.cancelButton}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
