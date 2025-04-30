"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";

const TYPE_OPTIONS = [{ label: "Otros", value: "OTHER" }, {label: "Mantenimiento", value: "MAINTENANCE"}];

const CreateIncidenceModal = ({ owners, properties, toDos, onClose, mutate }) => {
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [ownerSearch, setOwnerSearch] = useState("");
    const [filteredOwners, setFilteredOwners] = useState([]);
    const [ownerProperties, setOwnerProperties] = useState([]);
    const [toDoSearch, setToDoSearch] = useState("");
    const [filteredToDos, setFilteredToDos] = useState([]);

    const handleOwnerSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setOwnerSearch(query);
        if (!query) return setFilteredOwners([]);
        setFilteredOwners(
            owners.filter(
                (o) =>
                    o.name.toLowerCase().includes(query) ||
                    o.lastName.toLowerCase().includes(query) ||
                    o.email.toLowerCase().includes(query)
            )
        );
    };

    const handleOwnerSelect = (owner, setFieldValue) => {
        setSelectedOwner(owner);
        setFieldValue("ownerId", owner.id);
        setOwnerSearch(`${owner.name} ${owner.lastName} - ${owner.email}`);
        setFilteredOwners([]);
        const filteredProperties = properties.filter(
            (p) => p.ownerId === owner.id
        );
        setOwnerProperties(filteredProperties);
    };

    const handleToDoSearch = (e) => {
      const query = e.target.value.toLowerCase();
      setToDoSearch(query);
    
      if (!query) return setFilteredToDos([]);
    
      const filtered = toDos.filter((todo) => {
        const label = `Tarea #${todo.id} - Propiedad asociada ID ${todo.propertyId} | Código ${todo.property.serial}`;
        return label.toLowerCase().includes(query);
      });
    
      setFilteredToDos(filtered);
    };

    const handleToDoSelect = (todo, setFieldValue) => {
      setFieldValue("toDoId", todo.id);
      setToDoSearch(`Tarea #${todo.id} - Propiedad asociada ID ${todo.propertyId} | Código ${todo.property.serial}`);
      setFilteredToDos([]);
    };

    const handlePropertySelect = (e, setFieldValue) => {
        const propertyId = e.target.value;
        setFieldValue("propertyId", propertyId);
    };

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Creando incidencia...");
        try {
            let files = [];
            if (values.bill) {
                files = await uploadFiles([values.bill], "Incidencias");
            }

            await axios.post("/api/admin/incidences", {
                ...values, 
                url: files.length > 0 ? files[0].url : null,
            });
            await mutate();
            toast.success("Incidencia creada correctamente", {
                id: toastId,
            });
            onClose();
        } catch (error) {
            toast.error("Ocurrió un error al crear la incidencia", {
                id: toastId,
            });
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 bg-gray-200 rounded-full w-5 h-5 text-sm flex items-center justify-center"
                >
                    X
                </button>
                <h2 className="text-lg font-semibold pb-2">Crear Incidencia</h2>

                <Formik
                    initialValues={{
                        ownerId: "",
                        propertyId: "",
                        amount: "",
                        date: "",
                        bill: "",
                        type: "",
                        title: "",
                        description: "",
                        status: "",
                        paymentId: "",
                        paymentDate: "",
                        toDoId: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-4">
                            {/* Owner */}
                            <div className="relative">
                                <label className="text-xs font-light">
                                    Propietario
                                </label>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, apellido o email"
                                    value={
                                        selectedOwner
                                            ? selectedOwner.email
                                            : ownerSearch
                                    }
                                    onChange={handleOwnerSearch}
                                    className="outline-none border p-2 w-full"
                                />
                                {filteredOwners.length > 0 && (
                                    <ul className="absolute top-full mt-1 w-full max-h-40 overflow-y-auto border bg-white z-10">
                                        {filteredOwners.map((owner) => (
                                            <li
                                                key={owner.id}
                                                className="p-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOwnerSelect(
                                                        owner,
                                                        setFieldValue
                                                    )
                                                }
                                            >
                                                {owner.name} {owner.lastName} -{" "}
                                                {owner.email}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Property (now a select based on owner selection) */}
                            <div>
                                <label className="text-xs font-light">
                                    Propiedad
                                </label>
                                <Field
                                    as="select"
                                    name="propertyId"
                                    className="outline-none border p-2 w-full"
                                    onChange={(e) =>
                                        handlePropertySelect(e, setFieldValue)
                                    }
                                >
                                    <option value="">
                                        Seleccionar propiedad
                                    </option>
                                    {ownerProperties.map((property) => (
                                        <option
                                            key={property.id}
                                            value={property.id}
                                        >
                                            {property.serial}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            {/* Tipo */}
                            <div>
                                <label className="text-xs font-light">
                                    Tipo
                                </label>
                                <Field
                                    as="select"
                                    name="type"
                                    className="outline-none border p-2 w-full"
                                >
                                    <option value="">Seleccionar tipo</option>
                                    {TYPE_OPTIONS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            {/* STATUS */}
                            <div>
                                <label className="text-xs font-light">
                                    Estado
                                </label>
                                <Field
                                    as="select"
                                    name="status"
                                    className="outline-none border p-2 w-full"
                                >
                                    <option value="">Seleccionar estado</option>
                                    <option value="PENDING">Pendiente</option>
                                    <option value="APPROVED">Pagado</option>
                                </Field>
                            </div>

                            {/* Fecha */}
                            <div>
                                <label className="text-xs font-light">
                                    Fecha
                                </label>
                                <Field
                                    type="date"
                                    name="date"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Importe */}
                            <div>
                                <label className="text-xs font-light">
                                    Importe
                                </label>
                                <Field
                                    type="number"
                                    name="amount"
                                    placeholder="Importe"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Título */}
                            <div>
                                <label className="text-xs font-light">
                                    Título
                                </label>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="Título de la incidencia"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="text-xs font-light">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Descripción de la incidencia"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Payment ID */}
                            <div>
                                <label className="text-xs font-light">
                                    ID De Pago
                                </label>
                                <Field
                                    type="text"
                                    name="paymentId"
                                    placeholder="ID de pago"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* Payment Date */}
                            <div>
                                <label className="text-xs font-light">
                                    Fecha de pago
                                </label>
                                <Field
                                    type="date"
                                    name="paymentDate"
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            {/* ToDoId */}
                            <div className="relative">
                              <label className="text-xs font-light">Tarea relacionada (Opcional)</label>
                              <input
                                type="text"
                                placeholder="Buscar por ID o código de propiedad"
                                value={toDoSearch}
                                onChange={handleToDoSearch}
                                className="outline-none border p-2 w-full"
                              />
                              {filteredToDos.length > 0 && (
                                <ul className="absolute top-full mt-1 w-full max-h-40 overflow-y-auto border bg-white z-10">
                                  {filteredToDos.map((todo) => (
                                    <li
                                      key={todo.id}
                                      className="p-2 cursor-pointer hover:bg-gray-100"
                                      onClick={() => handleToDoSelect(todo, setFieldValue)}
                                    >
                                      Tarea #{todo.id} - Propiedad {todo.property.serial}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>


                            {/* Archivo bill */}
                            <div>
                                <label className="text-xs font-light">
                                    Factura
                                </label>
                                <input
                                    type="file"
                                    name="bill"
                                    onChange={(event) =>
                                        setFieldValue(
                                            "bill",
                                            event.currentTarget.files[0]
                                        )
                                    }
                                    className="outline-none border p-2 w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 w-full"
                            >
                                Crear Incidencia
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateIncidenceModal;
