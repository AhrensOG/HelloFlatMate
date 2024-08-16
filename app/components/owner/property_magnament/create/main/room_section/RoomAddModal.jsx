import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";

export default function RoomAddModal({ data, setData, showModal, propertyId }) {
  const [dataRoom, setDataRoom] = useState({});

  const handleSubmit = async () => {
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

    const uploadedImage = await submitImage(dataRoom.image);
    const roomData = {
      ...dataRoom,
      image: uploadedImage,
      serial: dataRoom.serial,
      numberBeds: parseInt(dataRoom.numberBeds),
      couple: dataRoom.couple === "yes",
      bathroom: dataRoom.bathroom === "yes",
      propertyId,
    };

    array.push(roomData);
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
    setDataRoom({ ...dataRoom, [name]: value });
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
          <label className="block text-sm mb-1" htmlFor="name">
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
              value="yes"
              checked={dataRoom.bathroom === "yes"}
              onChange={handleRadioChange}
            />
            <label htmlFor="bathroom">Si</label>
          </div>
          <div className="flex  gap-2 px-3">
            <input
              type="radio"
              name="bathroom"
              value="no"
              checked={dataRoom.bathroom === "no"}
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
              checked={dataRoom.couple === "yes"}
              onChange={handleRadioChange}
            />
            <label htmlFor="couple">Si</label>
          </div>
          <div className="flex  gap-2 px-3">
            <input
              type="radio"
              name="couple"
              value="no"
              checked={dataRoom.couple === "no"}
              onChange={handleRadioChange}
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
            onClick={showModal}
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
