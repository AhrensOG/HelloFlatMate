import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiOutlineClock } from "react-icons/hi2";

export default function ApplicationCardHistory({ data, action }) {
  const t = useTranslations("worker_panel.tasks.cards");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const statusStyles = {
    IN_PROGRESS: "text-[#440cac]",
    COMPLETED: "text-green-700",
    PENDING: "text-yellow-600",
    CANCELLED: "text-gray-400",
  };

  const statusText = {
    IN_PROGRESS: t("in_progress"),
    COMPLETED: t("completed"),
    PENDING: t("pending"),
    CANCELLED: t("cancelled"),
  };

  return (
    <div
      onClick={action}
      className="border border-gray-300 flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer transition">
      <div className="flex-shrink-0">
        <div className="rounded-full w-14 h-14 bg-[#0E165C] flex items-center justify-center">
          <Image
            src={
              data?.type === "CLEAN"
                ? "/history/application/clean-icon.svg"
                : "/history/application/repair-icon.svg"
            }
            width={34}
            height={34}
            alt="icono"
          />
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-[1rem] text-gray-800">
          {data?.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{data?.body}</p>

        <div className="flex justify-between items-end mt-2">
          <span className="text-xs flex items-center gap-1 text-gray-500">
            <HiOutlineClock className="w-4 h-4" />
            {formatDate(data?.startDate)}
          </span>

          <span
            className={`text-xs font-semibold ${
              statusStyles[data?.status] || "text-gray-500"
            }`}>
            {statusText[data?.status] || t("pending")}
          </span>
        </div>
      </div>
    </div>
  );
}
