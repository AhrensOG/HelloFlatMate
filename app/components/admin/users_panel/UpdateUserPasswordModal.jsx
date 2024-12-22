import { useState } from "react";
import { toast } from "sonner"; // Para mostrar mensajes de éxito/error
import axios from "axios"; // Asegúrate de tener axios instalado

export default function UpdateUserPasswordModal({ onClose, userId }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/admin/user/update`, {
        userId,
        newPassword: password,
      });
      toast.success("Contraseña actualizada con éxito."); // Mensaje de éxito
      setError(null); // Limpiar errores
      onClose(); // Cerrar el modal
    } catch (err) {
      // Manejo de errores
      if (err.response && err.response.data) {
        setError(err.response.data.error); // Mostrar el error desde el backend
        toast.error(err.response.data.error);
      } else {
        setError("Error al actualizar la contraseña. Inténtalo nuevamente.");
        toast.error("Error al actualizar la contraseña. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Actualizar contraseña</h2>
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la nueva contraseña"
              className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-7 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
