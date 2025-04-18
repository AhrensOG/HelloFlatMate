"use client";

import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";
import {
  HiChevronUp,
  HiChevronDown,
  HiMapPin,
  HiEnvelope,
  HiPhone,
  HiUser,
} from "react-icons/hi2";
import { FiTool, FiAlertCircle } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}hs`;
}

const ToDoCard = forwardRef(
  ({ todo, isExpanded, onToggle, t, labels }, ref) => {
    const status = todo.status || "PENDING";
    const isUrgent = todo.emergency;

    return (
      <div ref={ref} className="border rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div
          className="flex justify-between items-center px-4 py-3 cursor-pointer"
          onClick={() => onToggle(todo.id)}>
          <div className="flex flex-col text-sm">
            <span className="font-semibold">
              {todo.title + " # " + todo.id}
            </span>
            <span className="text-xs text-gray-600">
              {formatDateToDDMMYYYY(todo.creationDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                "text-xs px-2 py-1 rounded-full font-semibold",
                status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : status === "CANCELLED"
                  ? "bg-gray-100 text-gray-700"
                  : status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              )}>
              {labels.status[status]}
            </span>
            {isUrgent && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                {t("todo_info.emergency")}
              </span>
            )}
            {isExpanded ? (
              <HiChevronUp size={18} />
            ) : (
              <HiChevronDown size={18} />
            )}
          </div>
        </div>

        {/* Body */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white px-4 py-4 space-y-3 text-sm overflow-hidden">
              {/* Dirección */}
              <div className="flex items-start gap-2">
                <HiMapPin size={16} className="mt-0.5 text-[#440CAC]" />
                <span>
                  {todo.property?.street} {todo.property?.streetNumber},{" "}
                  {todo.property?.city}
                </span>
              </div>

              {/* Descripción */}
              <div className="border-t pt-3">
                <p>
                  <strong>{t("todo_info.body")}:</strong> {todo.body}
                </p>
                {todo.amount > 0 && (
                  <p>
                    <strong>{t("todo_info.amount")}: </strong>
                    {todo.amount.toFixed(2)} €
                  </p>
                )}
              </div>

              {/* Cliente */}
              <div className="border-t pt-3 space-y-1">
                <h4 className="font-semibold flex items-center gap-2">
                  <HiUser size={16} className="text-[#440CAC]" />
                  {t("todo_info.client")} - {todo.client?.name}{" "}
                  {todo.client?.lastName}
                </h4>
                <p className="flex items-center gap-1">
                  <HiEnvelope size={14} className="text-[#440cac]" />{" "}
                  {todo.client?.email}
                </p>
                <p className="flex items-center gap-1">
                  <HiPhone size={14} className="text-[#440cac]" />{" "}
                  {todo.client?.phone}
                </p>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default ToDoCard;
