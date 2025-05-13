"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";

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

  const handleSubmit = async (values) => {
    const toastId = toast.loading("Creando contrato...");
    try {
      let originalPdfUrl = null;
      let signedPdfUrl = null;

      const timestamp = Date.now();
      const startDate = values.startDate;
      const endDate = values.endDate;
      const ownerFdoDataSanitized = values.ownerFdoData.replace(/\s+/g, "_");

      const folderPath = `Contratos_Propietarios/${ownerFdoDataSanitized}/${startDate}-${endDate}`;

      if (values.file) {
        const originalName = `${folderPath}/not_signed_${ownerFdoDataSanitized}_${timestamp}.pdf`;
        const uploaded = await uploadFiles([values.file], originalName);
        originalPdfUrl = uploaded[0]?.url || null;
      }

      if (values.fileSigned) {
        const signedName = `${folderPath}/${ownerFdoDataSanitized}_${timestamp}.pdf`;
        const uploaded = await uploadFiles([values.file], signedName);
        signedPdfUrl = uploaded[0]?.url || null;
      }

      const payload = {
        ownerId: values.ownerId,
        propertyId: values.propertyId,
        status: values.status,
        isSigned: values.isSigned,
        startDate,
        endDate,
        originalPdfUrl,
        signedPdfUrl,
        ownerFdoData: values.ownerFdoData,
        hfmFdoData: values.hfmFdoData,
        signedAt: values.signedAt || null,
      };

      await axios.post("/api/admin/ownerContracts", payload);
      await mutate();
      toast.success("Contrato creado correctamente", { id: toastId });
      onClose();
    } catch (err) {
      console.log(err);
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
            status: "PENDING",
            isSigned: false,
            startDate: "",
            endDate: "",
            file: null,
            fileSigned: null,
            ownerFdoData: "",
            hfmFdoData: "Alberto Borrás López",
            signedAt: "",
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

              {/* Status */}
              <div>
                <label className="text-xs font-light">
                  Estado del contrato
                </label>
                <Field as="select" name="status" className="w-full border p-2">
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

              <div>
                <label className="text-sm font-light">
                  Datos de firma del propietario
                </label>
                <Field
                  type="text"
                  name="ownerFdoData"
                  placeholder="Ej. Juan Pérez González"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="text-sm font-light">
                  Datos de firma HelloFlatmate
                </label>
                <Field
                  type="text"
                  name="hfmFdoData"
                  placeholder="Ej. Alberto Borrás López"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="text-sm font-light">
                  Subir contrato original (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setFieldValue("file", e.currentTarget.files[0])
                  }
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="text-sm font-light">
                  Subir contrato firmado (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setFieldValue("fileSigned", e.currentTarget.files[0])
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
