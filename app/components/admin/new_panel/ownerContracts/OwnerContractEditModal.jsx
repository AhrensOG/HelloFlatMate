"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase/config";
import Link from "next/link";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
};

const OwnerContractEditModal = ({ contract, onClose, mutate }) => {
  const handleSubmit = async (values) => {
    const toastId = toast.loading("Actualizando contrato...");
    try {
      const timestamp = Date.now();
      const ownerFdoDataSanitized = values.ownerFdoData.replace(/\s+/g, "_");
      const folderPath = `Contratos_Propietarios/${ownerFdoDataSanitized}/${values.startDate}-${values.endDate}`;

      let originalPdfUrl = contract.originalPdfUrl;
      if (values.fileOriginal) {
        const originalRef = ref(
          storage,
          `${folderPath}/not_signed_${ownerFdoDataSanitized}_${timestamp}.pdf`
        );
        await uploadBytes(originalRef, values.fileOriginal, {
          contentType: "application/pdf",
        });
        originalPdfUrl = await getDownloadURL(originalRef);
      }

      let signedPdfUrl = contract.signedPdfUrl;
      if (values.fileSigned) {
        const signedRef = ref(
          storage,
          `${folderPath}/${ownerFdoDataSanitized}_${timestamp}.pdf`
        );
        await uploadBytes(signedRef, values.fileSigned, {
          contentType: "application/pdf",
        });
        signedPdfUrl = await getDownloadURL(signedRef);
      }

      const payload = {
        id: contract.id,
        status: values.status,
        isSigned: values.isSigned,
        startDate: values.startDate,
        endDate: values.endDate,
        originalPdfUrl,
        signedPdfUrl,
        ownerFdoData: values.ownerFdoData,
        hfmFdoData: values.hfmFdoData,
        signedAt: values.signedAt || null,
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
          className="absolute top-1 right-1 bg-gray-200 rounded-full w-6 h-6 text-sm flex items-center justify-center">
          X
        </button>
        <h2 className="text-lg font-semibold pb-4">Editar Contrato</h2>

        <Formik
          initialValues={{
            status: contract.status,
            isSigned: contract.isSigned,
            startDate: contract.startDate?.split("T")[0] || "",
            endDate: contract.endDate?.split("T")[0] || "",
            originalPdfUrl: contract.originalPdfUrl || "",
            signedPdfUrl: contract.signedPdfUrl || "",
            ownerFdoData: contract.ownerFdoData || "",
            hfmFdoData:
              contract.hfmFdoData || "Alberto Borrás López Administrador",
            signedAt: contract.signedAt
              ? new Date(contract.signedAt).toISOString().slice(0, 16)
              : "",
            fileOriginal: null,
            fileSigned: null,
          }}
          onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
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
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="text-sm font-light">Fecha de firma</label>
                <Field
                  type="datetime-local"
                  name="signedAt"
                  className="w-full border p-2"
                />
              </div>

              {values.originalPdfUrl && (
                <div className="flex flex-col">
                  <label className="text-sm font-light">
                    Contrato original actual
                  </label>
                  <Link
                    href={values.originalPdfUrl}
                    target="_blank"
                    className="text-blue-500 underline">
                    Ver contrato
                  </Link>
                </div>
              )}

              <div>
                <label className="text-sm font-light">
                  Reemplazar contrato original (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setFieldValue("fileOriginal", e.currentTarget.files[0])
                  }
                  className="w-full border p-2"
                />
              </div>

              {values.signedPdfUrl && (
                <div className="flex flex-col">
                  <label className="text-sm font-light">
                    Contrato firmado actual
                  </label>
                  <Link
                    href={values.signedPdfUrl}
                    target="_blank"
                    className="text-blue-500 underline">
                    Ver contrato
                  </Link>
                </div>
              )}

              <div>
                <label className="text-sm font-light">
                  Reemplazar contrato firmado (PDF)
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
