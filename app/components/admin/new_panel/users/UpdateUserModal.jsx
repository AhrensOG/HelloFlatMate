import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Formik, Form, Field } from "formik";

export default function UpdateUserModal({ onClose, user }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdateUser = async (values) => {
    const toastId = toast.loading("Actualizando...");
    try {
      await axios.patch(`/api/admin/user/update`, {
        userId: user.id,
        ...values,
      });
      toast.success("¡Datos actualizados con éxito!", { id: toastId });
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Error al actualizar los datos. Inténtalo nuevamente.";
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
            password: "",
          }}
          onSubmit={handleUpdateUser}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-4">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Ingrese el apellido"
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Contraseña */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nueva contraseña
                </label>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese la nueva contraseña"
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
