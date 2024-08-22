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

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Calcula el amountOwner en base a los valores actualizados
    updatedFormData.amountOwner =
      parseInt(updatedFormData.price) -
      parseInt(updatedFormData.amountHelloflatmate);

    // Actualiza formData y setData con los valores calculados
    setFormData(updatedFormData);
    setData((prevData) => ({
      ...prevData,
      ...updatedFormData,
    }));
  };

  return (
    <section className="w-full flex justify-between items-center flex-wrap gap-3">
      <div className="w-full flex gap-1 items-center">
        <label className="font-semibold text-xl" htmlFor="price">
          Precio:{" "}
        </label>
        <input
          className="w-full appearance-none outline-none h-full text-xl font-bold"
          id="price"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div className="w-full flex gap-1 items-center">
        <label className="font-semibold text-xl" htmlFor="amountHelloflatmate">
          Helloflatmate:{" "}
        </label>
        <input
          className="w-full appearance-none outline-none h-full text-xl font-bold"
          id="amountHelloflatmate"
          name="amountHelloflatmate"
          value={formData.amountHelloflatmate || ""}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div className="w-full flex gap-1 items-center">
        <h2 className="font-semibold text-xl">Dueño: </h2>
        <h2 className="font-semibold text-xl">{formData.amountOwner || 0}</h2>
      </div>
    </section>
  );
}
