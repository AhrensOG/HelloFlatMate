import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    buttonContainer: "flex justify-end",
    saveButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 text-sm",
    cancelButton: "bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm",
    radioGroup: "flex items-center space-x-4",
    radioLabel: "inline-flex items-center",
    radioInput: "form-radio h-5 w-5 text-blue-500",
    tagContainer: "flex flex-wrap gap-2 mt-2",
    tag: "bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1",
    tagRemoveButton: "cursor-pointer",
};

const validationSchema = Yup.object().shape({
    floor: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    door: Yup.string().nullable(),
    price: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    name: Yup.string().nullable(),
});

export default function RoomEditModal({ isOpen, onClose, data, onSave }) {
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState(data?.tags || []);

    const formik = useFormik({
        initialValues: {
            price: data?.price || "",
            name: data?.name || "",
            isActive: data?.isActive,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave({ ...data, ...values });
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div className={modalStyles.overlay}>
            <div className={modalStyles.overlayBackground} onClick={onClose} />
            <div className={modalStyles.modalContainer}>
                <button onClick={onClose} className={modalStyles.closeButton}>
                    X
                </button>
                <h2 className={modalStyles.title}>Editar Habitación</h2>

                <form onSubmit={formik.handleSubmit} className={modalStyles.form}>
                    {/* Input para price */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="price" className={modalStyles.label}>
                            Precio:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            className={`${modalStyles.input} ${formik.touched.price && formik.errors.price ? "border-red-500" : ""}`}
                        />
                        {formik.touched.price && formik.errors.price && <div className={modalStyles.error}>{formik.errors.price}</div>}
                    </div>
                    {/* Input para name */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="name" className={modalStyles.label}>
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={`${modalStyles.input} ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
                        />
                        {formik.touched.name && formik.errors.name && <div className={modalStyles.error}>{formik.errors.name}</div>}
                    </div>
                    {/* Checkbox para isActive */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="isActive" className={modalStyles.label}>
                            ¿Activo?:
                        </label>
                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.isActive}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span>Si</span>
                        </div>
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
