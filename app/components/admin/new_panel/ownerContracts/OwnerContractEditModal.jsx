"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import Link from "next/link";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
};

const CATEGORY_LABELS = {
  HELLO_LANDLORD: "Contrato hellolandlord",
  HELLO_ROOM: "Contrato helloroom",
};

const OwnerContractEditModal = ({ contract, onClose, mutate }) => {
  const [rooms, setRooms] = useState(contract.rooms || []);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomPrice, setRoomPrice] = useState("");

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
    const toastId = toast.loading("Actualizando contrato...");
    try {
      let imageUrl = contract.url;
      if (values.file) {
        const uploaded = await uploadFiles(
          [values.file],
          "Contratos_Propietarios"
        );
        imageUrl = uploaded[0]?.url || null;
      }

      const payload = {
        ...values,
        id: contract.id,
        url: imageUrl,
        rooms: contract.category !== "HELLO_ROOM" ? rooms : undefined,
      };
      await axios.put(`/api/admin/ownerContracts`, payload);
      await mutate();
      toast.success("Contrato actualizado correctamente", { id: toastId });
      onClose();
    } catch (err) {
      toast.error("Error al actualizar el contrato", {
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
        <h2 className="text-lg font-semibold pb-4">Editar Contrato</h2>

        <Formik
          initialValues={{
            owner: contract.owner.name + " " + contract.owner.lastName,
            property: contract.property.serial,
            categoryLabel: CATEGORY_LABELS[contract.category],
            status: contract.status,
            isSigned: contract.isSigned,
            startDate: contract.startDate?.split("T")[0] || "",
            endDate: contract.endDate?.split("T")[0] || "",
            durationMonths: contract.durationMonths,
            iban: contract.iban || "",
            fixedMonthlyRentPerRoom: contract.fixedMonthlyRentPerRoom || "",
            fixedMonthlyRentTotal: contract.fixedMonthlyRentTotal || "",
            includesPremiumServices: contract.includesPremiumServices,
            url: contract.url || "",
            file: null,
            hfm_retributions: contract.hfm_retributions || null,
          }}
          onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div className="flex flex-col w-full">
                <label className="text-xs font-light">Propietario</label>
                <Field
                  type="text"
                  name="owner"
                  disabled={true}
                  className="border p-2"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-xs font-light">Propiedad</label>
                <Field
                  type="text"
                  name="property"
                  disabled={true}
                  className="border p-2"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-xs font-light">Tipo de contrato</label>
                <Field
                  type="text"
                  name="categoryLabel"
                  disabled={true}
                  className="border p-2"
                />
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
                <label className="text-sm font-light">¿Está firmado?</label>
              </div>

              <div>
                <label className="text-xs font-light">IBAN</label>
                <Field type="text" name="iban" className="w-full border p-2" />
              </div>

              <div>
                <label className="text-xs font-light">Duración (meses)</label>
                <Field
                  type="number"
                  name="durationMonths"
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

              {contract.category === "HELLO_ROOM" ? (
                <>
                  <div>
                    <label className="text-sm font-light">
                      Renta mensual por habitación
                    </label>
                    <Field
                      type="number"
                      step="0.01"
                      name="fixedMonthlyRentPerRoom"
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
                      className="w-full border p-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-light">
                      Retribución para helloflatmate
                    </label>
                    <Field
                      type="number"
                      step="0.01"
                      name="hfm_retributions"
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
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm font-light">Precio</label>
                      <input
                        type="number"
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

              <div className="flex flex-col gap-2">
                <label className="text-sm font-light">Contrato actual</label>
                {contract.url && (
                  <Link
                    href={contract.url}
                    target="_blank"
                    className="w-40 italic font-light text-blue-500 underline">
                    Ver contracto actual
                  </Link>
                )}
              </div>
              <div>
                <label className="text-sm font-light">
                  Remplazar contrato actual
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
                Guardar cambios
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OwnerContractEditModal;
