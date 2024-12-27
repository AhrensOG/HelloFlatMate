import { useTranslations } from "next-intl";
import React from "react";

export default function TextSection() {
    const t = useTranslations("text_section");
    return (
        <section className="p-4 max-w-screen-lg mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
            <p className="mb-4">{t("p_1")}</p>
            <p className="mb-4">{t("p_2")}</p>
            <p className="mb-4">{t("p_3")}</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">{t("h3")}</h3>
            <p className="mb-4">{t("p_4")}</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">{t("h3_2")}</h3>
            <p className="mb-4">{t("p_5")}</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">{t("h3_3")}</h3>
            <p className="mb-4">{t("p_6")}</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">{t("h3_4")}</h3>
            <p>{t("p_7")}</p>
        </section>
    );
}
