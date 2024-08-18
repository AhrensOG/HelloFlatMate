import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import ImageUploader from "@/app/components/drag-and-drop/ImageUploader";

export default function SliderModal({ data, setData, showModal }) {
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(data);

  useEffect(() => {
    setExistingImages(data);
  }, [data]);

  const saveData = async () => {
    const validFiles = files.filter((file) => file.size > 0);
    console.log(validFiles);

    if (validFiles.length > 0) {
      try {
        const response = await uploadFiles(validFiles);
        if (response instanceof Error) {
          toast.error("Error al cargar archivos" + response.message);
          return;
        }

        // Construimos nuevas imágenes con la estructura correcta
        const newImages = response.map((file, index) => ({
          id: existingImages.length + index,
          url: file.url,
        }));

        // Aseguramos que todas las imágenes tengan la estructura correcta
        const sanitizedPrevImages = existingImages.map((img) =>
          typeof img.url === "object" ? img.url : img
        );

        const updatedImages = [...sanitizedPrevImages, ...newImages];
        setExistingImages(updatedImages);
        setData(updatedImages);
        toast.success("Archivos cargados");
      } catch (error) {
        console.error("Error al cargar archivos:", error);
        toast.error("Error al cargar archivos");
      }
    } else {
      setData(existingImages);
    }
    showModal(false);
  };

  const deleteImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    setExistingImages((prevImages) => {
      const newExistingImages = prevImages.filter((_, i) => i !== index);
      return newExistingImages;
    });
  };

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white p-3 rounded-lg shadow-lg w-full m-3 overflow-auto h-[95%]">
        <h2 className="text-2xl mb-4">Archivos de Imágenes</h2>
        <ImageUploader setImages={setFiles} images={existingImages} />
        <div className="flex justify-between w-full">
          <button
            onClick={() => showModal(false)}
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
