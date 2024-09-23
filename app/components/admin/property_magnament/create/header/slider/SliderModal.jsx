import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import ImageUploader from "@/app/components/admin/drag-and-drop/ImageUploader";
import { deleteFilesFromURL } from "@/app/firebase/deleteFiles";

export default function SliderModal({
  initialImages = false,
  setNewImages,
  showModal,
}) {
  const [files, setFiles] = useState([]);

  const uploadNewImages = async () => {
    try {
      const filesToUpload = files
        .filter((file) => file.fileData)
        .map((file) => file.fileData);

      // Crear un set con las URLs actuales para comparación
      const fileUrls = new Set(files.map((file) => file.url));

      // Imágenes eliminadas (están en initialImages pero no en files)
      const deletedImages = initialImages.filter((url) => !fileUrls.has(url));

      // Imágenes restantes (siguen presentes en files)
      const remainingImages = initialImages.filter((url) => fileUrls.has(url));

      // Si hay imágenes eliminadas, eliminarlas de Firebase Storage
      if (deletedImages.length > 0) {
        await handleDeletedImages(deletedImages, remainingImages);
      }

      // Si hay nuevas imágenes, subirlas
      if (filesToUpload.length > 0) {
        const uploadedImages = await handleFileUpload(filesToUpload);
        setNewImages([...remainingImages, ...uploadedImages]);
      } else {
        // Si no hay nuevas imágenes, actualizar solo con las imágenes restantes
        setNewImages([...remainingImages]);
      }

      toast.success("Datos actualizados");
      return showModal(false);
    } catch (error) {
      console.error(
        "Error durante el proceso de carga/eliminación de imágenes:",
        error
      );
      toast.error("Error durante el proceso de carga/eliminación de imágenes");
    }
  };

  const handleDeletedImages = async (deletedImages, remainingImages) => {
    try {
      await deleteFilesFromURL(deletedImages);
      setNewImages([...remainingImages]);
    } catch (error) {
      console.error("Error al borrar archivos:", error);
      toast.error("Error al borrar archivos");
      throw error;
    }
  };

  const handleFileUpload = async (filesToUpload) => {
    try {
      const response = await uploadFiles(filesToUpload);
      if (response instanceof Error) {
        throw response;
      }
      return response.map((file) => file.url);
    } catch (error) {
      console.error("Error al cargar archivos:", error);
      toast.error("Error al cargar archivos");
      throw error;
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white p-3 rounded-lg shadow-lg w-full m-3 overflow-auto h-auto">
        <h2 className="text-2xl mb-4">Archivos de Imágenes</h2>
        <ImageUploader
          initialImages={initialImages}
          setImages={setFiles}
          images={files}
        />
        <div className="flex justify-between w-full">
          <button
            onClick={() => showModal(false)}
            className="text-black px-4 py-2 border border-[#0C1660] rounded-lg mt-4"
          >
            Cerrar
          </button>
          <button
            onClick={uploadNewImages}
            className="bg-[#0C1660] text-white px-4 py-2 rounded-lg mt-4 ml-2"
          >
            Guardar
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
