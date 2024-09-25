import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

export default function CascadeUpdate({ showModal }) {
  const [isEditDescriptionEnabled, setIsEditDescriptionEnabled] =
    useState(false);
  const [isEditIncomeConditionEnabled, setIsEditIncomeConditionEnabled] =
    useState(false);
  const [isEditRoomDescriptionEnabled, setIsEditRoomDescriptionEnabled] =
    useState(false);
  const [isEditFeeDescriptionEnabled, setIsEditFeeDescriptionEnabled] =
    useState(false);
  const [
    isEditMaintenanceDescriptionEnabled,
    setIsEditMaintenanceDescriptionEnabled,
  ] = useState(false);
  const [isEditAboutUsEnabled, setIsEditAboutUsEnabled] = useState(false);
  const [isEditHouseRulesEnabled, setIsEditHouseRulesEnabled] = useState(false);
  const [isEditCheckInEnabled, setIsEditCheckInEnabled] = useState(false);
  const [isEditCheckOutEnabled, setIsEditCheckOutEnabled] = useState(false);
  const [isEditTagsEnabled, setIsEditTagsEnabled] = useState(false); // Nuevo estado para tags

  const [descriptions, setDescriptions] = useState([""]);

  const [fields, setFields] = useState({
    incomeConditionDescription: "",
    roomDescription: "",
    feeDescription: "",
    maintenanceDescription: "",
    aboutUs: "",
    houseRules: "",
    checkIn: "",
    checkOut: "",
    tags: [],
  });

  const [categories, setCategories] = useState({
    HELLO_ROOM: false,
    HELLO_COLIVING: false,
    HELLO_STUDIO: false,
    HELLO_LANDLORD: false,
  });

  // Manejo de cambios en el campo de descripción
  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  // Añadir una nueva descripción
  const handleAddDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  // Eliminar una descripción
  const handleRemoveDescription = (index) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(updatedDescriptions);
  };
  // Manejo de los cambios en tags
  const handleTagsChange = (value) => {
    setFields((prevFields) => ({
      ...prevFields,
      tags: value.split(",").map((tag) => tag.trim()), // Convertir la cadena en array
    }));
  };
  const handleFieldChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  // Función para manejar los cambios en las categorías
  const handleCategoryChange = (name, value) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };

  // Función para verificar si hay al menos una categoría seleccionada
  const validateCategories = () => {
    return Object.values(categories).some((selected) => selected);
  };

  const handleUpdate = async () => {
    // Crear objeto con las categorías seleccionadas
    const selectedCategories = Object.keys(categories).filter(
      (key) => categories[key]
    );

    // Crear objeto final solo con los campos seleccionados
    const updatedData = {
      categories: selectedCategories, // Incluir las categorías seleccionadas
      ...(isEditDescriptionEnabled && { descriptions }), // Solo incluir descriptions si está habilitado
      ...(isEditIncomeConditionEnabled && {
        incomeConditionDescription: fields.incomeConditionDescription,
      }),
      ...(isEditRoomDescriptionEnabled && {
        roomDescription: fields.roomDescription,
      }),
      ...(isEditFeeDescriptionEnabled && {
        feeDescription: fields.feeDescription,
      }),
      ...(isEditMaintenanceDescriptionEnabled && {
        maintenanceDescription: fields.maintenanceDescription,
      }),
      ...(isEditAboutUsEnabled && { aboutUs: fields.aboutUs }),
      ...(isEditHouseRulesEnabled && { houseRules: fields.houseRules }),
      ...(isEditCheckInEnabled && { checkIn: fields.checkIn }), // Solo incluir checkIn si está habilitado
      ...(isEditCheckOutEnabled && { checkOut: fields.checkOut }), // Solo incluir checkOut si está habilitado
      ...(isEditTagsEnabled && { tags: fields.tags }), // Solo incluir tags si está habilitado
    };

    try {
      const res = await axios.patch("/api/admin/property", updatedData);
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = () => {
    // // Resetear los campos y las descripciones
    // setFields({
    //   incomeConditionDescription: "",
    //   roomDescription: "",
    //   feeDescription: "",
    //   maintenanceDescription: "",
    //   aboutUs: "",
    //   houseRules: "",
    //   checkIn: "",
    //   checkOut: "",
    //   tags: [],
    // });
    // setDescriptions([""]); // Limpiar la lista de descripciones
    // setCategories({
    //   HELLO_ROOM: false,
    //   HELLO_COLIVING: false,
    //   HELLO_STUDIO: false,
    //   HELLO_LANDLORD: false,
    // }); // Resetear las categorías

    // Cerrar el modal
    showModal();
  };

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-full m-5 flex flex-col gap-3 overflow-auto h-[95%] lg:w-[30rem]">
        {/* Categorías con sus checkbox */}
        <h2 className="text-2xl text-start font-bold text-[#000000CC]">
          Seleccione la categoría
        </h2>
        <div className="flex flex-col gap-2 justify-center lg:flex-row lg:flex-wrap">
          <label aria-label="category"></label>
          <div className="flex gap-2 border rounded p-1 px-2">
            <label htmlFor="HELLO_ROOM">HELLO_ROOM</label>
            <input
              type="checkbox"
              id="HELLO_ROOM"
              name="HELLO_ROOM"
              checked={categories.HELLO_ROOM}
              onChange={(e) =>
                handleCategoryChange("HELLO_ROOM", e.target.checked)
              }
            />
          </div>
          <div className="flex gap-2 border rounded p-1 px-2">
            <label htmlFor="HELLO_COLIVING">HELLO_COLIVING</label>
            <input
              type="checkbox"
              id="HELLO_COLIVING"
              name="HELLO_COLIVING"
              checked={categories.HELLO_COLIVING}
              onChange={(e) =>
                handleCategoryChange("HELLO_COLIVING", e.target.checked)
              }
            />
          </div>
          <div className="flex gap-2 border rounded p-1 px-2">
            <label htmlFor="HELLO_STUDIO">HELLO_STUDIO</label>
            <input
              type="checkbox"
              id="HELLO_STUDIO"
              name="HELLO_STUDIO"
              checked={categories.HELLO_STUDIO}
              onChange={(e) =>
                handleCategoryChange("HELLO_STUDIO", e.target.checked)
              }
            />
          </div>
          <div className="flex gap-2 border rounded p-1 px-2">
            <label htmlFor="HELLO_LANDLORD">HELLO_LANDLORD</label>
            <input
              type="checkbox"
              id="HELLO_LANDLORD"
              name="HELLO_LANDLORD"
              checked={categories.HELLO_LANDLORD}
              onChange={(e) =>
                handleCategoryChange("HELLO_LANDLORD", e.target.checked)
              }
            />
          </div>
        </div>

        {/* Sección de edición de Descripción */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editDescription" className="text-lg font-bold">
              Editar Descripción
            </label>
            <input
              type="checkbox"
              id="editDescription"
              name="editDescription"
              onChange={(e) => setIsEditDescriptionEnabled(e.target.checked)}
            />
          </div>
          {isEditDescriptionEnabled && (
            <div>
              <h3>Descripción</h3>
              <ul className="list-none">
                {descriptions.map((desc, index) => (
                  <li key={index} className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      className="border border-gray-300 rounded p-1 flex-grow"
                    />
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveDescription(index)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={handleAddDescription}
              >
                Añadir Descripción
              </button>
            </div>
          )}
        </div>

        {/* Sección de edición de Income Condition Description */}
        <div>
          <label
            htmlFor="editIncomeConditionDescription"
            className="text-lg font-bold"
          >
            Editar Income Condition Description
          </label>
          <input
            type="checkbox"
            id="editIncomeConditionDescription"
            onChange={(e) => setIsEditIncomeConditionEnabled(e.target.checked)}
          />
          <div className="flex items-center gap-2"></div>
          <textarea
            cols="30"
            rows="3"
            disabled={!isEditIncomeConditionEnabled}
            value={fields.incomeConditionDescription}
            onChange={(e) =>
              handleFieldChange("incomeConditionDescription", e.target.value)
            }
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de Room Description */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editRoomDescription" className="text-lg font-bold">
              Editar Room Description
            </label>
            <input
              type="checkbox"
              id="editRoomDescription"
              onChange={(e) =>
                setIsEditRoomDescriptionEnabled(e.target.checked)
              }
            />
          </div>
          <textarea
            cols="30"
            rows="3"
            disabled={!isEditRoomDescriptionEnabled}
            value={fields.roomDescription}
            onChange={(e) =>
              handleFieldChange("roomDescription", e.target.value)
            }
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de Fee Description */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editFeeDescription" className="text-lg font-bold">
              Editar Fee Description
            </label>
            <input
              type="checkbox"
              id="editFeeDescription"
              onChange={(e) => setIsEditFeeDescriptionEnabled(e.target.checked)}
            />
          </div>
          <textarea
            cols="30"
            rows="3"
            disabled={!isEditFeeDescriptionEnabled}
            value={fields.feeDescription}
            onChange={(e) =>
              handleFieldChange("feeDescription", e.target.value)
            }
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de Maintenance Description */}
        <div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="editMaintenanceDescription"
              className="text-lg font-bold"
            >
              Editar Maintenance Description
            </label>
            <input
              type="checkbox"
              id="editMaintenanceDescription"
              onChange={(e) =>
                setIsEditMaintenanceDescriptionEnabled(e.target.checked)
              }
            />
          </div>
          <textarea
            cols="30"
            rows="3"
            disabled={!isEditMaintenanceDescriptionEnabled}
            value={fields.maintenanceDescription}
            onChange={(e) =>
              handleFieldChange("maintenanceDescription", e.target.value)
            }
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de About Us */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editAboutUs" className="text-lg font-bold">
              Editar About Us
            </label>
            <input
              type="checkbox"
              id="editAboutUs"
              onChange={(e) => setIsEditAboutUsEnabled(e.target.checked)}
            />
          </div>
          <textarea
            cols="30"
            rows="3"
            disabled={!isEditAboutUsEnabled}
            value={fields.aboutUs}
            onChange={(e) => handleFieldChange("aboutUs", e.target.value)}
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de House Rules */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editHouseRules" className="text-lg font-bold">
              Editar House Rules
            </label>
            <input
              type="checkbox"
              id="editHouseRules"
              onChange={(e) => setIsEditHouseRulesEnabled(e.target.checked)}
            />
          </div>
          <textarea
            cols="30"
            rows="3"
            disabled={!isEditHouseRulesEnabled}
            value={fields.houseRules}
            onChange={(e) => handleFieldChange("houseRules", e.target.value)}
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de CheckIn */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editCheckIn" className="text-lg font-bold">
              Editar CheckIn
            </label>
            <input
              type="checkbox"
              id="editCheckIn"
              onChange={(e) => setIsEditCheckInEnabled(e.target.checked)}
            />
          </div>
          <textarea
            name="checkIn"
            id="checkIn"
            cols="30"
            rows="3"
            disabled={!isEditCheckInEnabled}
            value={fields.checkIn}
            onChange={(e) => handleFieldChange("checkIn", e.target.value)}
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Sección de edición de CheckOut */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editCheckOut" className="text-lg font-bold">
              Editar CheckOut
            </label>
            <input
              type="checkbox"
              id="editCheckOut"
              onChange={(e) => setIsEditCheckOutEnabled(e.target.checked)}
            />
          </div>
          <textarea
            name="checkOut"
            id="checkOut"
            cols="30"
            rows="3"
            disabled={!isEditCheckOutEnabled}
            value={fields.checkOut}
            onChange={(e) => handleFieldChange("checkOut", e.target.value)}
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>
        {/* Sección de edición de Tags */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="editTags" className="text-lg font-bold">
              Editar Tags
            </label>
            <input
              type="checkbox"
              id="editTags"
              onChange={(e) => setIsEditTagsEnabled(e.target.checked)}
            />
          </div>
          <input
            type="text"
            disabled={!isEditTagsEnabled}
            value={fields.tags.join(", ")}
            onChange={(e) => handleTagsChange(e.target.value)}
            className="border border-gray-300 rounded p-1 mt-2 w-full"
          />
        </div>

        {/* Botones de Actualizar y Cancelar */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "rgba(14, 24, 99, 0.8)" }}
            onClick={() => {
              // Validar categorías antes de llamar a `toast.promise`
              if (!validateCategories()) {
                toast.error("Por favor, selecciona al menos una categoría", {
                  duration: 2000,
                });
                return; // Evitar que se ejecute `toast.promise`
              }

              // Si la validación pasa, ejecutar `toast.promise`
              toast.promise(handleUpdate(), {
                loading: "Actualizando...",
                success: () => {
                  showModal();
                  return "Informacion actualizada";
                },
                error: (err) =>
                  err.message || "Error al actualizar la información",
                duration: 2000,
              });
            }}
          >
            Actualizar
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "rgba(33, 171, 204, 0.8)" }}
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
