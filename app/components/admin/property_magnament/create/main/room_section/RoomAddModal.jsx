import { useState } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import ImageUploader from "@/app/components/admin/drag-and-drop/ImageUploader";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import RentalPeriodTemplate from "../RentalPeriodTemplate";

export default function RoomAddModal({
  data,
  setData,
  showModal,
  propertyId,
  category,
  rentalPeriods
}) {
  const [dataRoom, setDataRoom] = useState({
    name: "",
    floor: "",
    door: "",
    serial: "",
    numberBeds: "",
    bathroom: "",
    couple: "",
    price: "0",
    amountHelloflatmate: "0",
    IVA: "0", // Añadir este campo para el IVA
    typology: "MIXED",
    tags: "",
    linkVideo: "",
    calendar: "SIMPLE",
  });

  const [images, setImages] = useState([]);
  const [rentalPeriodIds, setRentalPeriodIds] = useState([]); // Estado para manejar fechas y meses
  const [description, setDescription] = useState([{ text: "" }]); // Estado para manejar descripciones

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
    if (category === "HELLO_ROOM" || category === "HELLO_COLIVING" || category === "HELLO_LANDLORD" ) {
      roomData = {
        ...dataRoom,
        temporaryId: uuidv4(),
        images: uploadedUrls,
        numberBeds: parseInt(dataRoom.numberBeds),
        couple: dataRoom.couple === "yes",
        bathroom: dataRoom.bathroom === "yes",
        propertyId,
        rentalPeriods: rentalPeriodIds.rentalPeriodIds || [], // Agregar los periodos de alquiler
        description: description.map((desc) => desc.text), // Agregar las descripciones,
        typology: dataRoom.typology || "MIXED",
        tags: [dataRoom.tags],
        linkVideo: dataRoom.linkVideo,
      };
    }

    if (category === "HELLO_STUDIO") {
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
    setDataRoom({ ...dataRoom, [name]: value }); // Almacenar directamente "yes" o "no"
  };
  
  const handlePeriodChange = (index, field, value) => {
    const updatedPeriods = rentalPeriods.map((period, i) =>
      i === index ? { ...period, [field]: value } : period
    );
    setRentalPeriods(updatedPeriods);
  };
  // Manejo de descripciones
  const handleAddDescription = () => {
    setDescription([...description, { text: "" }]);
  };

  const handleRemoveDescription = (index) => {
    const updatedDescription = description.filter((_, i) => i !== index);
    setDescription(updatedDescription);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescription = description.map((desc, i) =>
      i === index ? { ...desc, text: value } : desc
    );
    setDescription(updatedDescription);
  };

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 "
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-full m-5 flex flex-col gap-3 overflow-auto h-[95%] lg:w-[30rem]">
        <h2 className="text-2xl mb-4">Nueva Habitacion</h2>

        <div>
          <label className="block mb-1" htmlFor="name">
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
          <label className="block mb-1">Puerta (Opcional):</label>
          <input
            type="text"
            name="door"
            value={dataRoom.door || ""} // Asegúrate de que el valor no sea undefined
            onChange={(event) =>
              setDataRoom({ ...dataRoom, door: event.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {(category === "HELLO_ROOM" || category === "HELLO_COLIVING" || category === "HELLO_LANDLORD") && (
          <>
            {/* <div>
              <label className="block mb-1">Piso (Opcional):</label>
              <input
                type="number"
                name="floor"
                value={dataRoom.floor || ""} // Asegúrate de que el valor no sea undefined
                onChange={(event) =>
                  setDataRoom({ ...dataRoom, floor: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div> */}
            {/* Select para la tipología */}
            {/* <div className="mt-4">
              <label className="block mb-1" htmlFor="typology">
                Typology
              </label>
              <select
                id="typology"
                name="typology"
                value={dataRoom?.typology || ""}
                onChange={(event) =>
                  setDataRoom({ ...dataRoom, typology: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="MIXED">MIXED</option>
                <option value="ONLY_WOMEN">ONLY WOMEN</option>
                <option value="ONLY_MEN">ONLY MEN</option>
              </select>
            </div> */}

            {/* Select para el tipo de calendario */}
            <div className="mt-4">
              <label className="block mb-1" htmlFor="calendar">
                Tipo de calendario
              </label>
              <select
                id="calendar"
                name="calendar"
                value={dataRoom?.calendar || "SIMPLE"}
                onChange={(event) =>

                  setDataRoom({ ...dataRoom, calendar: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="SIMPLE">Simple</option>
                <option value="FULL">Completo</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block mb-1" htmlFor="tags">
                Etiquetas
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={dataRoom.tags || ""}
                onChange={(event) =>
                  setDataRoom({ ...dataRoom, tags: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded break-words"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-1" htmlFor="linkVideo">
                Link video
              </label>
              <input
                type="text"
                id="linkVideo"
                name="linkVideo"
                value={dataRoom.linkVideo || ""}
                onChange={(event) =>
                  setDataRoom({ ...dataRoom, linkVideo: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded break-words"
              />
            </div>
          </>
        )}
        <div className="flex flex-col gap-3 w-full">
          <div>
            <label className="block mb-1" htmlFor="serial">
              Código
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
            <label className="block mb-1" htmlFor="numberBeds">
              Cantidad de camas en la habitación
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
        </div>

        {(category === "HELLO_ROOM" || category === "HELLO_COLIVING" || category === "HELLO_LANDLORD") && (
          <>
            <div className="w-full flex flex-col gap-3">
              <div>
                <label className="block mb-1" htmlFor="price">
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
                  className="number-input-no-appearance appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="amountHelloflatmate">
                  Neto de helloflatmate
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
            </div>

            <div className="w-full flex flex-col gap-3">
              <div>
                <h3 className="block mb-1">Factura de helloflatmate con IVA</h3>
                <p className="appearance-none outline-none w-full p-2 border border-gray-300 rounded">
                  {(parseInt(dataRoom?.amountHelloflatmate) || 0) -
                    (parseInt(dataRoom?.amountHelloflatmate) *
                      (dataRoom.IVA / 100) || 0)}
                </p>
              </div>
              <div>
                <label className="block mb-1" htmlFor="IVA">
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
                  className="number-input-no-appearance appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="block text-sm mb-1">Neto Propietario</h3>
              <p className="appearance-none outline-none w-full p-2 border border-gray-300 rounded">
                {(parseInt(dataRoom?.price) || 0) -
                  (parseInt(dataRoom?.amountHelloflatmate) || 0)}
              </p>
            </div>

            {/* Periodos de alquiler */}
            <RentalPeriodTemplate data={rentalPeriodIds} setData={setRentalPeriodIds} predefineRental={rentalPeriods}/>

            {/* Descripciones */}
            <div className="w-full">
              <h3 className="mb-3">Descripciones</h3>
              <ul className="list-none flex flex-col gap-3">
                {description.map((description, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={description.text}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDescription(index)}
                      className="text-red-500"
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleAddDescription}
                className="mt-3 p-2 bg-blue-500 text-white rounded"
              >
                +
              </button>
            </div>
          </>
        )}

        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          <h3 className="w-full">¿Baño en Suite?</h3>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="bathroom"
              value="yes"
              checked={dataRoom.bathroom === "yes"}
              onChange={handleRadioChange}
            />
            <label htmlFor="bathroom">Sí</label>
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

        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          <h3 className="w-full">¿Se aceptan parejas?</h3>
          <div className="flex gap-2 px-3">
            <input
              type="radio"
              name="couple"
              value="yes"
              checked={dataRoom.couple === "yes"}
              onChange={handleRadioChange}
            />
            <label htmlFor="couple">Sí</label>
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
    </motion.aside>
  );
}
