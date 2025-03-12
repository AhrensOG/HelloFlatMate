import React, { useState } from "react";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";

const modalStyles = {
    overlay: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",
    modalContainer: "relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto",
    closeButton: "absolute top-1 right-1 bg-gray-200 rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-gray-300",
    title: "text-lg font-semibold pb-2",
    input: "outline-none border p-2 w-full rounded",
    select: "outline-none border p-2 w-full rounded",
    fileInput: "outline-none border p-2 w-full rounded cursor-pointer",
    buttonContainer: "flex justify-end gap-2 mt-4",
    saveButton: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600",
    cancelButton: "bg-gray-400 text-white p-2 rounded hover:bg-gray-500",
    userList: "absolute z-10 w-full bg-white border rounded shadow-md max-h-40 overflow-y-auto",
    userItem: "p-2 cursor-pointer hover:bg-gray-100",
};

const validationSchema = Yup.object().shape({
    leaseOrder: Yup.string().required("Seleccionar una orden es obligatorio."),
    price: Yup.number().required("El precio es obligatorio.").positive("Debe ser un número positivo."),
});

export default function CreateConsumptionsModal({ isOpen, onClose, users, mutate }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    if (!isOpen) return null;

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
    };

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Guardando...");
        try {
            let files = [];
            if (values.bill) {
                files = await uploadFiles([values.bill], "Consumos");
            }
    
            await axios.post("/api/admin/consumptions", {
                amount: values.price,
                type: values.type.toUpperCase(),
                url: files.length > 0 ? files[0].url : null,
                clientId: selectedUser.id,
                leaseOrderId: values.leaseOrder,
            });
    
            toast.success("Datos guardados correctamente.", { id: toastId });
            await mutate();
        } catch (error) {
            console.log(error);
            toast.info("Error al guardar los datos.", { id: toastId });
        }
    };
    

    return (
        <div className={modalStyles.overlay} onClick={onClose}>
            <div className={modalStyles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={modalStyles.closeButton}>X</button>
                <h2 className={modalStyles.title}>Crear Nuevo Registro</h2>

                <Formik 
                    initialValues={{ leaseOrder: "", price: "", type: "", bill: null }} 
                    validationSchema={validationSchema} 
                    onSubmit={handleSubmit}
                >
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
                                <Field as="select" name="leaseOrder" className={modalStyles.select}>
                                    <option value="">Seleccionar Orden</option>
                                    {selectedUser &&
                                        selectedUser.leaseOrdersRoom
                                            .filter((order) => order.status !== "REJECTED")
                                            .map((order) => (
                                                <option key={order.id} value={order.id}>
                                                    {order.room?.serial}
                                                </option>
                                            ))}
                                </Field>
                                <ErrorMessage name="leaseOrder" component="div" style={{ color: "red" }} />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Precio</label>
                                <Field type="number" name="price" className={modalStyles.input} />
                                <ErrorMessage name="price" component="div" style={{ color: "red" }} />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Tipo</label>
                                <Field as="select" name="type" className={modalStyles.select}>
                                    <option value="">Seleccionar Tipo</option>
                                    <option value="GENERAL_SUPPLIES">Suministros</option>
                                    <option value="INTERNET">Wifi</option>
                                    <option value="WATER">Agua</option>
                                    <option value="GAS">Gas</option>
                                    <option value="ELECTRICITY">Electricidad</option>
                                    <option value="OTHER">Otro</option>
                                </Field>
                                <ErrorMessage name="type" component="div" style={{ color: "red" }} />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-light">Factura</label>
                                <input
                                    type="file"
                                    className={modalStyles.fileInput}
                                    onChange={(event) => setFieldValue("bill", event.currentTarget.files[0])}
                                />
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
