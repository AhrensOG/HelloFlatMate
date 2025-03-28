import { useTranslations } from "next-intl";

export default function DescriptionSection({ body }) {
    const t = useTranslations("worker_panel.tasks.task_details.desc_sec");
    return (
        <article className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-black text-center">{t("title")}</h3>
            <ul className="list-disc text-[#0D171C] text-base font-normal pl-3 lg:pl-10  lg:self-center">
                {/* <li>Reparar toma corriente del baño</li> */}
                <li> {body ? t("op_1") : t("op_2")}</li>
            </ul>
        </article>
    );
}
