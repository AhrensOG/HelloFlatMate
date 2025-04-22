"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import formatDateToDDMMYYYY from "../utils/formatDate";

const INCIDENT_TYPE_LABELS = {
  ELECTRICITY: "Electricidad",
  CARPENTRY: "Carpintería",
  LOCKSMITHING: "Cerrajería",
  PLUMBING: "Fontanería",
  GLAZING: "Cristalería",
  WIFI: "Wi-Fi",
  APPLIANCES: "Electrodomésticos",
  FURNITURE: "Mobiliario",
  OTHERS: "Otros",
};

const INCIDENT_SITE_LABELS = {
  MY_ROOM: "Mi habitación",
  KITCHEN: "Cocina",
  LIVING_ROOM: "Sala de estar",
  WC1: "Baño 1",
  WC2: "Baño 2",
  HALLWAY_COMMON_AREAS: "Pasillos / Zonas comunes",
  OTHERS: "Otros",
};

const PREFERRED_TIME_SLOT_LABELS = {
  MORNING: "Mañana",
  AFTERNOON: "Tarde",
};

const RESPONSIBILITY_LABELS = {
  CLIENT: "Inquilino",
  OWNER: "Propietario",
};

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
};

const CreateMaintenanceModal = ({
  properties,
  workers,
  clients,
  onClose,
  mutate,
}) => {
  const [propertySearch, setPropertySearch] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [workerSearch, setWorkerSearch] = useState("");
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [clientOrders, setClientOrders] = useState([]);

  const handleSearch = (query, list, keyFields, setFiltered) => {
    const lowerQuery = query.toLowerCase();
    if (!lowerQuery) return setFiltered([]);
    console.log(list);
    setFiltered(
      list?.filter((item) =>
        keyFields.some((key) => item[key]?.toLowerCase().includes(lowerQuery))
      )
    );
  };

  const handlePropertySelect = (property, setFieldValue) => {
    setFieldValue("propertyId", property.id);
    setPropertySearch(property.serial);
    setFilteredProperties([]);
  };

  const handleWorkerSelect = (worker, setFieldValue) => {
    setFieldValue("workerId", worker.id);
    setWorkerSearch(`${worker.name} ${worker.lastName}`);
    setFilteredWorkers([]);
  };

  const handleClientSelect = (client, setFieldValue) => {
    setFieldValue("userId", client.id);
    setClientSearch(`${client.name} ${client.lastName} - ${client.email}`);
    setFilteredClients([]);
    setClientOrders(client.leaseOrdersRoom || []);
  };

  const handleOrderSelect = (e, setFieldValue) => {
    setFieldValue("leaseOrderId", e.target.value);
  };

  const handleSubmit = async (values) => {
    const toastId = toast.loading("Creando tarea...");
    try {
      let imageUrl = null;
      let bill = null;
      if (values.image) {
        const uploaded = await uploadFiles(
          [values.image],
          "Tareas_Mantenimiento"
        );
        imageUrl = uploaded[0]?.url || null;
      }

      if (values.billFile) {
        const uploaded = await uploadFiles(
          [values.billFile],
          "Facturas_Tareas"
        );
        bill = uploaded[0]?.url || null;
      }

      const payload = {
        ...values,
        imageUrl,
        bill,
        type: "REPAIR",
        typeUser: "CLIENT",
      };

      await axios.post("/api/admin/to_do", payload);
      await mutate();
      toast.success("Tarea creada correctamente", { id: toastId });
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error al crear la tarea", {
        id: toastId,
        description: "Intenta nuevamente o contacta con el soporte.",
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
          Crear Tarea de Mantenimiento
        </h2>

        <Formik
          initialValues={{
            title: "",
            body: "",
            startDate: "",
            status: "PENDING",
            comment: "",
            clientMessage: "",
            isPresent: true,
            userId: "",
            leaseOrderId: "",
            cancellationReason: "",
            preferredTimeSlot: "",
            incidentSite: "",
            incidentType: "",
            emergency: false,
            reprogrammed: false,
            reprogrammedStartDate: "",
            reprogrammedEndDate: "",
            reprogramingComment: "",
            closingComments: "",
            responsibility: "",
            amount: "",
            workerId: "",
            propertyId: "",
            image: null,
            billFile: null,
          }}
          onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Propiedad */}
              <div className="relative">
                <label className="text-xs font-light">Propiedad</label>
                <input
                  type="text"
                  placeholder="Buscar por código de propiedad"
                  value={propertySearch}
                  onChange={(e) => {
                    setPropertySearch(e.target.value);
                    handleSearch(
                      e.target.value,
                      properties,
                      ["serial"],
                      setFilteredProperties
                    );
                  }}
                  className="outline-none border p-2 w-full"
                />
                {filteredProperties.length > 0 && (
                  <ul className="absolute top-full mt-1 w-full max-h-40 overflow-y-auto border bg-white z-10">
                    {filteredProperties.map((p) => (
                      <li
                        key={p.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handlePropertySelect(p, setFieldValue)}>
                        {p.serial}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Trabajador */}
              <div className="relative">
                <label className="text-xs font-light">Trabajador</label>
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={workerSearch}
                  onChange={(e) => {
                    setWorkerSearch(e.target.value);
                    handleSearch(
                      e.target.value,
                      workers,
                      ["name", "lastName"],
                      setFilteredWorkers
                    );
                  }}
                  className="outline-none border p-2 w-full"
                />
                {filteredWorkers.length > 0 && (
                  <ul className="absolute top-full mt-1 w-full max-h-40 overflow-y-auto border bg-white z-10">
                    {filteredWorkers.map((w) => (
                      <li
                        key={w.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleWorkerSelect(w, setFieldValue)}>
                        {w.name} {w.lastName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cliente */}
              <div className="relative">
                <label className="text-xs font-light">Cliente</label>
                <input
                  type="text"
                  placeholder="Buscar cliente por nombre o email"
                  value={clientSearch}
                  onChange={(e) => {
                    setClientSearch(e.target.value);
                    handleSearch(
                      e.target.value,
                      clients,
                      ["name", "lastName", "email"],
                      setFilteredClients
                    );
                  }}
                  className="outline-none border p-2 w-full"
                />
                {filteredClients.length > 0 && (
                  <ul className="absolute top-full mt-1 w-full max-h-40 overflow-y-auto border bg-white z-10">
                    {filteredClients.map((c) => (
                      <li
                        key={c.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleClientSelect(c, setFieldValue)}>
                        {c.name} {c.lastName} - {c.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Lease Order */}
              {clientOrders.length > 0 && (
                <div>
                  <label className="text-xs font-light">
                    Orden de alquiler
                  </label>
                  <Field
                    as="select"
                    name="leaseOrderId"
                    className="outline-none border p-2 w-full"
                    onChange={(e) => handleOrderSelect(e, setFieldValue)}>
                    <option value="">Seleccionar orden</option>
                    {clientOrders.map((o) => (
                      <option key={o.id} value={o.id}>
                        #{o.id} - Habitación {o.room?.serial || "-"} |{" "}
                        {formatDateToDDMMYYYY(o.startDate)} a{" "}
                        {formatDateToDDMMYYYY(o.endDate)}
                      </option>
                    ))}
                  </Field>
                </div>
              )}
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Estado de la tarea
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

              <Field
                name="title"
                placeholder="Título"
                className="w-full border p-2"
              />
              <Field
                as="textarea"
                name="body"
                placeholder="Descripción"
                className="w-full border p-2"
              />

              <div>
                <label className="flex gap-2 items-center text-sm">
                  Fecha de inicio
                </label>
                <Field
                  type="datetime-local"
                  name="startDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Fecha de finalización
                </label>
                <Field
                  type="datetime-local"
                  name="endDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Mensaje del cliente
                </label>
                <Field
                  type="text"
                  name="clientMessage"
                  placeholder="Mensaje del cliente"
                  className="w-full border p-2"
                />
              </div>

              <label className="flex gap-2 items-center">
                <Field type="checkbox" name="isPresent" />
                El cliente estará presente
              </label>

              <Field
                as="select"
                name="preferredTimeSlot"
                className="w-full border p-2">
                <option value="">Horario preferido</option>
                {Object.entries(PREFERRED_TIME_SLOT_LABELS).map(
                  ([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  )
                )}
              </Field>

              <Field
                as="select"
                name="incidentSite"
                className="w-full border p-2">
                <option value="">Sitio del incidente</option>
                {Object.entries(INCIDENT_SITE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Field>

              <Field
                as="select"
                name="incidentType"
                className="w-full border p-2">
                <option value="">Tipo de tarea</option>
                {Object.entries(INCIDENT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Field>

              {/* <label className="flex gap-2 items-center">
                <Field type="checkbox" name="emergency" />
                Marcar como urgente
              </label> */}

              <Field
                as="select"
                name="responsibility"
                className="w-full border p-2">
                <option value="">Responsabilidad</option>
                {Object.entries(RESPONSIBILITY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Field>

              <Field
                type="number"
                name="amount"
                placeholder="Importe (€)"
                className="w-full border p-2"
              />

              {/* Comentarios internos */}
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Comentario del trabajador
                </label>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comentario del trabajador"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Comentario de finalización
                </label>
                <Field
                  as="textarea"
                  name="closingComments"
                  placeholder="Comentario final (opcional)"
                  className="w-full border p-2"
                />
              </div>

              <label className="flex gap-2 items-center">
                <Field type="checkbox" name="reprogrammed" />
                ¿Reprogramar?
              </label>
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Fecha de inicio de reprogramación
                </label>
                <Field
                  type="datetime-local"
                  name="reprogrammedStartDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm">
                  Fecha de fin de reprogramación
                </label>
                <Field
                  type="datetime-local"
                  name="reprogrammedEndDate"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="flex gap-2 items-center text-sm">
                  Motivo de reprogramación
                </label>
                <Field
                  as="textarea"
                  name="reprogramingComment"
                  placeholder="Motivo de reprogramación"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="flex gap-2 items-center text-sm">
                  Motivo de cancelación
                </label>
                <Field
                  as="textarea"
                  name="cancellationReason"
                  placeholder="Motivo de reprogramación"
                  className="w-full border p-2"
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="text-xs font-light">
                  Imagen o video (opcional)
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFieldValue("image", e.currentTarget.files[0])
                  }
                  className="w-full border p-2"
                />
              </div>

              {/* BillFile */}
              <div>
                <label className="text-xs font-light">Factura (opcional)</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFieldValue("billFile", e.currentTarget.files[0])
                  }
                  className="w-full border p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 w-full">
                Crear Tarea
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateMaintenanceModal;
