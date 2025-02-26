import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function UpdateUserModal({ onClose, user }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleUpdateUser = async (values) => {
        const toastId = toast.loading("Actualizando...");
        try {
            await axios.patch(`/api/admin/user/update`, {
                userId: user.id,
                rol: user.role,
                ...values,
            });
            toast.success("¡Datos actualizados con éxito!", { id: toastId });
            onClose();
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Error al actualizar los datos. Inténtalo nuevamente.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Actualizar Usuario</h2>
                <Formik
                    initialValues={{
                        name: user.name || "",
                        lastName: user.lastName || "",
                        dni: user.idNum || "",
                        email: user.email || "",
                        password: "",
                        IBAN: user.IBAN || "",
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Nombre es obligatorio"),
                        lastName: Yup.string().required("Apellido es obligatorio"),
                        dni: Yup.string().optional(),
                        email: Yup.string().email("Correo electrónico inválido").optional(),
                        password: Yup.string().optional(),
                        IBAN: Yup.string().optional(),
                    })}
                    onSubmit={handleUpdateUser}
                >
                    {({ values }) => (
                        <Form className="flex flex-col gap-4">
                            {/* Nombre */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Ingrese el nombre"
                                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Apellido */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Apellido
                                </label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Ingrese el apellido"
                                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* DNI */}
                            <div>
                                <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                                    ID / Pasaporte
                                </label>
                                <Field
                                    id="dni"
                                    name="dni"
                                    autoComplete="new-password"
                                    placeholder="Ingrese el DNI o Pasaporte"
                                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Correo Electrónico */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    disabled={true}
                                    placeholder="Ingrese el correo electrónico"
                                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Contraseña */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Nueva contraseña
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingrese la nueva contraseña"
                                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>

                            {/* IBAN */}
                            {user.rol === "OWNER" && (
                                <div>
                                    <label htmlFor="IBAN" className="block text-sm font-medium text-gray-700">
                                        IBAN
                                    </label>
                                    <Field
                                        id="IBAN"
                                        name="IBAN"
                                        placeholder="Ingrese el IBAN"
                                        className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <button type="button" className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400" onClick={onClose}>
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Actualizar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
