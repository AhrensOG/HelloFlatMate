import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AddressModal({ data, setData, showModal, category }) {
  // Inicializa el estado con los datos proporcionados
  const [formData, setFormData] = useState(data);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el guardado de datos y valida que todos los campos estén completos
  const handleSave = () => {
    if (
      formData.city.trim() === "" ||
      formData.street.trim() === "" ||
      formData.streetNumber === null ||
      formData.postalCode.trim() === ""
    ) {
      return toast.info("Por favor, completa todos los campos.");
    }
    setData(formData);
    showModal(false);
  };

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white p-3 rounded-lg shadow-lg w-[17rem] lg:w-[25rem]">
        <h2 className="text-2xl mb-4">Dirección</h2>
        <div className="flex flex-col w-full space-y-4">
          <div>
            <label className="block text-sm mb-1">Ciudad:</label>
            <input
              type="text"
              name="city"
              value={formData.city || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Calle:</label>
            <input
              type="text"
              name="street"
              value={formData.street || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Número de Calle:</label>
            <input
              type="number"
              name="streetNumber"
              value={formData.streetNumber || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Piso (Opcional):</label>
            <input
              type="number"
              name="floor"
              value={formData.floor || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Puerta (Opcional):</label>
            <input
              type="text"
              name="door"
              value={formData.door || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Código Postal:</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => showModal(false)}
            className="text-black px-4 py-2 border border-[#0C1660] rounded-lg"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="bg-[#0C1660] text-white px-4 py-2 rounded-lg ml-2"
          >
            Guardar
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
