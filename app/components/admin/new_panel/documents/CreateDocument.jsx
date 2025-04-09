import { uploadFiles } from "@/app/firebase/uploadFiles";
import React, { useState } from "react";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const modalStyles = {
    overlay: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",
    modalContainer: "relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto",
    closeButton: "absolute top-1 right-1 bg-gray-200 rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-gray-300",
    title: "text-lg font-semibold pb-2",
    input: "outline-none border p-2 w-full rounded",
    select: "outline-none border p-2 w-full rounded",
    fileInput: "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none",
    buttonContainer: "flex justify-end gap-2 mt-4",
    saveButton: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600",
    cancelButton: "bg-gray-400 text-white p-2 rounded hover:bg-gray-500",
    userList: "absolute z-10 w-full bg-white border rounded shadow-md max-h-40 overflow-y-auto",
    userItem: "p-2 cursor-pointer hover:bg-gray-100",
};

const validationSchema = Yup.object().shape({
    leaseOrder: Yup.string().required("Seleccionar una orden es obligatorio."),
    images: Yup.mixed().test("is-filelist", "Debes seleccionar hasta 2 imágenes.", (value) => {
        // Verifica que sea un FileList y que tenga máximo 2 archivos
        return value instanceof FileList && value.length <= 2;
    }),
});

export default function CreateDocumentModal({ onClose, users, mutate }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedLeaseOrder, setSelectedLeaseOrder] = useState(null);

    const handleUserSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchValue(query);
        if (!query) return setFilteredUsers([]);
        setFilteredUsers(
            users.filter(
                (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.id.toString().includes(query)
            )
        );
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchValue(`${user.name} - ${user.email}`);
        setFilteredUsers([]);
        setSelectedLeaseOrder(null); // Reset lease order when user is selected
    };

    const handleUploadImage = async (files) => {
        try {
            const uploadedFile = await uploadFiles(files, "Documentos");
            return uploadedFile; // Return uploaded files for form submission
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Guardando...");
        try {
            const uploadedImages = await handleUploadImage(values.images);
            const response = await axios.post("/api/admin/document", {
                name: `Nómina / Matrícula`,
                urls: uploadedImages.map((doc) => doc.url),
                type: "ROSTER",
                documentableId: selectedUser.id,
                documentableType: "CLIENT",
                leaseOrderId: values.leaseOrder,
                leaseOrderType: "ROOM",
            });
            await mutate();
            toast.success("Datos guardados correctamente.", { id: toastId });
            onClose();
        } catch (error) {
            toast.info("Error al guardar los datos.", { id: toastId });
        }
    };

    return (
        <div className={modalStyles.overlay} onClick={onClose}>
            <div className={modalStyles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={modalStyles.closeButton}>
                    X
                </button>
                <h2 className={modalStyles.title}>Crear Nuevo Registro</h2>

                <Formik initialValues={{ name: "", leaseOrder: "", images: null }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="mb-4 relative">
                                <label className="text-xs font-light">Buscar Usuario</label>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, email o ID"
                                    className={modalStyles.input}
                                    value={searchValue}
                                    onChange={handleUserSearch}
                                />
                                {filteredUsers.length > 0 && (
                                    <ul className={modalStyles.userList}>
                                        {filteredUsers.map((user) => (
                                            <li key={user.id} className={modalStyles.userItem} onClick={() => handleUserSelect(user)}>
                                                {user.name} - {user.email}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Orden de Alquiler</label>
                                <Field
                                    as="select"
                                    name="leaseOrder"
                                    className={modalStyles.select}
                                    onChange={(e) => {
                                        const selectedOrder = selectedUser.leaseOrdersRoom.find((order) => order.id === e.target.value);
                                        setSelectedLeaseOrder(selectedOrder); // Set the selected lease order
                                        setFieldValue("leaseOrder", e.target.value); // Set the field value for Formik
                                        console.log(selectedOrder);
                                    }}
                                >
                                    <option value="">Seleccionar Orden</option>
                                    {selectedUser &&
                                        selectedUser.leaseOrdersRoom.map((order) => (
                                            <option key={order.id} value={order.id}>
                                                {order.room?.serial}
                                            </option>
                                        ))}
                                </Field>
                                <ErrorMessage name="leaseOrder" component="div" style={{ color: "red" }} />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Subir Imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) => {
                                        const files = event.currentTarget.files;
                                        setFieldValue("images", files); // Mantén FileList tal cual
                                    }}
                                    className={`${modalStyles.fileInput} p-2`}
                                />
                                <ErrorMessage name="images" component="div" style={{ color: "red" }} />
                            </div>

                            <div className={modalStyles.buttonContainer}>
                                <button type="button" className={modalStyles.cancelButton} onClick={onClose}>
                                    Cancelar
                                </button>
                                <button type="submit" className={modalStyles.saveButton}>
                                    Guardar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
