import { motion } from "framer-motion";
import AmenitiesSectionTemplate from "../AmenitiesSectionTemplate";

export default function AmenitiesModalEdit({ data, setData, showModal }) {
  const handleSave = () => {
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
        <h2 className="text-2xl mb-4">Editar Comodidades</h2>
        <div className="flex flex-col w-full">
          <AmenitiesSectionTemplate data={data} setData={setData} />
        </div>
        <div className="flex justify-end w-full mt-4">
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
