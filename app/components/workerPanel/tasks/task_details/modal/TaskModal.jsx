import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TaskModal({ type, action, showModal }) {
  const t = useTranslations("worker_panel.tasks.task_details.modal");

  const [comment, setComment] = useState("");
  const [closingComments, setClosingComments] = useState("");

  const handleSubmit = () => {
    const commentToSend = type === "problem" ? comment : closingComments;
    const status = type === "problem" ? "PENDING" : "COMPLETED";
    action(commentToSend, status, type);
    showModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#A1A0A066] z-50 backdrop-blur-sm">
      <aside className="bg-white p-6 rounded-lg w-72 z-50">
        <h2 className="font-semibold mb-4 text-center text-base">
          {type === "problem" ? t("h2_1") : t("h2_2")}
        </h2>

        <form>
          <label className="block text-sm font-medium text-gray-700 text-center mb-1">
            {t("title")}
          </label>
          <textarea
            className="border border-gray-300 rounded-lg font-light text-base text-gray-900 w-full p-2 mt-1 mb-4"
            rows="4"
            value={type === "problem" ? comment : closingComments}
            onChange={(e) =>
              type === "problem"
                ? setComment(e.target.value)
                : setClosingComments(e.target.value)
            }
          />

          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              onClick={() => showModal(false)}
              className="font-bold text-sm text-gray-800 bg-gray-300 w-24 h-10 rounded-lg">
              {t("btn_cancel")}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="font-bold text-sm text-white bg-blue-700 w-24 h-10 rounded-lg">
              {t("btn_confirm")}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
