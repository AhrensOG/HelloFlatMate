"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import ToDoMessageList from "@/app/components/user/new_panel/incidences/auxiliarComponents/ToDoMessageList";
import ToDoMessageForm from "@/app/components/user/new_panel/incidences/auxiliarComponents/ToDoMessageForm";

const ToDoMessagesSection = ({ toDoId, currentUser }) => {
  const t = useTranslations("user_incidences.messages");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/to_do/messages?toDoId=${toDoId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toDoId) fetchMessages();
  }, [toDoId]);

  return (
    <div className="space-y-6 mt-6 p-4 bg-white border rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800">{t("title")}</h3>
      <ToDoMessageList messages={messages} onRefetch={fetchMessages} />
      {currentUser.id && (
        <ToDoMessageForm
          onMessageSent={fetchMessages}
          toDoId={toDoId}
          userId={currentUser?.id}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default ToDoMessagesSection;
