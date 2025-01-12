import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function CreateUserModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creando...");
    try {
      await axios.post("/api/admin/user/create", {
        email,
        password,
      });
      onClose();
      setError(null);
      toast.success("¡Usuario creado correctamente!", { id: toastId });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
        toast.info(err.response.data.error, { id: toastId });
      } else {
        setError("Error al crear el usuario. Inténtalo nuevamente.");
        toast.info("Error al crear el usuario. Inténtalo nuevamente.", {
          id: toastId,
        });
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
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={() => onClose()} // Cerrar el modal
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
