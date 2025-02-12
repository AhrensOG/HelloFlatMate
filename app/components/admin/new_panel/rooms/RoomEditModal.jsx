import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Estilos generales del modal
const modalStyles = {
    overlay: "fixed inset-0 flex items-center justify-center z-50",
    overlayBackground: "fixed inset-0 bg-black bg-opacity-50 z-40",
    modalContainer: "bg-white w-full max-w-md mx-auto rounded shadow-lg p-6 relative z-50 max-h-[80vh] overflow-y-auto sm:max-w-sm",
    closeButton: "absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300",
    title: "text-lg font-bold mb-4",
    form: "flex flex-col gap-4", // Estilo para organizar los campos del formulario
    inputGroup: "mb-2", // Reducido para pantallas pequeñas
    label: "block text-gray-700 text-sm font-bold mb-1", // Reducido para pantallas pequeñas
    input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm", // Reducido para pantallas pequeñas
    error: "text-red-500 text-xs italic",
    buttonContainer: "flex justify-end",
    saveButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 text-sm", // Reducido para pantallas pequeñas
    cancelButton: "bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm", // Reducido para pantallas pequeñas
    radioGroup: "flex items-center space-x-4", // Estilo para agrupar los radios
    radioLabel: "inline-flex items-center", // Estilo para cada radio
    radioInput: "form-radio h-5 w-5 text-blue-500", // Estilo para el input radio
    tagContainer: "flex flex-wrap gap-2 mt-2", // Estilo para el contenedor de las etiquetas
    tag: "bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1", // Estilo para cada etiqueta
    tagRemoveButton: "cursor-pointer", // Estilo para el botón de eliminar etiqueta
};

// Esquema de validación con Yup, adaptado para las propiedades de la habitación
const validationSchema = Yup.object().shape({
    floor: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    door: Yup.string().nullable(),
    price: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    zone: Yup.string().nullable(),
    typology: Yup.string().nullable().oneOf(["MIXED", "ONLY_WOMEN", "ONLY_MEN"]),
    description: Yup.string().nullable(),
    amountOwner: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    amountHelloflatmate: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    IVA: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    isActive: Yup.boolean().nullable().required("Este campo es requerido"), // Asegúrate de que sea requerido si es un radio
    name: Yup.string().nullable(),
    numberBeds: Yup.number()
        .nullable()
        .transform((_, originalValue) => (originalValue === "" ? null : Number(originalValue)))
        .typeError("Debe ser un número"),
    linkVideo: Yup.string().nullable().url("Debe ser una URL válida"),
    calendar: Yup.string().nullable().oneOf(["SIMPLE", "FULL"]),
    bathroom: Yup.boolean().nullable().required("Este campo es requerido"), // Asegúrate de que sea requerido si es un radio
    couple: Yup.boolean().nullable().required("Este campo es requerido"), // Asegúrate de que sea requerido si es un radio
    tags: Yup.array().of(Yup.string()).nullable(),
});

export default function RoomEditModal({ isOpen, onClose, data, onSave }) {
    const [newTag, setNewTag] = useState("");

    // Inicializa el estado 'tags' con los datos existentes o un array vacío
    const [tags, setTags] = useState(data?.tags || []);

    const handleAddTag = (event) => {
        if (event.key === "Enter" && newTag.trim() !== "") {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
            event.preventDefault(); // Evita que el formulario se envíe al presionar Enter
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const formik = useFormik({
        initialValues: {
            floor: data?.floor || "",
            door: data?.door || "",
            price: data?.price || "",
            zone: data?.zone || "",
            typology: data?.typology || "",
            description: data?.description || "",
            amountOwner: data?.amountOwner || "",
            amountHelloflatmate: data?.amountHelloflatmate || "",
            IVA: data?.IVA || "",
            isActive: data?.isActive !== undefined ? data.isActive : false, // Valor por defecto
            name: data?.name || "",
            numberBeds: data?.numberBeds || "",
            linkVideo: data?.linkVideo || "",
            calendar: data?.calendar || "SIMPLE",
            bathroom: data?.bathroom !== undefined ? data.bathroom : false, // Valor por defecto
            couple: data?.couple !== undefined ? data.couple : false, // Valor por defecto
            tags: tags, // Usa el estado local 'tags' para inicializar el campo 'tags' en Formik
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Aquí puedes preparar los datos para enviar a tu función 'onSave'
            onSave({ ...data, ...values, tags: tags }); // Envía los valores actualizados junto con el ID y el estado local 'tags'
            onClose(); // Cierra el modal después de guardar
        },
    });

    if (!isOpen) return null;

    return (
        <div className={modalStyles.overlay}>
            <div className={modalStyles.overlayBackground} onClick={onClose} />
            <div className={modalStyles.modalContainer}>
                <button onClick={onClose} className={modalStyles.closeButton}>
                    X
                </button>
                <h2 className={modalStyles.title}>Editar Habitación</h2>

                <form onSubmit={formik.handleSubmit} className={modalStyles.form}>
                    {/* ID - Solo visualización */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="id" className={modalStyles.label}>
                            ID:
                        </label>
                        <input type="text" id="id" value={data?.id} className={modalStyles.input} readOnly />
                    </div>
                    {/* Serial - Solo visualización */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="serial" className={modalStyles.label}>
                            Serial:
                        </label>
                        <input type="text" id="serial" value={data?.serial} className={modalStyles.input} readOnly />
                    </div>
                    {/* Input para floor */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="floor" className={modalStyles.label}>
                            Piso:
                        </label>
                        <input
                            type="number"
                            id="floor"
                            name="floor"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.floor}
                            className={`${modalStyles.input} ${formik.touched.floor && formik.errors.floor ? "border-red-500" : ""}`}
                        />
                        {formik.touched.floor && formik.errors.floor && <div className={modalStyles.error}>{formik.errors.floor}</div>}
                    </div>
                    {/* Input para door */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="door" className={modalStyles.label}>
                            Puerta:
                        </label>
                        <input
                            type="text"
                            id="door"
                            name="door"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.door}
                            className={`${modalStyles.input} ${formik.touched.door && formik.errors.door ? "border-red-500" : ""}`}
                        />
                        {formik.touched.door && formik.errors.door && <div className={modalStyles.error}>{formik.errors.door}</div>}
                    </div>
                    {/* Input para price */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="price" className={modalStyles.label}>
                            Precio:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            className={`${modalStyles.input} ${formik.touched.price && formik.errors.price ? "border-red-500" : ""}`}
                        />
                        {formik.touched.price && formik.errors.price && <div className={modalStyles.error}>{formik.errors.price}</div>}
                    </div>
                    {/* Input para zone */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="zone" className={modalStyles.label}>
                            Zona:
                        </label>
                        <input
                            type="text"
                            id="zone"
                            name="zone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.zone}
                            className={`${modalStyles.input} ${formik.touched.zone && formik.errors.zone ? "border-red-500" : ""}`}
                        />
                        {formik.touched.zone && formik.errors.zone && <div className={modalStyles.error}>{formik.errors.zone}</div>}
                    </div>
                    {/* Input para typology */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="typology" className={modalStyles.label}>
                            Tipología:
                        </label>
                        <select
                            id="typology"
                            name="typology"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.typology}
                            className={`${modalStyles.input} ${formik.touched.typology && formik.errors.typology ? "border-red-500" : ""}`}
                        >
                            <option value="">Seleccionar</option>
                            <option value="MIXED">Mixta</option>
                            <option value="ONLY_WOMEN">Solo Mujeres</option>
                            <option value="ONLY_MEN">Solo Hombres</option>
                        </select>
                        {formik.touched.typology && formik.errors.typology && <div className={modalStyles.error}>{formik.errors.typology}</div>}
                    </div>
                    {/* Input para description */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="description" className={modalStyles.label}>
                            Descripción:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className={`${modalStyles.input} ${formik.touched.description && formik.errors.description ? "border-red-500" : ""}`}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className={modalStyles.error}>{formik.errors.description}</div>
                        )}
                    </div>
                    {/* Input para amountOwner */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="amountOwner" className={modalStyles.label}>
                            Monto del Propietario:
                        </label>
                        <input
                            type="number"
                            id="amountOwner"
                            name="amountOwner"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amountOwner}
                            className={`${modalStyles.input} ${formik.touched.amountOwner && formik.errors.amountOwner ? "border-red-500" : ""}`}
                        />
                        {formik.touched.amountOwner && formik.errors.amountOwner && (
                            <div className={modalStyles.error}>{formik.errors.amountOwner}</div>
                        )}
                    </div>
                    {/* Input para amountHelloflatmate */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="amountHelloflatmate" className={modalStyles.label}>
                            Monto de Helloflatmate:
                        </label>
                        <input
                            type="number"
                            id="amountHelloflatmate"
                            name="amountHelloflatmate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amountHelloflatmate}
                            className={`${modalStyles.input} ${
                                formik.touched.amountHelloflatmate && formik.errors.amountHelloflatmate ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.amountHelloflatmate && formik.errors.amountHelloflatmate && (
                            <div className={modalStyles.error}>{formik.errors.amountHelloflatmate}</div>
                        )}
                    </div>
                    {/* Input para IVA */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="IVA" className={modalStyles.label}>
                            IVA:
                        </label>
                        <input
                            type="number"
                            id="IVA"
                            name="IVA"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.IVA}
                            className={`${modalStyles.input} ${formik.touched.IVA && formik.errors.IVA ? "border-red-500" : ""}`}
                        />
                        {formik.touched.IVA && formik.errors.IVA && <div className={modalStyles.error}>{formik.errors.IVA}</div>}
                    </div>

                    {/* Radio para isActive */}
                    <div className={modalStyles.inputGroup}>
                        <label className={modalStyles.label}>Activo:</label>
                        <div className={modalStyles.radioGroup}>
                            <label className={modalStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="isActive"
                                    value={true}
                                    checked={formik.values.isActive === true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={modalStyles.radioInput}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className={modalStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="isActive"
                                    value={false}
                                    checked={formik.values.isActive === false}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={modalStyles.radioInput}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        {formik.touched.isActive && formik.errors.isActive && <div className={modalStyles.error}>{formik.errors.isActive}</div>}
                    </div>

                    {/* Radio para bathroom */}
                    <div className={modalStyles.inputGroup}>
                        <label className={modalStyles.label}>Baño:</label>
                        <div className={modalStyles.radioGroup}>
                            <label className={modalStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="bathroom"
                                    value={true}
                                    checked={formik.values.bathroom === true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={modalStyles.radioInput}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className={modalStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="bathroom"
                                    value={false}
                                    checked={formik.values.bathroom === false}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={modalStyles.radioInput}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        {formik.touched.bathroom && formik.errors.bathroom && <div className={modalStyles.error}>{formik.errors.bathroom}</div>}
                    </div>

                    {/* Radio para couple */}
                    <div className={modalStyles.inputGroup}>
                        <label className={modalStyles.label}>Pareja:</label>
                        <div className={modalStyles.radioGroup}>
                            <label className={modalStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="couple"
                                    value={true}
                                    checked={formik.values.couple === true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={modalStyles.radioInput}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className={modalStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="couple"
                                    value={false}
                                    checked={formik.values.couple === false}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={modalStyles.radioInput}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        {formik.touched.couple && formik.errors.couple && <div className={modalStyles.error}>{formik.errors.couple}</div>}
                    </div>

                    {/* Input para name */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="name" className={modalStyles.label}>
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={`${modalStyles.input} ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
                        />
                        {formik.touched.name && formik.errors.name && <div className={modalStyles.error}>{formik.errors.name}</div>}
                    </div>

                    {/* Input para numberBeds */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="numberBeds" className={modalStyles.label}>
                            Número de Camas:
                        </label>
                        <input
                            type="number"
                            id="numberBeds"
                            name="numberBeds"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.numberBeds}
                            className={`${modalStyles.input} ${formik.touched.numberBeds && formik.errors.numberBeds ? "border-red-500" : ""}`}
                        />
                        {formik.touched.numberBeds && formik.errors.numberBeds && <div className={modalStyles.error}>{formik.errors.numberBeds}</div>}
                    </div>
                    {/* Input para linkVideo */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="linkVideo" className={modalStyles.label}>
                            Link del Video:
                        </label>
                        <input
                            type="text"
                            id="linkVideo"
                            name="linkVideo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.linkVideo}
                            className={`${modalStyles.input} ${formik.touched.linkVideo && formik.errors.linkVideo ? "border-red-500" : ""}`}
                        />
                        {formik.touched.linkVideo && formik.errors.linkVideo && <div className={modalStyles.error}>{formik.errors.linkVideo}</div>}
                    </div>
                    {/* Input para calendar */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="calendar" className={modalStyles.label}>
                            Calendario:
                        </label>
                        <select
                            id="calendar"
                            name="calendar"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.calendar}
                            className={`${modalStyles.input} ${formik.touched.calendar && formik.errors.calendar ? "border-red-500" : ""}`}
                        >
                            <option value="SIMPLE">Simple</option>
                            <option value="FULL">Completo</option>
                        </select>
                        {formik.touched.calendar && formik.errors.calendar && <div className={modalStyles.error}>{formik.errors.calendar}</div>}
                    </div>

                    {/* Input para Tags */}
                    <div className={modalStyles.inputGroup}>
                        <label htmlFor="tags" className={modalStyles.label}>
                            Etiquetas:
                        </label>
                        <input
                            type="text"
                            id="tags"
                            className={modalStyles.input}
                            placeholder="Añadir etiqueta"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                        <div className={modalStyles.tagContainer}>
                            {tags.map((tag, index) => (
                                <span key={index} className={modalStyles.tag}>
                                    {tag}
                                    <button type="button" className={modalStyles.tagRemoveButton} onClick={() => handleRemoveTag(tag)}>
                                        X
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={modalStyles.buttonContainer}>
                        <button type="submit" className={modalStyles.saveButton}>
                            Guardar
                        </button>
                        <button type="button" onClick={onClose} className={modalStyles.cancelButton}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
