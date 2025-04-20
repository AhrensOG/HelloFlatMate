"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import axios from "axios";
import formatDateToDDMMYYYY from "../utils/formatDate";

const EditMaintenanceModal = ({ task, workers, onClose, mutate }) => {
  const [workerSearch, setWorkerSearch] = useState("");
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const handleSearch = (query, list, keyFields, setFiltered) => {
    const lowerQuery = query.toLowerCase();
    if (!lowerQuery) return setFiltered([]);
    setFiltered(
      list?.filter((item) =>
        keyFields.some((key) => item[key]?.toLowerCase().includes(lowerQuery))
      )
    );
  };

  const handleWorkerSelect = (worker, setFieldValue) => {
    setFieldValue("workerId", worker.id);
    setWorkerSearch(`${worker.name} ${worker.lastName}`);
    setFilteredWorkers([]);
  };

  const handleSubmit = async (values) => {
    const toastId = toast.loading("Actualizando tarea...");
    try {
      const payload = {
        ...values,
      };
      await axios.put(`/api/admin/to_do?id=${task.id}`, payload);
      await mutate();
      toast.success("Tarea actualizada correctamente", { id: toastId });
      onClose();
    } catch (error) {
      toast.error("Error al actualizar tarea", {
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
        <h2 className="text-lg font-semibold pb-4">Editar Tarea</h2>

        <Formik
          initialValues={{
            ...task,
            startDate: task.startDate?.slice(0, 16) || "",
            endDate: task.endDate?.slice(0, 16) || "",
            reprogrammedStartDate:
              task.reprogrammedStartDate?.slice(0, 16) || "",
            reprogrammedEndDate: task.reprogrammedEndDate?.slice(0, 16) || "",
          }}
          onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Trabajador */}
              <div className="relative">
                <label className="text-xs font-light">
                  Trabajador{" "}
                  {task.workerId && `- Actual: (${task.worker?.name})`}
                </label>
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

              {/* Campos editables */}

              <div>
                <label className="text-xs font-light">Título</label>
                <Field
                  name="title"
                  placeholder="Título"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">Descripción</label>
                <Field
                  as="textarea"
                  name="body"
                  placeholder="Descripción"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">Estado de la tarea</label>
                <Field name="status" as="select" className="w-full border p-2">
                  <option value="">Horario preferido</option>
                  <option value="PENDING">Pendiente</option>
                  <option value="IN_PROGRESS">En progreso</option>
                  <option value="COMPLETED">Completada</option>
                  <option value="CANCELLED">Cancelada</option>
                </Field>
              </div>
              <div>
                <label className="text-xs font-light">Fecha de inicio</label>
                <Field
                  type="datetime-local"
                  name="startDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">
                  Fecha de finalización
                </label>
                <Field
                  type="datetime-local"
                  name="endDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">
                  Mensaje del inquilino
                </label>
                <Field
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
                name="preferredTimeSlot"
                as="select"
                className="w-full border p-2">
                <option value="">Horario preferido</option>
                <option value="MORNING">Mañana</option>
                <option value="AFTERNOON">Tarde</option>
              </Field>
              <Field
                name="incidentSite"
                as="select"
                className="w-full border p-2">
                <option value="">Sitio del incidente</option>
                <option value="MY_ROOM">Mi habitación</option>
                <option value="KITCHEN">Cocina</option>
                <option value="LIVING_ROOM">Sala de estar</option>
                <option value="WC1">Baño 1</option>
                <option value="WC2">Baño 2</option>
                <option value="HALLWAY_COMMON_AREAS">
                  Pasillos / Zonas comunes
                </option>
                <option value="OTHERS">Otros</option>
              </Field>
              <Field
                name="incidentType"
                as="select"
                className="w-full border p-2">
                <option value="">Tipo de tarea</option>
                <option value="ELECTRICITY">Electricidad</option>
                <option value="CARPENTRY">Carpintería</option>
                <option value="LOCKSMITHING">Cerrajería</option>
                <option value="PLUMBING">Fontanería</option>
                <option value="GLAZING">Cristalería</option>
                <option value="WIFI">Wi-Fi</option>
                <option value="APPLIANCES">Electrodomésticos</option>
                <option value="FURNITURE">Mobiliario</option>
                <option value="OTHERS">Otros</option>
              </Field>
              <label className="flex gap-2 items-center">
                <Field type="checkbox" name="emergency" />
                Marcar como urgente
              </label>
              <Field
                name="responsibility"
                as="select"
                className="w-full border p-2">
                <option value="">Responsabilidad</option>
                <option value="CLIENT">Inquilino</option>
                <option value="OWNER">Propietario</option>
              </Field>

              <div>
                <label className="text-xs font-light">Importe</label>
                <Field
                  type="number"
                  name="amount"
                  placeholder="Importe (€)"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">
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
                <label className="text-xs font-light">
                  Comentario de finalización
                </label>
                <Field
                  as="textarea"
                  name="closingComments"
                  placeholder="Comentario final"
                  className="w-full border p-2"
                />
              </div>
              <label className="flex gap-2 items-center">
                <Field type="checkbox" name="reprogrammed" />
                ¿Reprogramar?
              </label>

              <div>
                <label className="text-xs font-light">
                  Fecha de inciio reprogramada
                </label>
                <Field
                  type="datetime-local"
                  name="reprogrammedStartDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">
                  Fecha de finalización reprogramada
                </label>
                <Field
                  type="datetime-local"
                  name="reprogrammedEndDate"
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="text-xs font-light">
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
                <label className="text-xs font-light">
                  Motivo de cancelación
                </label>
                <Field
                  as="textarea"
                  name="cancellationReason"
                  placeholder="Motivo de cancelación"
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

export default EditMaintenanceModal;
