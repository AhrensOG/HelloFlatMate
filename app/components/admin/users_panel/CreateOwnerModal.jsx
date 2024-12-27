import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function CreateOwnerModal({ options_1 }) {
    const [options, setOptions] = useState(options_1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptionsId, setSelectedOptionsId] = useState([]);

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellido: "",
            email: "",
            contraseña: "",
            dni: "",
            descripcion: "",
            busqueda: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Requerido"),
            apellido: Yup.string().required("Requerido"),
            email: Yup.string().email("Email inválido").required("Requerido"),
            contraseña: Yup.string().required("Requerido"),
            dni: Yup.string()
                .matches(/^[a-zA-Z0-9]+$/, "DNI/Pasaporte inválido")
                .required("Requerido"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    name: values.nombre,
                    lastName: values.apellido,
                    email: values.email,
                    password: values.contraseña,
                    dni: values.dni,
                    descripcion: values.descripcion || null,
                    properties: selectedOptionsId.map((id) => ({ id })),
                };

                const response = await axios.post("/api/admin/user/create/owner", payload);
                console.log("Éxito:", response.data);

                setIsModalOpen(false);
                resetForm();
                setSelectedOptions([]);
                setSelectedOptionsId([]);
            } catch (error) {
                console.error("Error al enviar el formulario:", error.response?.data || error.message);
            }
        },
    });

    const handleSelectOption = (option) => {
        if (!selectedOptions.includes(option.serial)) {
            setSelectedOptions([...selectedOptions, option.serial]);
            setSelectedOptionsId([...selectedOptionsId, option.id]);
        }
        formik.setFieldValue("busqueda", "");
    };

    const handleRemoveOption = (optionSerial) => {
        setSelectedOptions(selectedOptions.filter((o) => o !== optionSerial));
        setSelectedOptionsId(selectedOptionsId.filter((id, index) => selectedOptions[index] !== optionSerial));
    };

    return (
        <div>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setIsModalOpen(true)}>
                Crear Propietario
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-[1001]" onClick={(e) => e.stopPropagation()}>
                        {/* Botón de cierre */}
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setIsModalOpen(false)}>
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <form onSubmit={formik.handleSubmit} className="flex flex-col p-4">
                            {/* Campo Nombre */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    {...formik.getFieldProps("nombre")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {formik.touched.nombre && formik.errors.nombre && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.nombre}</div>
                                )}
                            </div>

                            {/* Campo Apellido */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    {...formik.getFieldProps("apellido")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {formik.touched.apellido && formik.errors.apellido && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.apellido}</div>
                                )}
                            </div>

                            {/* Campo Email */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...formik.getFieldProps("email")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            {/* Campo Contraseña */}
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    {...formik.getFieldProps("contraseña")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {formik.touched.contraseña && formik.errors.contraseña && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.contraseña}</div>
                                )}
                            </div>

                            {/* Campo DNI */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="DNI/Pasaporte"
                                    {...formik.getFieldProps("dni")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {formik.touched.dni && formik.errors.dni && <div className="text-red-500 text-sm mt-1">{formik.errors.dni}</div>}
                            </div>

                            {/* Campo Descripción */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Descripción (Opcional)"
                                    {...formik.getFieldProps("descripcion")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                            </div>
                            {/* Buscador */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    {...formik.getFieldProps("busqueda")}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {formik.values.busqueda.trim() && (
                                    <ul className="absolute mt-1 max-h-40 overflow-y-auto border bg-white rounded-md w-full z-10">
                                        {options
                                            .filter((option) => option.serial.toLowerCase().includes(formik.values.busqueda.toLowerCase().trim()))
                                            .map((option) => (
                                                <li
                                                    key={option.id}
                                                    onClick={() => handleSelectOption(option)}
                                                    className="cursor-pointer hover:bg-gray-200 p-1"
                                                >
                                                    {option.serial}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>

                            {/* Opciones seleccionadas */}
                            <div className="flex flex-wrap gap-2">
                                {selectedOptions.map((option, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleRemoveOption(option)}
                                        className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full cursor-pointer"
                                    >
                                        {option} ✕
                                    </span>
                                ))}
                            </div>
                            {/* Botones */}
                            <div className="flex gap-2 mt-4">
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
                                    Enviar
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white p-2 rounded-md w-full">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
