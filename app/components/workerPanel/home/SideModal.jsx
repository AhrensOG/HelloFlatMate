import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

export default function SideModal({ children, action }) {
    const t = useTranslations("worker_panel.tasks.side_modal");
    return (
        <div className="absolute inset-0 flex flex-col gap-3 p-4 bg-white z-50 overflow-auto">
            <section className="flex items-center mb-2 w-full">
                <button onClick={action} type="button" className="w-6 h-6 opacity-70 ml-4">
                    <ArrowLeftIcon />
                </button>
            </section>
            {children}
            <section className="text-[#121417] flex flex-col gap-2">
                <p className="text-[0.65rem] text-[#919191] font-normal w-full text-center">{t("p_1")}</p>
                <p className="text-base font-normal">{t("p_2")}</p>
                <ul className="list-disc pl-7">
                    <li>{t("ul.li_1")}</li>
                    <li>{t("ul.li_2")}</li>
                </ul>
            </section>
        </div>
    );
}
