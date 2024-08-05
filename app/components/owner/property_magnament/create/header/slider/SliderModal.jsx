import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";

export default function SliderModal({ data, setData, showModal }) {
  const [files, setFiles] = useState(data);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const saveData = async () => {
    if (files.length === 0) {
      return toast.info("Por favor, agrega al menos un archivo válido.");
    }
    const response = await uploadFiles(files);
    if (response instanceof Error) {
      toast.error("Error al cargar archivos");
    } else {
      console.log(response);
      const images = response.map((file) => file.url);
      console.log(images);
      setData(images);
      showModal(false);
      toast.success("Archivos cargados");
    }
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
        <h2 className="text-2xl mb-4">Archivos de Imágenes</h2>
        <div className="flex flex-col w-full">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4 appearance-none outline-none border border-[#0C1660] rounded-lg p-2"
          />
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              showModal(false);
            }}
            className="text-black px-4 py-2 border border-[#0C1660] rounded-lg mt-4"
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
