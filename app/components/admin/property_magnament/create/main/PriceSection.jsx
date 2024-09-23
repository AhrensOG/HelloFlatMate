import { useEffect, useState } from "react";

export default function PriceSection({ data, setData }) {
  const initialFormData = {
    price: 0,
    amountOwner: 0,
    amountHelloflatmate: 0,
    offer: 0,
    IVA: 0,
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
    <section className="w-full flex flex-col justify-between items-center gap-5">
      <div className="w-full flex flex-col justify-center gap-1 items-start">
        <label className="font-semibold text-[1.2rem]" htmlFor="price">
          Precio Propiedad:{" "}
        </label>
        <div className="flex flex-row w-full justify-between items-center border rounded-md p-2 gap-2">
          <span className="text-xl">€</span>
          <input
            className="w-full appearance-none outline-none h-full text-xl number-input-no-appearance"
            id="price"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center gap-1 items-start">
        <label
          className="font-semibold text-[1.2rem]"
          htmlFor="amountHelloflatmate"
        >
          Neto de helloflatmate:{" "}
        </label>
        <div className="flex flex-row w-full justify-between items-center border rounded-md p-2 gap-2">
          <span className="text-xl">€</span>
          <input
            className="w-full appearance-none outline-none h-full text-xl number-input-no-appearance"
            id="amountHelloflatmate"
            name="amountHelloflatmate"
            value={formData.amountHelloflatmate || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
        <span>
          Factura de helloflatmate con IVA : €
          {(parseInt(formData?.amountHelloflatmate) || 0) -
            (parseInt(formData?.amountHelloflatmate) * (formData.IVA / 100) ||
              0)}
        </span>
      </div>
      {/* <div className="w-full flex flex-wrap justify-between items-start m-3"></div> */}
      <div className="w-full flex flex-col justify-center gap-1 items-start">
        <label className="font-semibold text-[1.2rem]" htmlFor="IVA">
          IVA:{" "}
        </label>
        <div className="flex flex-row w-full justify-between items-center border rounded-md p-2 gap-2">
          <span className="text-lg">%</span>
          <input
            className="w-full appearance-none outline-none h-full text-xl number-input-no-appearance"
            id="IVA"
            name="IVA"
            value={formData.IVA || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
      </div>
      {/* <div className="w-full flex flex-col justify-center gap-1 items-start">
        <label className="font-semibold text-lg" htmlFor="offer">
          Offer:{" "}
        </label>
        <div className="flex flex-row w-full justify-between items-center border rounded-md p-2 gap-2">
          <span className="text-xl">%</span>
          <input
            className="w-full appearance-none outline-none h-full text-xl number-input-no-appearance"
            id="offer"
            name="offer"
            value={formData.offer || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
      </div> */}
      {/* <div className="w-full flex flex-wrap justify-between items-center m-3"></div> */}
      <div className="w-full flex flex-col justify-center gap-1 items-start m-3">
        <h2 className="font-semibold text-[1.2rem]">Neto Propietario: </h2>
        <h2 className="text-[1.2rem]">€ {formData.amountOwner || 0}</h2>
      </div>
    </section>
  );
}
