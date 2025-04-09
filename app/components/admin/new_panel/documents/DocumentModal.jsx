import React, { useState, useCallback } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { toast } from "sonner";

const DocumentModal = ({ document, onClose, mutate }) => {
    const [newFileName, setNewFileName] = useState(document.name);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { id, documentableId, leaseOrderId, type, url } = document;
    const client = document.client;

    const { name, lastName, idNum, country, reasonForValencia, reasonForValenciaOther, personalReview, phone, email, birthDate } = client || {};

    const handleFileUpload = useCallback(
        async (files) => {
            setUploading(true);
            setUploadProgress(0);

            try {
                // Usar la función uploadFiles para subir los archivos
                const uploadedFiles = await uploadFiles(files, "Documentos", document.name); // Pasar el array de archivos

                if (uploadedFiles instanceof Error) {
                    // Manejar error de subida
                    setUploading(false);
                    console.error("Error subiendo los archivos:", uploadedFiles);
                    alert("Error subiendo los archivos. Por favor, intenta de nuevo.");
                    return;
                }

                // Obtener las URLs de los archivos subidos
                const downloadURLs = uploadedFiles.map((file) => file.url); // Obtener las URLs

                // Construir el objeto de actualización basado en document.type
                let updateData = { id: document.id, urls: downloadURLs };

                const response = await axios.patch(`/api/admin/document`, updateData);
                await mutate()
                if (response.status === 200) {
                    toast.success("Documento actualizado conxito!");
                } else {
                    console.error("Error al actualizar el documento:", response.status);
                }
            } catch (error) {
                toast.info("Ocurrio un error al actualizar el documento.");
                console.error("Error actualizando el documento:", error);
            } finally {
                setUploading(false);
            }
        },
        [documentableId, document]
    );

    const handleNameChange = (e) => {
        setNewFileName(e.target.value);
    };

    const handleNameUpdate = async () => {
        try {
            const response = await axios.patch(`/api/admin/document`, {
                id,
                name: newFileName,
            });
            if (response.status === 200) {
                toast.success("Documento actualizado con éxito!");
            }
        } catch (error) {
            toast.info("Ocurrio un error al actualizar el documento.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
            {/* Contenedor principal */}
            <div className="bg-white w-full max-w-md mx-auto rounded shadow p-6 relative text-sm z-50">
                {/* Botón de Cerrar */}
                <button onClick={onClose} className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    X
                </button>

                <h2 className="text-lg font-bold mb-4">Detalle del Documento</h2>

                <p>
                    <strong>Usuario:</strong> {name} {lastName} (ID: {documentableId})
                </p>
                <p>
                    <strong>Orden de Alquiler:</strong> {leaseOrderId}
                </p>

                <div className="mb-4">
                    <label htmlFor="documentName" className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre del Documento:
                    </label>
                    <input
                        type="text"
                        id="documentName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newFileName}
                        onChange={handleNameChange}
                    />
                    <button onClick={handleNameUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Actualizar Nombre
                    </button>
                </div>

                {type !== "CONTRACT" && (
                    <div>
                        <label htmlFor="fileUpload" className="block text-gray-700 text-sm font-bold mb-2">
                            {type === "IDENTIFICATION" ? "Subir hasta 2 archivos:" : "Reemplazar archivo actual:"}
                        </label>
                        <input
                            type="file"
                            id="fileUpload"
                            accept="image/*,.pdf"
                            multiple={type === "IDENTIFICATION"}
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const filesArray = Array.from(e.target.files);

                                    if (type === "IDENTIFICATION" && filesArray.length > 2) {
                                        alert("Solo puedes subir hasta 2 archivos para documentos de identificación.");
                                        e.target.value = null; // Limpiar la selección de archivos
                                        return;
                                    }

                                    handleFileUpload(filesArray);
                                }
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        {uploading && (
                            <div>
                                <p>Subiendo... {uploadProgress.toFixed(2)}%</p>
                            </div>
                        )}
                    </div>
                )}

                <hr className="my-4" />

                <h3 className="text-lg font-semibold mb-2">Datos del usuario</h3>
                {client ? (
                    <div className="space-y-1 text-">
                        <p>
                            <strong>Nombre:</strong> {name}
                        </p>
                        <p>
                            <strong>Apellido:</strong> {lastName}
                        </p>
                        <p>
                            <strong>ID Num:</strong> {idNum}
                        </p>
                        <p>
                            <strong>País:</strong> {country}
                        </p>
                        <p>
                            <strong>Razón Valencia:</strong> {reasonForValencia} {reasonForValenciaOther && `(${reasonForValenciaOther})`}
                        </p>
                        <p>
                            <strong>Review Personal:</strong> {personalReview}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {phone}
                        </p>
                        <p>
                            <strong>Email:</strong> {email}
                        </p>
                        <p>
                            <strong>Fecha de nacimiento:</strong> {formatDateToDDMMYYYY(birthDate)}
                        </p>
                    </div>
                ) : (
                    <p>No hay datos del usuario.</p>
                )}
            </div>
        </div>
    );
};

export default DocumentModal;
