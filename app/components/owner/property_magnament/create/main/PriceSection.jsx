import { useEffect, useState } from "react";

export default function PriceSection({ data, setData }) {
  const initialFormData = {
    price: 0,
    amountOwner: 0,
    amountHelloflatmate: 0,
  };

  // Inicializa el estado con los datos proporcionados
  const [formData, setFormData] = useState(data || initialFormData);

  // Actualiza formData cada vez que 'data' cambie
  useEffect(() => {
    setFormData(data || initialFormData);
  }, [data]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      price:
        parseInt(formData.amountOwner) + parseInt(formData.amountHelloflatmate),
    });

    setData((prevData) => ({
      ...prevData,
      [name]: value,
      price:
        parseInt(formData.amountOwner) + parseInt(formData.amountHelloflatmate),
    }));
  };

  return (
    <section className="w-full flex justify-between items-center flex-wrap gap-3">
      <h2 className="font-bold text-[1.37rem] w-full">Precio</h2>
      <div className="w-5/12">
        <label htmlFor="price" className="block text-sm mb-1">
          Dueño:
        </label>
        <input
          type="number"
          name="amountOwner"
          value={formData.amountOwner || ""} // Asegúrate de que el valor no sea undefined
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-5/12">
        <label htmlFor="price" className="block text-sm mb-1">
          Helloflatmate:
        </label>
        <input
          type="number"
          name="amountHelloflatmate"
          value={formData.amountHelloflatmate || ""} // Asegúrate de que el valor no sea undefined
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full flex items-end py-2 gap-3">
        <h2 className="text-lg font-medium flex items-end h-full">
          Precio total:
        </h2>
        <p className="text-2xl border border-[#D1DEE5] p-2 rounded-lg px-3">
          {(parseInt(formData.amountOwner) || 0) +
            (parseInt(formData.amountHelloflatmate) || 0) || 0}
        </p>
      </div>
    </section>
  );
}
