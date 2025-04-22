"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { uploadFiles } from "@/app/firebase/uploadFiles";

const CATEGORY_LABELS = {
  HELLO_LANDLORD: "Contrato hellolandlord",
  HELLO_ROOM: "Contrato helloroom",
};

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
};

const CreateOwnerContractModal = ({ owners, onClose, mutate }) => {
  const [ownerSearch, setOwnerSearch] = useState("");
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomPrice, setRoomPrice] = useState("");

  const handleSearch = (query, list, keyFields, setFiltered) => {
    const lowerQuery = query.toLowerCase();
    if (!lowerQuery) return setFiltered([]);
    setFiltered(
      list?.filter((item) =>
        keyFields.some((key) => item[key]?.toLowerCase().includes(lowerQuery))
      )
    );
  };

  const handleOwnerSelect = (owner, setFieldValue) => {
    setFieldValue("ownerId", owner.id);
    setOwnerSearch(`${owner.name} ${owner.lastName}`);
    setFilteredOwners([]);
    setSelectedProperties(owner.properties || []);
  };

  const handlePropertySelect = (e, setFieldValue) => {
    setFieldValue("propertyId", e.target.value);
  };

  const handleAddRoom = () => {
    if (!roomNumber || !roomPrice) return;
    setRooms((prev) => [
      ...prev,
      { roomNumber: parseInt(roomNumber), price: parseFloat(roomPrice) },
    ]);
    setRoomNumber("");
    setRoomPrice("");
  };

  const handleRemoveRoom = (index) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    const toastId = toast.loading("Creando contrato...");
    try {
      let imageUrl = null;
      if (values.file) {
        const uploaded = await uploadFiles(
          [values.file],
          "Contratos_Propietarios"
        );
        imageUrl = uploaded[0]?.url || null;
      }

      const payload = {
        ...values,
        url: imageUrl,
        rooms: values.category !== "HELLO_ROOM" ? rooms : undefined,
      };
      await axios.post("/api/admin/ownerContracts", payload);
      await mutate();
      toast.success("Contrato creado correctamente", { id: toastId });
      onClose();
    } catch (err) {
      toast.error("Error al crear el contrato", {
        id: toastId,
        description: "Revisa los campos e intenta nuevamente.",
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[95%] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 bg-gray-200 rounded-full w-5 h-5 text-sm flex items-center justify-center">
          X
        </button>
        <h2 className="text-lg font-semibold pb-4">
          Crear Contrato de Propietario
        </h2>

        <Formik
          initialValues={{
            ownerId: "",
            propertyId: "",
            category: "HELLO_LANDLORD",
            status: "PENDING",
            isSigned: false,
            startDate: "",
            endDate: "",
            durationMonths: 12,
            iban: "",
            fixedMonthlyRentPerRoom: "",
            fixedMonthlyRentTotal: "",
            includesPremiumServices: false,
            url: "",
            isSigned: false,
            file: null,
            hfm_retributions: null,
          }}
          onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              {/* Owner */}
              <div className="relative">
                <label className="text-xs font-light">Propietario</label>
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={ownerSearch}
                  onChange={(e) => {
                    setOwnerSearch(e.target.value);
                    handleSearch(
                      e.target.value,
                      owners,
                      ["name", "lastName", "email"],
                      setFilteredOwners
                    );
                  }}
                  className="outline-none border p-2 w-full"
                />
                {filteredOwners.length > 0 && (
                  <ul className="absolute top-full mt-1 w-full max-h-40 overflow-y-auto border bg-white z-10">
                    {filteredOwners.map((o) => (
                      <li
                        key={o.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleOwnerSelect(o, setFieldValue)}>
                        {o.name} {o.lastName} - {o.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Property */}
              {selectedProperties.length > 0 && (
                <div>
                  <label className="text-xs font-light">Propiedad</label>
                  <Field
                    as="select"
                    name="propertyId"
                    className="w-full border p-2"
                    onChange={(e) => handlePropertySelect(e, setFieldValue)}>
                    <option value="">Seleccionar propiedad</option>
                    {selectedProperties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.serial}
                      </option>
                    ))}
                  </Field>
                </div>
              )}

              <div>
                <label className="text-xs font-light">Tipo de contrato</label>
                <Field
                  as="select"
                  name="category"
                  className="w-full border p-2">
                  <option value="">Contrato</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Field>
              </div>

              <div>
                <label className="text-xs font-light">
                  Estado del contrato
                </label>
                <Field as="select" name="status" className="w-full border p-2">
                  <option value="">Estado</option>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex gap-2">
                <Field
                  type="checkbox"
                  name="isSigned"
                  className="border p-2 size-5"
                />
                <label className="text-sm font-light">¿Esta firmado?</label>
              </div>

              <div>
                <label className="text-xs font-light">IBAN (Opcional)</label>
                <Field
                  type="text"
                  name="iban"
                  placeholder="IBAN"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">
                  Duración del contrato (en meses)
                </label>
                <Field
                  type="number"
                  name="durationMonths"
                  placeholder="Duración en meses"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="text-sm font-light">Fecha de inicio</label>
                <Field
                  type="date"
                  name="startDate"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="text-sm font-light">
                  Fecha de finalización
                </label>
                <Field
                  type="date"
                  name="endDate"
                  className="w-full border p-2"
                />
              </div>

              {values.category === "HELLO_ROOM" ? (
                <>
                  <div>
                    <label className="text-sm font-light">
                      Renta mensual por habitación
                    </label>
                    <Field
                      type="number"
                      step="0.01"
                      name="fixedMonthlyRentPerRoom"
                      placeholder="Renta mensual por habitación (HELLO_ROOM)"
                      className="w-full border p-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-light">
                      Total mensual con ocupación completa
                    </label>
                    <Field
                      type="number"
                      step="0.01"
                      name="fixedMonthlyRentTotal"
                      placeholder="Total mensual con ocupación completa"
                      className="w-full border p-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-light">
                      Retribución para helloflatmate
                    </label>
                    <Field
                      type="number"
                      name="hfm_retributions"
                      placeholder="Retribución para helloflatmate"
                      className="w-full border p-2"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-sm font-light">
                    Habitaciones del contrato
                  </label>
                  <div className="flex gap-2 items-end">
                    <div className="flex flex-col w-full">
                      <label className="text-sm font-light">
                        Habitación Nº
                      </label>

                      <input
                        type="number"
                        placeholder="Room Nº"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm font-light">Precio</label>

                      <input
                        type="number"
                        placeholder="Precio"
                        value={roomPrice}
                        onChange={(e) => setRoomPrice(e.target.value)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddRoom}
                      className="text- px-4 rounded pb-2">
                      <PlusIcon className="size-6 text-green-600" />
                    </button>
                  </div>
                  {rooms.length > 0 && (
                    <ul className="divide-y border rounded-lg mt-2">
                      {rooms.map((room, index) => (
                        <li
                          key={index}
                          className="p-2 flex justify-between text-sm font-light">
                          Habitación {room.roomNumber} - {room.price} €
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemoveRoom(index)}>
                            Eliminar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-light">
                  Subir contrato firmado
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFieldValue("file", e.currentTarget.files[0])
                  }
                  className="w-full border p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 w-full">
                Crear Contrato
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateOwnerContractModal;
