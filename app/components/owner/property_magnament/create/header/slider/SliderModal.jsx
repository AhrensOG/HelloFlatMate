import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function SliderModal({ data, setData, showModal }) {
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(data);

  useEffect(() => {
    setExistingImages(data);
  }, [data]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const saveData = async () => {
    const validFiles = files.filter((file) => file.size > 0);

    if (validFiles.length > 0) {
      try {
        const response = await uploadFiles(validFiles);
        if (response instanceof Error) {
          toast.error("Error al cargar archivos");
          return;
        }

        const newImages = response.map((file) => file.url);
        setExistingImages((prevImages) => {
          const updatedImages = [...prevImages, ...newImages];
          // Actualiza el estado con las imágenes nuevas
          setData(updatedImages);
          return updatedImages;
        });

        toast.success("Archivos cargados");
      } catch (error) {
        console.error("Error al cargar archivos:", error);
        toast.error("Error al cargar archivos");
        return; // Detén la ejecución si hay un error
      }
    } else {
      // Si no hay archivos válidos, actualiza directamente el estado
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
        <div className="w-full flex gap-1 flex-wrap justify-center items-center">
          {existingImages.length > 0 &&
            existingImages.map((file, index) => (
              <div key={index} className="w-20 h-20 p-2 relative rounded-md">
                <Image
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt="file"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
                <button
                  onClick={() => deleteImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          {files.length > 0 &&
            files.map((file, index) => (
              <div
                key={`new-${index}`}
                className="w-20 h-20 p-2 relative rounded-md"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="file"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
                <button
                  onClick={() => deleteImage(index + existingImages.length)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
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
