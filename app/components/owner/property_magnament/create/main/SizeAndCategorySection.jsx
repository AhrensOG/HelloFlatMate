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
          <h2 className="font-medium text-[#000000CC] text-base">
            Tamaño y Categoria
          </h2>
          <div className="w-full">
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
          <div className="w-full">
            <h3 className="font-medium text-[#000000CC] text-base">
              Categoria
            </h3>
            <p className="text-base border border-gray-300 p-2 font-medium">
              {data.category
                .toLowerCase()
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
