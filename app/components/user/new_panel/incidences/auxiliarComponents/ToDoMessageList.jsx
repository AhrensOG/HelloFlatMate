"use client";

import { useTranslations } from "next-intl";
import { useContext, useEffect, useRef } from "react";
import { Context } from "@/app/context/GlobalContext";

const ToDoMessageList = ({ messages, onRefetch }) => {
  const t = useTranslations("user_incidences");
  const { state } = useContext(Context);
  const bottomRef = useRef(null);

  const isVideo = (url) =>
    typeof url === "string" &&
    (url.includes(".mp4") || url.includes(".webm") || url.includes(".mov"));

  const SENDER_TYPE_LABELS = {
    WORKER: t("senderType_worker"),
    CLIENT: t("senderType_client"),
    ADMIN: t("senderType_admin"),
    OWNER: t("senderType_owner"),
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="space-y-4 max-h-[300px] overflow-y-auto border border-gray-200 p-3 pt-0 rounded-lg bg-white">
      <div className="sticky top-0 z-10 bg-white py-2">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <h4 className="text-sm font-semibold text-gray-700">
            {t("messages.title")}
          </h4>
          <button
            onClick={onRefetch}
            className="text-xs text-[#440cac] hover:underline">
            {t("messages.refresh")}
          </button>
        </div>
      </div>

      {!messages || messages.length === 0 ? (
        <p className="text-sm text-gray-500">{t("messages.empty")}</p>
      ) : (
        [...messages]
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((msg) => {
            const isMe = msg.senderId === state?.user?.id;

            return (
              <div
                key={msg.id}
                className={`max-w-[60%] p-3 rounded-md text-sm relative ${
                  isMe
                    ? "ml-auto bg-[#f3f0fa] text-gray-800"
                    : "mr-auto bg-gray-100 text-gray-700"
                }`}>
                <p className="font-medium text-[13px] text-[#440cac] mb-1">
                  {msg.senderName} {msg.senderLastName} -{" "}
                  {SENDER_TYPE_LABELS[msg.senderType] || "Unknown"}
                </p>

                {msg.body && <p className="whitespace-pre-wrap">{msg.body}</p>}

                {msg.imageUrl && (
                  <div className="mt-2">
                    {isVideo(msg.imageUrl) ? (
                      <a
                        href={msg.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline text-xs text-center">
                        🎥 {t("messages.video_link")}
                      </a>
                    ) : (
                      <a
                        href={msg.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        <img
                          src={msg.imageUrl}
                          alt="adjunto"
                          className="rounded w-full max-w-xs object-cover"
                        />
                      </a>
                    )}
                  </div>
                )}

                <span className="block text-[11px] mt-1 text-gray-400 text-right">
                  {new Date(msg.createdAt).toLocaleString("es-ES")}
                </span>
              </div>
            );
          })
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ToDoMessageList;
