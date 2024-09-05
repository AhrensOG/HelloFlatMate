import { useState } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import ImageUploader from "@/app/components/admin/drag-and-drop/ImageUploader";
import { v4 as uuidv4 } from "uuid";

export default function RoomAddModal({
  data,
  setData,
  showModal,
  propertyId,
  category,
}) {
  const [dataRoom, setDataRoom] = useState({
    name: "",
    serial: "",
    numberBeds: "",
    bathroom: "no",
    couple: "no",
    price: "",
    amountHelloflatmate: "",
    IVA: "", // Añadir este campo para el IVA
  });

  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    // Validaciones previas
    if (!dataRoom?.name) return toast.error("Por favor, especifique un nombre");
    if (!dataRoom?.numberBeds)
      return toast.error("Por favor, especifique una cantidad de camas");
    if (images.length === 0)
      return toast.error("Por favor, agrega al menos una imagen.");

    // Sube las imágenes y obtén las URLs
    const uploadedImages = await submitImage(images);
    const uploadedUrls = uploadedImages.map((file) => file.url);

    let roomData;

    // Construir el objeto roomData dependiendo de la categoría
    if (category === "HELLO_ROOM" || category === "HELLO_COLIVING") {
      roomData = {
        ...dataRoom,
        temporaryId: uuidv4(),
        images: uploadedUrls,
        numberBeds: parseInt(dataRoom.numberBeds),
        couple: dataRoom.couple === "yes",
        bathroom: dataRoom.bathroom === "yes",
        propertyId,
      };
    }

    if (category === "HELLO_STUDIO" || category === "HELLO_LANDLORD") {
      roomData = {
        ...dataRoom,
        temporaryId: uuidv4(),
        images: uploadedUrls,
        numberBeds: parseInt(dataRoom.numberBeds),
        couple: dataRoom.couple === "yes",
        bathroom: dataRoom.bathroom === "yes",
        price: parseInt(dataRoom.price),
        amountHelloflatmate: parseInt(dataRoom.amountHelloflatmate),
        amountOwner:
          parseInt(dataRoom.price) - parseInt(dataRoom.amountHelloflatmate),
        IVA: parseInt(dataRoom.IVA),
        propertyId,
      };
    }

    setData([...data, roomData]); // Actualiza los datos globales
    showModal(); // Cierra el modal después de guardar
  };

  const submitImage = async (files) => {
    const filesFormatted = files.map((file) => file.fileData);
    const response = await uploadFiles(filesFormatted);
    return response;
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setDataRoom({ ...dataRoom, [name]: value });
  };

  return (
    <aside className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full m-5 flex flex-col gap-3 overflow-auto h-[95%]">
        <h2 className="text-2xl mb-4">Nueva Habitacion</h2>
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

        {/* Solo muestra precio y tarifa si es la categoría correcta */}
        {(category === "HELLO_ROOM" || category === "HELLO_COLIVING") && (
          <>
            <div>
              <label className="block text-sm mb-1" htmlFor="price">
                Precio Habitacion
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={dataRoom?.price || ""}
                onChange={(event) =>
                  setDataRoom({ ...dataRoom, price: event.target.value })
                }
                className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                className="block text-sm mb-1"
                htmlFor="amountHelloflatmate"
              >
                Tarifa Helloflatmate
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
                className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <h3 className="block text-sm mb-1">
                Tarifa Helloflatmate con IVA
              </h3>
              <p className="appearance-none outline-none w-full p-2 border border-gray-300 rounded">
                {(parseInt(dataRoom?.amountHelloflatmate) || 0) -
                  (parseInt(dataRoom?.amountHelloflatmate) *
                    (dataRoom.IVA / 100) || 0)}
              </p>
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="IVA">
                IVA (%)
              </label>
              <input
                type="number"
                id="IVA"
                name="IVA"
                value={dataRoom?.IVA || ""}
                onChange={(event) =>
                  setDataRoom({ ...dataRoom, IVA: event.target.value })
                }
                className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
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

        {/* Radio buttons para seleccionar si tiene baños */}
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
          <div className="flex gap-2 px-3">
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

        {/* Radio buttons para seleccionar si es para pareja */}
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
          <div className="flex gap-2 px-3">
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

        {/* Uploader de imágenes */}
        <div className="w-full">
          <ImageUploader setImages={setImages} images={images} />
        </div>

        {/* Botones para guardar o cancelar */}
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
            onClick={() => {
              toast.promise(handleSubmit(), {
                loading: "Cargando...",
                success: "Habitacion guardada",
                error: "Error al guardar la habitacion",
              });
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </aside>
  );
}
