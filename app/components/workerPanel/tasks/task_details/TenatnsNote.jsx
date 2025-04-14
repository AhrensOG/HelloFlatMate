import { useTranslations } from "next-intl";

export default function TenatnsNote({ body }) {
  const t = useTranslations("worker_panel.tasks.task_details.tenant_note");

  return (
    <article className="w-full flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-base font-semibold text-[#0C1660] text-center">
        {t("title")}
      </h3>
      <p className="text-sm text-gray-700 bg-[#F2F2F2] rounded-md px-4 py-2 break-words whitespace-pre-line">
        {body || t("empty")}
      </p>
    </article>
  );
}
