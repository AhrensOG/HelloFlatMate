"use client";

import { useContext, useState } from "react";
import { toast } from "sonner";
import { HiOutlineUser } from "react-icons/hi2";
import { LuClipboardList } from "react-icons/lu";
import { AiOutlineCamera } from "react-icons/ai";
import { FaUserClock } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { useTranslations } from "next-intl";

const ToDoItem = ({ todo, serial, period }) => {
  const t = useTranslations("user_incidences");
  const { dispatch } = useContext(Context);
  const [showCancelInput, setShowCancelInput] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const handleCancel = async () => {
    const toastId = toast.loading("Cancelando...");
    try {
      await axios.patch("/api/to_do/user_panel", {
        id: todo.id,
        cancellationReason: cancelReason,
      });
      setShowCancelInput(false);
      setCancelReason("");
      await isUserLogged(dispatch);
      toast.success(t("cancel.toast_success"), { id: toastId });
    } catch (error) {
      console.log(error);
      toast.info(t("cancel.toast_error"), {
        id: toastId,
        description: t("cancel.toast_support"),
      });
    }
  };

  const statusColors = {
    IN_PROGRESS: "text-[#440cac]",
    PENDING: "text-yellow-600",
    COMPLETED: "text-green-600",
    CANCELLED: "text-gray-500",
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <LuClipboardList className="text-[#440cac]" />
          {todo.title}
        </h3>
        <span className={`text-sm font-bold ${statusColors[todo.status]}`}>
          {t(`status.${todo.status}`)}
        </span>
      </div>

      {/* Body */}
      <p className="text-sm text-gray-600 break-words">{todo.body}</p>

      {/* Info extra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <p className="break-words">
          <span className="font-medium">{t("labels.code")}:</span> {serial} –{" "}
          {period}
        </p>
        <p className="flex items-start justify-end gap-1">
          <HiOutlineUser className="text-gray-400" />
          <span className="font-medium">{t("labels.worker")}:</span>{" "}
          {todo.worker
            ? `${todo.worker.name} ${todo.worker.lastName}`
            : t("labels.unassigned")}
        </p>
        <p>
          <span className="font-medium">{t("labels.client_message")}:</span>{" "}
          {todo.clientMessage}
        </p>
        <p className="flex items-start justify-end gap-1">
          <FaUserClock className="text-gray-400" />
          <span className="font-medium">{t("labels.is_present")}</span>{" "}
          {todo.isPresent ? t("labels.yes") : t("labels.no")}
        </p>
        {todo.comment && (
          <p className="col-span-full">
            <span className="font-medium">{t("labels.worker_comment")}:</span>{" "}
            {todo.comment}
          </p>
        )}
        {todo.cancellationReason && (
          <p className="col-span-full text-red-500">
            <span className="font-medium">{t("labels.cancel_reason")}:</span>{" "}
            {todo.cancellationReason}
          </p>
        )}
      </div>

      {/* Imagen */}
      {todo.imageUrl && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <AiOutlineCamera className="text-[#440cac]" />
            {t("labels.image")}:
          </span>
          <Link
            href={todo.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-200 hover:shadow-md transition">
            <Image
              src={todo.imageUrl}
              alt="Evidencia"
              fill
              className="w-full h-auto object-cover rounded-md"
            />
          </Link>
        </div>
      )}

      {/* Cancelación */}
      {todo.status === "PENDING" && (
        <div className="space-y-2 mt-2">
          {!showCancelInput ? (
            <button
              onClick={() => setShowCancelInput(true)}
              className="text-sm text-[#440cac] underline">
              {t("cancel.start")}
            </button>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                {t("cancel.label")}
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full outline-none border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder={t("cancel.placeholder")}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleCancel}
                  disabled={cancelReason.trim() === ""}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    cancelReason.trim()
                      ? "bg-[#440cac] text-white hover:bg-[#361089]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}>
                  {t("cancel.confirm")}
                </button>
                <button
                  onClick={() => {
                    setShowCancelInput(false);
                    setCancelReason("");
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition">
                  {t("cancel.abort")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
