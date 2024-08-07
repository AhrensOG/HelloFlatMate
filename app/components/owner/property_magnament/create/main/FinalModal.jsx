import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function FinalModal({ data, setData, showModal, action }) {
  // Estado inicial para formData
  const initialFormData = {
    price: null,
    size: null,
    category: null,
  };

  // Inicializa el estado con los datos proporcionados
  const [formData, setFormData] = useState(data || initialFormData);

  // Estado para los mensajes de error
  const [errors, setErrors] = useState({});

  // Actualiza formData cada vez que 'data' cambie
  useEffect(() => {
    setFormData(data || initialFormData);
  }, [data]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    console.log(data);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Valida el formulario y maneja el guardado de datos
  const handleSave = async () => {
    const newErrors = {};

    if (formData.price === null || formData.price === 0) {
      newErrors.price = "Por favor, ingresa un precio válido.";
    }
    if (formData.size === null || formData.size === 0) {
      newErrors.size = "Por favor, ingresa un tamaño válido.";
    }
    if (!formData.category) {
      newErrors.category = "Por favor, selecciona una categoría.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return toast.info("Por favor, completa todos los campos correctamente.");
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
              value={formData.price || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
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
              placeholder="Solo números, la unidad de medida es el mt2"
            />
            {errors.size && (
              <p className="text-red-500 text-xs mt-1">{errors.size}</p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm mb-1">
              Categoría:
            </label>
            <select
              name="category"
              id="category"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
              value={formData.category || ""}
            >
              <option value="">Selecciona una categoría</option>
              <option value="HELLO_ROOM">HelloRoom</option>
              <option value="HELLO_STUDIO">HelloStudio</option>
              <option value="HELLO_COLIVING">HelloColiving</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
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
