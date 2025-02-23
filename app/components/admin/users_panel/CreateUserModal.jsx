import { useState } from "react";
import { toast } from "sonner"; // Para mostrar mensajes
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"; // Para solicitudes HTTP

export default function CreateUserModal({ action, reload, options_1 }) { 
    const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [options, setOptions] = useState(options_1);

    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            dni: "",
            description: "",
            email: "",
            password: "",
            rol: "CLIENT",
            IBAN: "",
            search: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Nombre es obligatorio"),
            lastName: Yup.string().required("Apellido es obligatorio"),
            email: Yup.string().email("Correo electrónico inválido").required("Correo electrónico es obligatorio"),
            password: Yup.string().required("Contraseña es obligatoria"),
            IBAN: Yup.string().when("rol", {
                is: "OWNER",
                then: Yup.string().required("IBAN es obligatorio para propietarios"),
            }),
        }),
        onSubmit: async (values) => {
            try {
                toast.promise(
                    async () => {
                        const payload = {
                            ...values,
                            properties: selectedProperties.map((prop) => prop.id),
                        };

                        const endpoint = values.rol === "OWNER" ? "/api/admin/user/create/owner" : "/api/admin/user/create";

                        const response = await axios.post(endpoint, payload);
                        return response.data.message; // Mensaje de éxito
                    },
                    {
                        loading: "Creando usuario...",
                        success: "Usuario creado correctamente",
                    }
                );
                action(false); // Cerrar modal
            } catch (err) {
                toast.info("Ocurrio un error al crear el usuario");
                throw err;
            }
        },
    });

    const handleSelectProperty = (property) => {
        if (!selectedProperties.includes(property)) {
            setSelectedProperties([...selectedProperties, property]);
        }
        formik.setFieldValue("search", ""); // Limpiar la búsqueda
    };

    const handleRemoveProperty = (property) => {
        setSelectedProperties(selectedProperties.filter((p) => p.id !== property.id));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Crear nuevo usuario</h2>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <input type="text" {...formik.getFieldProps("name")} placeholder="Nombre (obligatorio)" className="border p-2 rounded-md" />
                    {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}

                    <input type="text" {...formik.getFieldProps("lastName")} placeholder="Apellido (obligatorio)" className="border p-2 rounded-md" />
                    {formik.touched.lastName && formik.errors.lastName && <p className="text-red-500 text-sm">{formik.errors.lastName}</p>}

                    <input type="text" {...formik.getFieldProps("dni")} placeholder="DNI (opcional)" className="border p-2 rounded-md" />

                    <input
                        type="text"
                        {...formik.getFieldProps("description")}
                        placeholder="Descripción (opcional)"
                        className="border p-2 rounded-md"
                    />

                    <input type="email" {...formik.getFieldProps("email")} placeholder="Correo electrónico" className="border p-2 rounded-md" />
                    {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            placeholder="Contraseña"
                            className="border p-2 rounded-md w-full"
                        />
                        <button type="button" className="absolute right-2 top-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                        {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
                    </div>

                    <select {...formik.getFieldProps("rol")} className="border p-2 rounded-md">
                        <option value="ADMIN">Administrador</option>
                        <option value="CLIENT">Cliente</option>
                        <option value="OWNER">Propietario</option>
                    </select>

                    {formik.values.rol === "OWNER" && (
                        <>
                            <input type="text" {...formik.getFieldProps("IBAN")} placeholder="IBAN" className="border p-2 rounded-md" />
                            {formik.touched.IBAN && formik.errors.IBAN && <p className="text-red-500 text-sm">{formik.errors.IBAN}</p>}

                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    {...formik.getFieldProps("search")}
                                    placeholder="Buscar propiedades por serial..."
                                    className="border p-2 rounded-md w-full"
                                />
                                {formik.values.search.trim() && (
                                    <ul className="absolute mt-1 max-h-40 overflow-y-auto border bg-white rounded-md w-full z-10">
                                        {options
                                            .filter((option) => option.serial.toLowerCase().includes(formik.values.search.toLowerCase()))
                                            .map((option) => (
                                                <li
                                                    key={option.id}
                                                    onClick={() => handleSelectProperty(option)}
                                                    className="cursor-pointer hover:bg-gray-200 p-1"
                                                >
                                                    {option.serial}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 py-2">
                                {selectedProperties.map((property) => (
                                    <span
                                        key={property.id}
                                        onClick={() => handleRemoveProperty(property)}
                                        className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full cursor-pointer"
                                    >
                                        {property.serial} ✕
                                    </span>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-2">
                        <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => action(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Crear Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
