import { useState, useEffect } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";
import ImageUploader from "@/app/components/admin/drag-and-drop/ImageUploader";
import RentalPeriodRoomEdit from "./RentalPeriodRoomEdit";
export default function RoomEditModal({ data, setData, showModal, selectedRoom, category, predefineRental }) {
    const [dataRoom, setDataRoom] = useState({});
    const [files, setFiles] = useState([]);
    const [initialImages, setInitialImages] = useState([]);
    const [rentalPeriods, setRentalPeriods] = useState(data?.rentalItems || []);
    const [newRentalPeriods, setNewRentalPeriods] = useState([]);

    useEffect(() => {
        if (selectedRoom) {
            setDataRoom({
                ...selectedRoom,
            });
            setInitialImages(selectedRoom.images || []); // Cargar imágenes iniciales
            setRentalPeriods(selectedRoom?.rentalItems || []);
        }
    }, [selectedRoom]);

    useEffect(() => {
        setRentalPeriods(selectedRoom?.rentalItems);
    }, [selectedRoom?.rentalItems]);

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
            const response = await uploadFiles(filesToUpload.map((file) => file.fileData));
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

        const isImageModified = newData.image instanceof File || newData.image !== originalData?.image;

        return isImageModified || JSON.stringify(originalDataWithoutImage) !== JSON.stringify(newDataWithoutImage);
    };

    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        setDataRoom({ ...dataRoom, [name]: value === "yes" });
    };

    // Manejo de descripciones
    const handleAddDescription = () => {
        setDataRoom((prevDataRoom) => ({
            ...prevDataRoom,
            description: [...(prevDataRoom.description || []), ""],
        }));
    };

    const handleRemoveDescription = (index) => {
        setDataRoom((prevDataRoom) => ({
            ...prevDataRoom,
            description: prevDataRoom.description.filter((_, i) => i !== index),
        }));
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescription = dataRoom.description.map((desc, i) => (i === index ? value : desc));

        setDataRoom({ ...dataRoom, description: updatedDescription });
    };

    const handleSubmit = async () => {
        if (!isModified(dataRoom, selectedRoom) && files.length === 0) {
            showModal();
            return;
        }

        let newData = {
            ...dataRoom,
            rentalPeriods: newRentalPeriods.newRentalPeriods,
            deleteRentalPeriods: newRentalPeriods.deletedRentalPeriods,
        };

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
            amountOwner: parseInt(dataRoom.price) - parseInt(dataRoom.amountHelloflatmate),
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
            <div className="bg-white p-3 rounded-lg shadow-lg w-full m-3 flex flex-col gap-3 h-[95%] overflow-auto lg:w-[30rem]">
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
                        onChange={(event) => setDataRoom({ ...dataRoom, name: event.target.value })}
                        className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm mb-1" htmlFor="serial">
                            Código
                        </label>
                        <input
                            type="text"
                            id="serial"
                            name="serial"
                            value={dataRoom?.serial || ""}
                            onChange={(event) => setDataRoom({ ...dataRoom, serial: event.target.value })}
                            className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Puerta (Opcional):</label>
                        <input
                            type="text"
                            name="door"
                            value={dataRoom.door || ""} // Asegúrate de que el valor no sea undefined
                            onChange={(event) => setDataRoom({ ...dataRoom, door: event.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <>
                        {/* <div>
                <label className="block text-sm mb-1">Piso (Opcional):</label>
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
                <label className="block text-sm mb-1" htmlFor="typology">
                  Typology
                </label>
                <select
                  id="typology"
                  name="typology"
                  value={dataRoom?.typology || ""}
                  onChange={(event) =>
                    setDataRoom({ ...dataRoom, typology: event.target.value })
                  }
                  className="border rounded px-2 py-1 w-full appearance-none outline-none"
                >
                  <option value="MIXED">MIXED</option>
                  <option value="ONLY_WOMEN">ONLY WOMEN</option>
                  <option value="ONLY_MEN">ONLY MEN</option>
                </select>
              </div> */}

                        {/* Select para el tipo de calendario */}
                        <div className="mt-4">
                            <label className="block text-sm mb-1" htmlFor="calendar">
                                Tipo de calendario
                            </label>
                            <select
                                id="calendar"
                                name="calendar"
                                value={dataRoom?.calendar || "SIMPLE"}
                                onChange={(event) => setDataRoom({ ...dataRoom, calendar: event.target.value })}
                                className="border rounded px-2 py-1 w-full appearance-none outline-none"
                            >
                                <option value="SIMPLE">Simple</option>
                                <option value="FULL">Completo</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm mb-1" htmlFor="tags">
                                Etiquetas
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={dataRoom.tags || ""}
                                onChange={(event) => setDataRoom({ ...dataRoom, tags: [event.target.value] })}
                                className="border rounded px-2 py-1 w-full appearance-none outline-none break-words"
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
                                onChange={(event) => setDataRoom({ ...dataRoom, linkVideo: event.target.value })}
                                className="w-full p-2 border border-gray-300 rounded break-words"
                            />
                        </div>
                    </>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="numberBeds">
                            Numero de camas
                        </label>
                        <input
                            type="number"
                            id="numberBeds"
                            name="numberBeds"
                            value={dataRoom?.numberBeds || ""}
                            onChange={(event) => setDataRoom({ ...dataRoom, numberBeds: event.target.value })}
                            className="number-input-no-appearance appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="amountHelloflatmate">
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
                    <label className="block text-sm mb-1" htmlFor="amountHelloflatmate">
                        Monto de helloflatmate
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
                    <h3 className="block text-sm mb-1">Factura de helloflatmate con IVA</h3>
                    <p className="appearance-none outline-none w-full p-2 border border-gray-300 rounded">
                        {(parseInt(dataRoom?.amountHelloflatmate) || 0) - (parseInt(dataRoom?.amountHelloflatmate) * (dataRoom.IVA / 100) || 0)}
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
                        onChange={(event) => setDataRoom({ ...dataRoom, IVA: event.target.value })}
                        className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <h3 className="block text-sm mb-1">Neto Propietario</h3>
                    <p className="appearance-none outline-none w-full p-2 border border-gray-300 rounded">
                        {(parseInt(dataRoom?.price) || 0) - (parseInt(dataRoom?.amountHelloflatmate) || 0)}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {/* Periodos de alquiler */}
                    {selectedRoom.rentalItems?.length > 0 ? (
                        <RentalPeriodRoomEdit
                            data={newRentalPeriods || []}
                            setData={setNewRentalPeriods}
                            predefineRental={predefineRental}
                            oldRentalPeriods={selectedRoom.rentalItems?.map((period) => {
                                return { itemPeriodId: period.id, ...period.rentalPeriod };
                            })}
                        />
                    ) : (
                        <RentalPeriodRoomEdit
                            data={newRentalPeriods || []}
                            setData={setNewRentalPeriods}
                            predefineRental={predefineRental}
                            oldRentalPeriods={selectedRoom.rentalItems?.map((period) => {
                                return { itemPeriodId: period.id, ...period.rentalPeriod };
                            })}
                        />
                    )}

                    {/* Descripciones */}
                    <div className="w-full flex flex-col gap-3">
                        <h3 className="block text-sm mb-1">Descripciones</h3>
                        <ul className="list-none flex flex-col gap-3">
                            {dataRoom?.description?.length > 0 ? (
                                dataRoom?.description.map((description, index) => (
                                    <li key={index} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            placeholder="Descripción"
                                            value={description}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                            className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDescription(index)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <h2 className="text-center">No hay descripciones</h2>
                            )}
                        </ul>
                        <button
                            type="button"
                            onClick={handleAddDescription}
                            className="bg-blue-500 text-white px-2 py-1 rounded w-[10rem] self-start"
                        >
                            Añadir descripción
                        </button>
                    </div>
                </div>

                <div className="w-full flex gap-3 justify-center items-center flex-wrap">
                    <h3 className="w-full">¿Baño en Suite?</h3>
                    <div className="flex gap-2 px-3">
                        <input type="radio" name="bathroom" value="yes" checked={dataRoom.bathroom === true} onChange={handleRadioChange} />
                        <label htmlFor="bathroom">Si</label>
                    </div>
                    <div className="flex gap-2 px-3">
                        <input type="radio" name="bathroom" value="no" checked={dataRoom.bathroom === false} onChange={handleRadioChange} />
                        <label htmlFor="bathroom">No</label>
                    </div>
                </div>
                <div className="w-full flex gap-3 justify-center items-center flex-wrap">
                    <h3 className="w-full">¿Se aceptan parejas?</h3>
                    <div className="flex gap-2 px-3">
                        <input type="radio" name="couple" value="yes" checked={dataRoom.couple === true} onChange={handleRadioChange} />
                        <label htmlFor="couple">Si</label>
                    </div>
                    <div className="flex gap-2 px-3">
                        <input type="radio" name="couple" value="no" checked={dataRoom.couple === false} onChange={handleRadioChange} />
                        <label htmlFor="couple">No</label>
                    </div>
                </div>
                <div className="w-full">
                    <h3 className="block text-sm mb-1">Imagenes</h3>
                    <ImageUploader initialImages={initialImages} images={files} setImages={setFiles} />
                </div>
                <div className="flex justify-between w-full mt-4">
                    <button className="text-black px-4 py-2 border border-[#0C1660] rounded-lg" type="button" onClick={() => showModal()}>
                        Cancelar
                    </button>
                    <button className="bg-[#0C1660] text-white px-4 py-2 rounded-lg ml-2" type="button" onClick={handleSubmit}>
                        Guardar
                    </button>
                </div>
            </div>
        </aside>
    );
}
