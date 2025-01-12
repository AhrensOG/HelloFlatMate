import { useState } from "react";
import { toast } from "sonner"; // Para mostrar mensajes de éxito/error
import axios from "axios"; // Asegúrate de tener axios instalado

export default function CreateUserModal({ action, reload, options_1 }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña
    const [nombre, setNombre] = useState(""); // Nuevo estado para nombre
    const [apellido, setApellido] = useState(""); // Nuevo estado para apellido
    const [dni, setDni] = useState(""); // Nuevo estado para DNI (opcional)
    const [rol, setRol] = useState("CLIENT"); // Estado para el rol seleccionado
    const [IBAN, setIBAN] = useState(""); // Campo adicional para OWNER
    const [description, setDescription] = useState(""); // Otro campo adicional (si es necesario)
    const [error, setError] = useState(null);

    // Estados para buscador de propiedades
    const [busqueda, setBusqueda] = useState("");
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [options, setOptions] = useState(options_1); // Opciones pasadas como prop

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            if (rol === "OWNER") {
                const response = await axios.post("/api/admin/user/create/owner", {
                    email,
                    password,
                    nombre,
                    apellido,
                    dni,
                    rol,
                    IBAN,
                    description,
                    properties: selectedProperties.map((prop) => prop.id), // Enviar IDs de propiedades seleccionadas
                });
            } else if (rol === "CLIENT") {
                const response = await axios.post("/api/admin/user/create", {
                    email,
                    password,
                    nombre,
                    apellido,
                    dni,
                    rol,
                    description,
                });
            } else if (rol === "ADMIN") {
                const response = await axios.post("/api/admin/user/create", {
                    email,
                    password,
                    nombre,
                    apellido,
                    dni,
                    rol,
                    description,
                });
            }
            toast.success(response.data.message); // Mensaje de éxito
            action(false); // Cerrar el modal
            setError(null); // Limpiar errores al crear usuario exitosamente
        } catch (err) {
            console.log(err);

            if (err.response && err.response.data) {
                setError(err.response.data.error);
                toast.info(err.response.data.error);
            } else {
                setError("Error al crear el usuario. Inténtalo nuevamente.");
                toast.info("Error al crear el usuario. Inténtalo nuevamente.");
            }
        }
    };

    const handleSelectProperty = (property) => {
        if (!selectedProperties.includes(property)) {
            setSelectedProperties([...selectedProperties, property]);
        }
        setBusqueda(""); // Limpiar la búsqueda después de seleccionar
    };

    const handleRemoveProperty = (property) => {
        setSelectedProperties(selectedProperties.filter((p) => p.id !== property.id));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Crear nuevo usuario</h2>
                <form
                    onSubmit={() => {
                        toast.promise(handleCreateUser, {
                            loading: "Creando usuario...",
                            success: "Usuario creado con exito",
                        });
                    }}
                    className="flex flex-col gap-4"
                >
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre (obligatorio)"
                        className="border p-2 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Apellido (obligatorio)"
                        className="border p-2 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder="DNI (opcional)"
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción (Opcional)"
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        className="border p-2 rounded-md"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            className="border p-2 rounded-md w-full"
                            required
                        />
                        <button type="button" className="absolute right-2 top-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>

                    <select value={rol} onChange={(e) => setRol(e.target.value)} className="border p-2 rounded-md">
                        <option value="ADMIN">ADMIN</option>
                        <option value="CLIENT">CLIENT</option>
                        <option value="OWNER">OWNER</option>
                    </select>

                    {/* Campos adicionales solo si el rol es OWNER */}
                    {rol === "OWNER" && (
                        <>
                            <input
                                type="text"
                                value={IBAN}
                                onChange={(e) => setIBAN(e.target.value)}
                                placeholder="IBAN"
                                className="border p-2 rounded-md"
                            />
                            {/* Buscador de propiedades */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar propiedades por serial..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="border p-2 rounded-md w-full appearance-none outline-none"
                                />
                                {busqueda.trim() && (
                                    <ul className="absolute mt-1 max-h-40 overflow-y-auto border bg-white rounded-md w-full z-10">
                                        {options
                                            .filter((option) => option.serial.toLowerCase().includes(busqueda.toLowerCase()))
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

                            {/* Opciones seleccionadas */}
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

                    {error && <p className="text-red-500 text-xs">{error}</p>}
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
