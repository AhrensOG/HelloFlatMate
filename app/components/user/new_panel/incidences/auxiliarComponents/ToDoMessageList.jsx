"use client";

import { useTranslations } from "next-intl";

const ToDoMessageList = ({ messages, onRefetch }) => {
  const t = useTranslations("user_incidences");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-gray-700">
          {t("messages.title")}
        </h4>
        <button
          onClick={onRefetch}
          className="text-xs text-[#440cac] hover:underline">
          {t("messages.refresh")}
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {!messages || messages.length === 0 ? (
          <p className="text-sm text-gray-500">{t("messages.empty")}</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-md text-sm max-w-[80%] ${
                msg.senderType === "CLIENT"
                  ? "bg-[#f3f0fa] text-gray-800 ml-auto"
                  : "bg-gray-100 text-gray-700"
              }`}>
              <div className="text-[11px] font-medium text-gray-500 mb-1">
                {msg.senderName} {msg.senderLastName}
              </div>

              {msg.body && <p className="whitespace-pre-wrap">{msg.body}</p>}

              {msg.imageUrl &&
                (msg.imageUrl.includes(".mp4") ||
                msg.imageUrl.includes(".webm") ||
                msg.imageUrl.includes(".mov") ? (
                  <a
                    href={msg.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-center text-sm text-[#440cac] underline">
                    🎥 {t("messages.video_link")}
                  </a>
                ) : (
                  <a
                    href={msg.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2">
                    <img
                      src={msg.imageUrl}
                      alt="adjunto"
                      className="rounded w-full max-w-xs object-cover border border-gray-200"
                    />
                  </a>
                ))}

              <span className="block text-[11px] mt-1 text-gray-400 text-right">
                {new Date(msg.createdAt).toLocaleString("es-ES")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoMessageList;
