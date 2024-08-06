import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function FinalModal({ data, setData, showModal, action }) {
  // Inicializa el estado con los datos proporcionados
  const [formData, setFormData] = useState(
    data
      ? data
      : {
          price: null,
          size: null,
          category: null,
        }
  );

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el guardado de datos y valida que todos los campos estén completos
  const handleSave = async () => {
    if (
      formData.price === null ||
      formData.price === 0 ||
      formData.size === null ||
      formData.size === 0 ||
      formData.category === null ||
      formData.category === ""
    ) {
      return toast.info("Por favor, completa todos los campos.");
    }
    setData({ ...formData });
    console.log(formData);
    await action();
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
      <div className="bg-white p-3 rounded-lg shadow-lg w-[17rem]">
        <h2 className="text-2xl mb-4">Dirección</h2>
        <div className="flex flex-col w-full space-y-4">
          <div>
            <label htmlFor="price" className="block text-sm mb-1">
              Precio:
            </label>
            <input
              type="number"
              name="price"
              value={formData?.price || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm mb-1">
              Tamaño:
            </label>
            <input
              type="number"
              name="size"
              value={formData.size || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Solo numeros, la unidad de medida es el mt2"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm mb-1">
              Categoria:
            </label>
            <select
              name="category"
              id="category"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
              value={formData.category || ""}
            >
              <option value="HELLO_ROOM">HelloRoom</option>
              <option value="HELLO_STUDIO">HelloStudio</option>
              <option value="HELLO_COLIVING">HelloColiving</option>
            </select>
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
