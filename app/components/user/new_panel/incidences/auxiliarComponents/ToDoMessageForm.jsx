"use client";

import { useState } from "react";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Context } from "@/app/context/GlobalContext";

const ToDoMessageForm = ({ toDoId, userId, onMessageSent }) => {
  const t = useTranslations("user_incidences");
  const { state } = useContext(Context);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() && !file) return;

    if (!state.user) {
      toast.info("Incia sesion antes de continuar!")
      return;
    }

    setSending(true);
    const toastId = toast.loading(t("messages.sending"));

    try {
      let imageUrl = null;
      if (file) {
        const uploaded = await uploadFiles([file], "ToDoMessages");
        if (uploaded instanceof Error) throw uploaded;
        imageUrl = uploaded[0].url;
      }
      await axios.post(`/api/to_do/messages`, {
        body: message,
        imageUrl,
        senderType: "CLIENT",
        senderId: userId, // actualiza con user real si lo tenés
        senderName: state?.user?.name,
        senderLastName: state?.user?.lastName,
        toDoId,
      });

      setMessage("");
      setFile(null);
      toast.success(t("messages.sent"), { id: toastId });
      if (onMessageSent) onMessageSent();
    } catch (err) {
      console.error(err);
      toast.info(t("messages.error"), { id: toastId });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        rows={3}
        placeholder={t("messages.placeholder")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm text-gray-600"
      />

      <button
        onClick={handleSubmit}
        disabled={sending || (!message.trim() && !file)}
        className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
          message.trim() || file
            ? "bg-[#440cac] text-white hover:bg-[#361089]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}>
        {t("messages.send")}
      </button>
    </div>
  );
};

export default ToDoMessageForm;
