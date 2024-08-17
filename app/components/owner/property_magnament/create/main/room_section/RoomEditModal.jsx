import { useState, useEffect } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";

export default function RoomEditModal({
  data,
  setData,
  showModal,
  selectedRoom,
}) {
  const [dataRoom, setDataRoom] = useState({});

  useEffect(() => {
    if (selectedRoom) {
      setDataRoom(selectedRoom); // Setea los datos de la habitación seleccionada al estado
    }
  }, [selectedRoom]);

  const handleSubmit = async () => {
    // Compara dataRoom con selectedRoom para ver si hubo cambios
    if (!isModified(dataRoom, selectedRoom)) {
      showModal(); // Cierra el modal sin hacer la petición
      return;
    }

    const array = [...data];

    if (!dataRoom?.name) {
      return toast.error("Por favor, especifique un nombre");
    }
    if (!dataRoom?.numberBeds) {
      return toast.error("Por favor, especifique una cantidad de camas");
    }
    if (!dataRoom?.image) {
      return toast.error("Por favor, agrega una imagen.");
    }

    // Solo sube la imagen si es un archivo (nueva imagen)
    if (dataRoom.image instanceof File) {
      const uploadedImage = await submitImage(dataRoom.image);
      dataRoom.image = uploadedImage;
    }

    if (selectedRoom) {
      // Edita la habitación existente
      const index = data.findIndex((room) => room === selectedRoom);
      if (index !== -1) {
        array[index] = dataRoom;
      }
    } else {
      // Añade una nueva habitación
      array.push(dataRoom);
    }

    try {
      const response = await axios.put(`/api/room?id=${dataRoom.id}`, dataRoom);
      console.log(response.data);
      toast.success("Habitación editada");
    } catch (err) {
      console.log(err);
      toast.error("Error al editar la habitación");
    }

    setData(array);
    showModal(); // Cierra el modal después de guardar
  };

  const submitImage = async (file) => {
    const response = await uploadFiles([file]);
    console.log(response);
    return response[0].url;
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setDataRoom({ ...dataRoom, [name]: value === "yes" });
  };

  // Función para comparar si hubo cambios en los datos
  const isModified = (newData, originalData) => {
    const originalDataWithoutImage = { ...originalData };
    delete originalDataWithoutImage.image; // Se elimina la imagen porque podría no ser un archivo
    const newDataWithoutImage = { ...newData };
    delete newDataWithoutImage.image;

    // Si las imágenes son URLs y no cambiaron, se consideran iguales
    const isImageModified =
      newData.image instanceof File || newData.image !== originalData?.image;

    // Compara los datos restantes
    return (
      isImageModified ||
      JSON.stringify(originalDataWithoutImage) !==
        JSON.stringify(newDataWithoutImage)
    );
  };

  return (
    <aside className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-3 rounded-lg shadow-lg w-[17rem] flex flex-col">
        <h2 className="text-2xl mb-4">Archivos de Imágenes</h2>
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
            className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          <h3 className="w-full">¿Tiene baños?</h3>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="bathroom"
              id="bathroom"
              value="yes"
              checked={dataRoom?.bathroom === true}
              onChange={handleRadioChange}
            />
            <label htmlFor="bathroom">Si</label>
          </div>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="bathroom"
              id="bathroom"
              value="no"
              onChange={handleRadioChange}
              checked={dataRoom?.bathroom === false}
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
              onChange={handleRadioChange}
              checked={dataRoom?.couple === true}
            />
            <label htmlFor="couple">Si</label>
          </div>
          <div className="flex  gap-2 px-3">
            <input
              type="radio"
              name="couple"
              value="no"
              onChange={handleRadioChange}
              checked={dataRoom?.couple === false}
            />
            <label htmlFor="couple">No</label>
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm mb-1" htmlFor="image">
            Imagen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            placeholder="Seleccione un archivo"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setDataRoom({ ...dataRoom, image: file });
              }
            }}
            className="mb-4 appearance-none outline-none border border-[#0C1660] rounded-lg p-2 w-full"
          />
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            className="text-black px-4 py-2 border border-[#0C1660] rounded-lg"
            type="button"
            onClick={() => {
              showModal();
              console.log(dataRoom);
            }}
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
