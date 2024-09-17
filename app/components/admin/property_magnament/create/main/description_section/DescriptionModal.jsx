import { useState, useEffect } from "react";
import InputModal from "../../../shared/InputModal";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function DescriptionModal({ data, setData, showModal }) {
  const defaultPlaceholders = [
    "2 Habitaciones dobles, con decoración sencilla y armoniosa.",
    "El tamaño es de unos 11 - 12 m2 aproximadamente. Cuentan con un armario para organizar todo tu equipaje.",
    "Queremos resaltar que la mayoría del mobiliario es totalmente nuevo a estrenar.",
  ];

  const [items, setItems] = useState(data);

  const addItem = () => {
    setItems([...items, ""]);
  };

  const deleteItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const saveData = () => {
    const filteredItems = items.filter((item) => item.trim() !== "");
    if (filteredItems.length === 0) {
      return toast.info("Por favor, agrega al menos una descripción válida.");
    }
    setData(filteredItems);
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
        <h2 className="text-2xl mb-4">Descripción</h2>
        <div className="flex flex-col w-full max-h-[25rem] overflow-x-auto">
          <ul>
            {items.length > 0
              ? items.map((item, index) => (
                  <InputModal
                    key={index}
                    value={item}
                    placeholder={index < 4 ? defaultPlaceholders[index] : ""}
                    index={index}
                    onChange={(value) => handleItemChange(index, value)}
                  />
                ))
              : defaultPlaceholders.map((item, index) => (
                  <InputModal
                    key={index}
                    value={""}
                    placeholder={item}
                    index={index}
                    onChange={(value) => handleItemChange(index, value)}
                  />
                ))}
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={addItem}
            className=" text-black px-2 py-2 border border-[#0C1660] rounded-lg mt-3 hover:bg-[#0C1660] hover:text-white"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          <button
            onClick={deleteItem}
            className=" text-black px-2 py-2 border border-[#0C1660] rounded-lg mt-3 hover:bg-[#0C1660] hover:text-white"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              setData([]);
              showModal(false);
            }}
            className=" text-black px-4 py-2 border border-[#0C1660] rounded-lg mt-4"
          >
            Cerrar
          </button>
          <button
            onClick={saveData}
            className="bg-[#0C1660] text-white px-4 py-2 rounded-lg mt-4 ml-2"
          >
            Guardar
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
