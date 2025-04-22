"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useTranslations } from "next-intl";
import { uploadFiles } from "@/app/firebase/uploadFiles";

const TaskManagementPanel = ({ taskId, currentTask, onUpdate }) => {
  const t = useTranslations("worker_panel.tasks.task_details");

  const [startDate, setStartDate] = useState("");
  const [reprogrammedStartDate, setReprogrammedStartDate] = useState("");
  const [amount, setAmount] = useState(
    currentTask.amount !== null && currentTask.amount !== undefined
      ? currentTask.amount
      : ""
  );
  const [responsibility, setResponsibility] = useState(
    currentTask.responsibility || ""
  );
  const [reprogramingComment, setReprogramingComment] = useState(
    currentTask.reprogramingComment || ""
  );

  // UTC to local datetime for inputs
  const toLocalDatetime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISO = new Date(date.getTime() - tzOffset).toISOString();
    return localISO.slice(0, 16);
  };

  useEffect(() => {
    if (currentTask.startDate) {
      setStartDate(toLocalDatetime(currentTask.startDate));
    }
    if (currentTask.reprogrammedStartDate) {
      setReprogrammedStartDate(
        toLocalDatetime(currentTask.reprogrammedStartDate)
      );
    }
    if (currentTask.responsibility) {
      setResponsibility(currentTask.responsibility);
    }
  }, [currentTask]);

  const handleAssignStartDate = async () => {
    if (!startDate) return;
    const toastId = toast.loading("Asignando fecha...");
    try {
      await axios.patch("/api/to_do/patch_to_do_and_send_email", {
        id: taskId,
        startDate: new Date(startDate),
        actionType: "START",
      });
      toast.success("Fecha asignada correctamente", { id: toastId });
      await onUpdate();
    } catch {
      toast.error("Error al asignar fecha", { id: toastId });
    }
  };

  const handleReprogram = async () => {
    if (!reprogrammedStartDate || !reprogramingComment.trim()) {
      toast.info("Debes ingresar una fecha y un motivo de reprogramación.");
      return;
    }
    const toastId = toast.loading("Reprogramando tarea...");
    try {
      await axios.patch("/api/to_do/patch_to_do_and_send_email", {
        id: taskId,
        reprogrammed: true,
        reprogrammedStartDate: new Date(reprogrammedStartDate),
        reprogramingComment,
        actionType: "REPROGRAM",
      });
      toast.success("Reprogramado correctamente", { id: toastId });
      await onUpdate();
    } catch {
      toast.error("Error al reprogramar", { id: toastId });
    }
  };

  const handleAssignAmount = async () => {
    if (!amount || isNaN(amount)) return;
    const toastId = toast.loading("Asignando importe...");
    try {
      await axios.patch("/api/to_do", {
        id: taskId,
        amount: parseFloat(amount),
      });
      toast.success("Importe actualizado", { id: toastId });
      await onUpdate();
    } catch {
      toast.error("Error al asignar importe", { id: toastId });
    }
  };

  const handleAssignResponsibility = async () => {
    if (!responsibility) return;
    const toastId = toast.loading("Asignando responsabilidad...");
    try {
      await axios.patch("/api/to_do", {
        id: taskId,
        responsibility,
      });
      toast.success("Responsabilidad asignada", { id: toastId });
      await onUpdate();
    } catch {
      toast.error("Error al guardar responsabilidad", { id: toastId });
    }
  };

  const handleUploadBill = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    let files = [];
    const toastId = toast.loading("Subiendo factura...");
    try {
      files = await uploadFiles([file], `Facturas_Tareas`);

      await axios.patch("/api/to_do", {
        id: taskId,
        bill: files.length > 0 ? files[0].url : null,
      });

      toast.success("Factura subida correctamente", { id: toastId });
      await onUpdate();
    } catch (err) {
      toast.error("Error al subir factura", { id: toastId });
    }
  };

  return (
    <div className="space-y-6 border border-gray-200 bg-white rounded-xl p-4">
      {/* Start Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Asignar fecha de inicio:</label>
        <input
          type="datetime-local"
          className="w-full border rounded px-3 py-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button
          onClick={handleAssignStartDate}
          className="px-4 py-2 border border-[#440cac] text-[#440cac] text-sm rounded">
          Asignar fecha
        </button>
      </div>
      {/* Reprogramación */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Reprogramar tarea:</label>
        <input
          type="datetime-local"
          className="w-full border rounded px-3 py-2"
          value={reprogrammedStartDate}
          onChange={(e) => setReprogrammedStartDate(e.target.value)}
        />
        <textarea
          placeholder="Motivo de reprogramación"
          className="w-full border rounded px-3 py-2 text-sm outline-none"
          value={reprogramingComment}
          onChange={(e) => setReprogramingComment(e.target.value)}
          rows={3}
        />
        <button
          onClick={handleReprogram}
          className="px-4 py-2 border border-[#440cac] text-[#440cac] text-sm rounded">
          Reprogramar
        </button>
      </div>
      {/* Asignar Precio */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Precio de mantenimiento (€):
        </label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 number-input-no-appearance outline-none"
        />
        <button
          onClick={handleAssignAmount}
          className="px-4 py-2 border border-[#440cac] text-[#440cac] text-sm rounded">
          Guardar importe
        </button>
      </div>
      {/* Asignar Responsabilidad */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          ¿Quién es responsable de cubrir el coste de esta reparación?
        </label>
        <select
          value={responsibility}
          onChange={(e) => setResponsibility(e.target.value)}
          className="w-full border rounded px-3 py-2">
          <option value="">Seleccionar</option>
          <option value="OWNER">Propietario</option>
          <option value="CLIENT">Inquilino</option>
        </select>
        <button
          onClick={handleAssignResponsibility}
          className="px-4 py-2 border border-[#440cac] text-[#440cac] text-sm rounded">
          Asignar responsabilidad
        </button>
      </div>
      {/* Subir factura */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Subir factura:</label>

        {currentTask.bill && (
          <p className="text-sm text-gray-700">
            Factura actual:{" "}
            <a
              href={currentTask.bill}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline">
              Ver factura
            </a>
          </p>
        )}

        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => handleUploadBill(e)}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#440cac] file:text-white hover:file:bg-[#440cac]/90"
        />
      </div>
    </div>
  );
};

export default TaskManagementPanel;
