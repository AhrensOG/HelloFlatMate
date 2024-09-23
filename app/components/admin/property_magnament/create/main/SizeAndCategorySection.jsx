import { useEffect, useState } from "react";

export default function SizeAndCategorySection({ data, setData }) {
  // Estado inicial para formData
  const initialFormData = {
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
    const { name, value } = e.target;

    // Actualiza el estado local del form
    setFormData({
      ...formData,
      [name]: value,
    });

    // También actualiza el estado en el componente padre
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="flex flex-col w-full space-y-4">
          <h2 className="font-bold text-[1.37rem]">Tamaño y categoría</h2>
          <div className="w-full">
            <label
              htmlFor="size"
              className="block text-base mb-1 font-semibold"
            >
              Tamaño:
            </label>
            <input
              type="number"
              name="size"
              value={formData.size || ""} // Asegúrate de que el valor no sea undefined
              onChange={handleChange}
              className="number-input-no-appearance w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Solo números (m²)"
            />
            {errors.size && (
              <p className="text-red-500 text-xs mt-1">{errors.size}</p>
            )}
          </div>
          <div className="w-full">
            <h3 className="text-[#000000CC] text-base  font-semibold">
              Categoría
            </h3>
            <p className="text-base border border-gray-300 p-2 font-medium">
              {data.category.toLowerCase().split("_").join("")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
