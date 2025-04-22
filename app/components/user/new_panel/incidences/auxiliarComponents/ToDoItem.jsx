"use client";

import { useContext, useState } from "react";
import { toast } from "sonner";
import {
  HiMapPin,
  HiEnvelope,
  HiPhone,
  HiUser,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi2";
import { FaImage, FaMoneyBill } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ToDoMessageList from "./ToDoMessageList";
import ToDoMessageForm from "./ToDoMessageForm";

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} - ${hours}:${minutes}hs`;
};

const ToDoItem = ({ todo, serial, period, refetch }) => {
  const t = useTranslations("user_incidences");
  const { state } = useContext(Context);
  const [showCancelInput, setShowCancelInput] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState(todo.messages || []);

  const labels = {
    preferred_time_slot: {
      MORNING: t("labels.time_morning"),
      AFTERNOON: t("labels.time_afternoon"),
      FULL_DAY: t("labels.time_full_day"),
    },
    site: {
      MY_ROOM: t("site_type_labels.site.my_room"),
      KITCHEN: t("site_type_labels.site.kitchen"),
      LIVING_ROOM: t("site_type_labels.site.living_room"),
      WC1: t("site_type_labels.site.wc1"),
      WC2: t("site_type_labels.site.wc2"),
      HALLWAY_COMMON_AREAS: t("site_type_labels.site.hallway_common_areas"),
      OTHERS: t("site_type_labels.site.others"),
    },
    type: {
      ELECTRICITY: t("site_type_labels.type.electricity"),
      CARPENTRY: t("site_type_labels.type.carpentry"),
      LOCKSMITHING: t("site_type_labels.type.locksmithing"),
      PLUMBING: t("site_type_labels.type.plumbing"),
      GLAZING: t("site_type_labels.type.glazing"),
      WIFI: t("site_type_labels.type.wifi"),
      APPLIANCES: t("site_type_labels.type.appliances"),
      FURNITURE: t("site_type_labels.type.furniture"),
      OTHERS: t("site_type_labels.type.others"),
    },
    responsibility: {
      OWNER: t("labels.responsibility_owner"),
      TENANT: t("labels.responsibility_tenant"),
      SHARED: t("labels.responsibility_shared"),
    },
    status: {
      PENDING: t("status.PENDING"),
      IN_PROGRESS: t("status.IN_PROGRESS"),
      COMPLETED: t("status.COMPLETED"),
      CANCELLED: t("status.CANCELLED"),
    },
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/to_do/messages?toDoId=${todo.id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error al cargar mensajes", err);
    }
  };

  const handleCancel = async () => {
    const toastId = toast.loading("Cancelando...");
    try {
      await axios.patch("/api/to_do/user_panel", {
        id: todo.id,
        cancellationReason: "Inquilino: " + cancelReason,
      });
      setShowCancelInput(false);
      setCancelReason("");
      await refetch();
      // await isUserLogged(dispatch);
      toast.success(t("cancel.toast_success"), { id: toastId });
    } catch (error) {
      console.log(error);
      toast.info(t("cancel.toast_error"), {
        id: toastId,
        description: t("cancel.toast_support"),
      });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border border-gray-200 rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{todo.title + " # " + todo.id}</span>
          <span className="text-xs text-gray-600">
            {formatDateTime(todo.creationDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-semibold ${
              todo.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : todo.status === "CANCELLED"
                ? "bg-gray-100 text-gray-700"
                : todo.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}>
            {labels.status[todo.status]}
          </span>
          {todo.emergency && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
              {t("status.EMERGENCY")}
            </span>
          )}
          {expanded ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
        </div>
      </div>

      {/* Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white px-4 pb-4 space-y-3 text-sm overflow-hidden">
            {/* Dirección */}
            {todo.property && (
              <div className="flex items-start gap-2">
                <HiMapPin size={16} className="mt-0.5 text-[#440CAC]" />
                <span>
                  {todo.property.street} {todo.property.streetNumber},{" "}
                  {todo.property.city}
                </span>
              </div>
            )}

            {/* Factura */}
            {todo.bill && (
              <div className="border-t pt-3 space-y-1">
                <h4 className="font-semibold flex items-center gap-2">
                  <FaMoneyBill size={16} className="text-[#440CAC]" />
                  {t("todo_info.bill")}
                </h4>
                <Link
                  href={todo.imageUrl}
                  target="_blank"
                  className="underline italic text-[#440CAC] text-sm">
                  {t("todo_info.view_bill")}
                </Link>
              </div>
            )}

            {/* Descripción */}
            <div className="border-t pt-3">
              <p>
                <strong>{t("todo_info.body")}:</strong> {todo.body}
              </p>
              {todo.amount > 0 && (
                <p>
                  <strong>{t("todo_info.amount")}:</strong>{" "}
                  {todo.amount.toFixed(2)} €
                </p>
              )}
              <p>
                <strong>{t("todo_info.code")}:</strong> {serial} - {period}
              </p>
            </div>

            {/* Cliente */}
            <div className="border-t pt-3 space-y-1">
              <h4 className="font-semibold flex items-center gap-2">
                <HiUser size={16} className="text-[#440CAC]" />
                {t("todo_info.client")} - {todo.client?.name}{" "}
                {todo.client?.lastName}
              </h4>
              {todo.preferredTimeSlot && (
                <p className="flex items-center gap-1">
                  <ClockIcon className="size-5 text-[#440cac]" />
                  <strong>{t("todo_info.preferred_time_slot")}:</strong>{" "}
                  {labels.preferred_time_slot[todo.preferredTimeSlot]}
                </p>
              )}
            </div>

            {/* Reparación */}
            <div className="border-t pt-3 space-y-1">
              <h4 className="font-semibold flex items-center gap-2">
                <FiTool size={16} className="text-[#440CAC]" />
                {t("todo_info.repair")}
              </h4>
              {todo.incidentSite && (
                <p>
                  <strong>{t("todo_info.site")}:</strong>{" "}
                  {labels.site[todo.incidentSite]}
                </p>
              )}
              {todo.incidentType && (
                <p>
                  <strong>{t("todo_info.repair_type")}:</strong>{" "}
                  {labels.type[todo.incidentType]}
                </p>
              )}
              {todo.clientMessage && (
                <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 mt-2">
                  <p className="font-semibold mb-1">
                    💬 {t("todo_info.client_message")}
                  </p>
                  <p>{todo.clientMessage}</p>
                </div>
              )}
              {todo.responsibility && (
                <p>
                  <strong>{t("todo_info.responsibility")}:</strong>{" "}
                  {labels.responsibility[todo.responsibility]}
                </p>
              )}
              <p>
                <strong>{t("todo_info.client_present.title")}:</strong>{" "}
                {todo.isPresent
                  ? t("todo_info.client_present.yes")
                  : t("todo_info.client_present.no")}
              </p>
              <p>
                <strong>{t("todo_info.start_date")}:</strong>{" "}
                {formatDateTime(todo.startDate)}
              </p>

              {todo.reprogrammed && (
                <>
                  <p className="text-yellow-700 font-semibold mt-2">
                    🕒 {t("todo_info.reprogrammed")}
                  </p>
                  <p>
                    <strong>{t("todo_info.new_start_date")}:</strong>{" "}
                    {formatDateTime(todo.reprogrammedStartDate)}
                  </p>
                  <p>
                    <strong>{t("todo_info.reprogramming_comment")}:</strong>{" "}
                    {todo.reprogramingComment}
                  </p>
                </>
              )}

              {todo.comment && (
                <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 mt-2">
                  <p className="font-semibold mb-1">
                    🛠️ {t("todo_info.technical_message")}
                  </p>
                  <p>{todo.comment}</p>
                </div>
              )}

              {todo.closingComments && (
                <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 mt-2">
                  <p className="font-semibold mb-1">
                    ✅ {t("todo_info.closing_message")}
                  </p>
                  <p>{todo.closingComments}</p>
                </div>
              )}

              {todo.cancellationReason && (
                <div className="bg-red-100 border border-red-300 p-3 rounded-md text-sm text-red-800 mt-2">
                  <p className="font-semibold mb-1">
                    ❌ {t("labels.CANCELLED")}
                  </p>
                  <p>{todo.cancellationReason}</p>
                </div>
              )}
            </div>

            {/* Imagen */}
            {todo.imageUrl && (
              <div className="border-t pt-3 space-y-1">
                <h4 className="font-semibold flex items-center gap-2">
                  <FaImage size={16} className="text-[#440CAC]" />
                  {t("todo_info.problem_picture")}
                </h4>
                <Link
                  href={todo.imageUrl}
                  target="_blank"
                  className="underline italic text-[#440CAC] text-sm">
                  {t("todo_info.image_video")}
                </Link>
              </div>
            )}

            {/* Mensajes */}
            <div className="pt-4 space-y-4">
              <ToDoMessageList messages={messages} onRefetch={fetchMessages} />
              {state?.user?.id &&
                (todo.status === "PENDING" ||
                  todo.status === "IN_PROGRESS") && (
                  <ToDoMessageForm
                    toDoId={todo.id}
                    userId={state.user?.id}
                    onMessageSent={fetchMessages}
                  />
                )}
            </div>

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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToDoItem;
