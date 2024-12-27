import { useState } from "react";
import { toast } from "sonner"; // Para mostrar mensajes de éxito/error
import axios from "axios"; // Asegúrate de tener axios instalado

export default function CreateUserModal({ action, reload }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña
    const [error, setError] = useState(null);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/admin/user/create", { email, password });
            toast.success(response.data.message); // Mensaje de éxito
            reload(); // Recargar datos de usuarios
            action(false); // Cerrar el modal
            setError(null); // Limpiar errores al crear usuario exitosamente
        } catch (err) {
            // Manejo de errores de Axios
            if (err.response && err.response.data) {
                setError(err.response.data.error); // Mostrar el error desde el backend
                toast.error(err.response.data.error); // Mostrar el mensaje de error
            } else {
                setError("Error al crear el usuario. Inténtalo nuevamente.");
                toast.error("Error al crear el usuario. Inténtalo nuevamente."); // Mensaje genérico de error
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Crear nuevo usuario</h2>
                <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
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
                            type={showPassword ? "text" : "password"} // Cambiar entre text y password
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
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded-md"
                            onClick={() => action(false)} // Cerrar el modal
                        >
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
