import { useTranslations } from "next-intl";

export default function DescriptionSection({ body }) {
  const t = useTranslations("worker_panel.tasks.task_details.desc_sec");

  return (
    <article className="flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm w-full">
      <h3 className="text-base font-semibold text-[#0C1660] text-center">
        {t("title")}
      </h3>
      <ul className="list-disc list-inside text-sm text-gray-700 px-2 lg:px-6">
        <li>{body ? t("op_1") : t("op_2")}</li>
      </ul>
    </article>
  );
}
