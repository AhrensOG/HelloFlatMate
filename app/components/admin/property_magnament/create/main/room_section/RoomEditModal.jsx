import { useState, useEffect } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";
import ImageUploader from "@/app/components/admin/drag-and-drop/ImageUploader";

export default function RoomEditModal({
  data,
  setData,
  showModal,
  selectedRoom,
  category,
}) {
  const [dataRoom, setDataRoom] = useState({});
  const [files, setFiles] = useState([]);
  const [initialImages, setInitialImages] = useState([]);

  useEffect(() => {
    if (selectedRoom) {
      setDataRoom(selectedRoom);
      setInitialImages(selectedRoom.images || []); // Cargar imágenes iniciales
    }
  }, [selectedRoom]);

  const uploadNewImages = async () => {
    const filesToUpload = files.filter((file) => file.fileData);
    const fileUrls = new Set(files.map((file) => file.url));
    const remainingImages = initialImages.filter((url) => fileUrls.has(url));

    if (filesToUpload.length > 0) {
      const uploadedImages = await handleFileUpload(filesToUpload);
      return [...remainingImages, ...uploadedImages];
    } else {
      return remainingImages;
    }
  };

  const handleFileUpload = async (filesToUpload) => {
    try {
      const response = await uploadFiles(
        filesToUpload.map((file) => file.fileData)
      );
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

  const isModified = (newData, originalData) => {
    const originalDataWithoutImage = { ...originalData };
    delete originalDataWithoutImage.image;
    const newDataWithoutImage = { ...newData };
    delete newDataWithoutImage.image;

    const isImageModified =
      newData.image instanceof File || newData.image !== originalData?.image;

    return (
      isImageModified ||
      JSON.stringify(originalDataWithoutImage) !==
        JSON.stringify(newDataWithoutImage)
    );
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setDataRoom({ ...dataRoom, [name]: value === "yes" });
  };

  const handleSubmit = async () => {
    if (!isModified(dataRoom, selectedRoom) && files.length === 0) {
      showModal();
      return;
    }
    let newData = { ...dataRoom };

    if (!dataRoom?.name) {
      return toast.error("Por favor, especifique un nombre");
    }
    if (!dataRoom?.numberBeds) {
      return toast.error("Por favor, especifique una cantidad de camas");
    }

    // Subir nuevas imágenes si hay
    const newImageUrls = await uploadNewImages();
    newData.images = newImageUrls;

    // Actualizar las URLs de las imágenes en dataRoom
    setDataRoom((prevDataRoom) => ({
      ...prevDataRoom,
      images: newImageUrls,
    }));

    setDataRoom((prevDataRoom) => ({
      ...prevDataRoom,
      amountOwner:
        parseInt(dataRoom.price) - parseInt(dataRoom.amountHelloflatmate),
    }));
    // Guardar los cambios en el array data
    const updatedRooms = data.map((room) => {
      if (room.temporaryId) {
        if (room.temporaryId === dataRoom.temporaryId) {
          return dataRoom;
        } else {
          return room;
        }
      } else {
        if (room.id === dataRoom.id) {
          return dataRoom;
        } else {
          return room;
        }
      }
    });

    try {
      await axios.put(`/api/admin/room?id=${dataRoom.id}`, newData);
      toast.success("Habitación editada");
      setData(updatedRooms);
      showModal(); // Cerrar el modal después de guardar
    } catch (err) {
      console.error(err);
      toast.error("Error al editar la habitación");
    }
  };

  return (
    <aside className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-3 rounded-lg shadow-lg w-full m-3 flex flex-col h-[95%] overflow-auto">
        <h2 className="text-2xl mb-4">Editar habitación</h2>
        <div>
          <label className="block text-sm mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={dataRoom?.name || ""}
            onChange={(event) =>
              setDataRoom({ ...dataRoom, name: event.target.value })
            }
            className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="serial">
            Serial
          </label>
          <input
            type="text"
            id="serial"
            name="serial"
            value={dataRoom?.serial || ""}
            onChange={(event) =>
              setDataRoom({ ...dataRoom, serial: event.target.value })
            }
            className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="numberBeds">
            Numero de camas
          </label>
          <input
            type="number"
            id="numberBeds"
            name="numberBeds"
            value={dataRoom?.numberBeds || ""}
            onChange={(event) =>
              setDataRoom({ ...dataRoom, numberBeds: event.target.value })
            }
            className="number-input-no-appearance appearance-none outline-none w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {(category === "HELLO_ROOM" || category === "HELLO_COLIVING") && (
          <>
            <div>
              <label
                className="block text-sm mb-1"
                htmlFor="amountHelloflatmate"
              >
                Precio Habitacion
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={dataRoom?.price || ""}
                onChange={(event) =>
                  setDataRoom({
                    ...dataRoom,
                    price: event.target.value,
                  })
                }
                className="number-input-no-appearance appearance-none outline-none w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                className="block text-sm mb-1"
                htmlFor="amountHelloflatmate"
              >
                Monto de Helloflatmate
              </label>
              <input
                type="number"
                id="amountHelloflatmate"
                name="amountHelloflatmate"
                value={dataRoom?.amountHelloflatmate || ""}
                onChange={(event) =>
                  setDataRoom({
                    ...dataRoom,
                    amountHelloflatmate: event.target.value,
                  })
                }
                className="number-input-no-appearance appearance-none outline-none w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <h3 className="block text-sm mb-1">Neto Propietario</h3>
              <p className="appearance-none outline-none w-full p-2 border border-gray-300 rounded">
                {(parseInt(dataRoom?.price) || 0) -
                  (parseInt(dataRoom?.amountHelloflatmate) || 0)}
              </p>
            </div>
          </>
        )}
        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          <h3 className="w-full">¿Tiene baños?</h3>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="bathroom"
              value="yes"
              checked={dataRoom.bathroom === true}
              onChange={handleRadioChange}
            />
            <label htmlFor="bathroom">Si</label>
          </div>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="bathroom"
              value="no"
              checked={dataRoom.bathroom === false}
              onChange={handleRadioChange}
            />
            <label htmlFor="bathroom">No</label>
          </div>
        </div>
        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          <h3 className="w-full">¿Es para pareja?</h3>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="couple"
              value="yes"
              checked={dataRoom.couple === true}
              onChange={handleRadioChange}
            />
            <label htmlFor="couple">Si</label>
          </div>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="couple"
              value="no"
              checked={dataRoom.couple === false}
              onChange={handleRadioChange}
            />
            <label htmlFor="couple">No</label>
          </div>
        </div>
        <div className="w-full">
          <h3 className="block text-sm mb-1">Imagenes</h3>
          <ImageUploader
            initialImages={initialImages}
            images={files}
            setImages={setFiles}
          />
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            className="text-black px-4 py-2 border border-[#0C1660] rounded-lg"
            type="button"
            onClick={() => showModal()}
          >
            Cancelar
          </button>
          <button
            className="bg-[#0C1660] text-white px-4 py-2 rounded-lg ml-2"
            type="button"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </aside>
  );
}
