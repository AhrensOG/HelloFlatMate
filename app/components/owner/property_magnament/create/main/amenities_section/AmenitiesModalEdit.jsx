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
      className="fixed w-full h-screen  bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="w-full max-w-72 h-[90vh] bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
        <h2 className="text-2xl mb-4 text-center">Editar Comodidades</h2>
        <div className="flex flex-col w-full">
          <AmenitiesSectionTemplate data={data} setData={setData} />
        </div>
        <div className="flex justify-center w-full mt-4">
          <button
            onClick={handleSave}
            className="w-full bg-[#0C1660] text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
