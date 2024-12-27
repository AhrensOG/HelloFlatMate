import { useTranslations } from "next-intl";
import React from "react";
import HTMLReactParser from "html-react-parser";

const PrivacyPolicy = () => {
    const t = useTranslations("pryvacy");
    const formatedStrongText = (str) => {
        return str.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-resolution-blue">{t("title")}</h1>
            <section className="mb-6">
                <p>{t("p_1")}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_1_h2")}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{HTMLReactParser(formatedStrongText(t("sect_1_ul_li_1")))}</li>
                    <li>{HTMLReactParser(formatedStrongText(t("sect_1_ul_li_2")))}</li>
                    <li>{HTMLReactParser(formatedStrongText(t("sect_1_ul_li_3")))}</li>
                    <li>{HTMLReactParser(formatedStrongText(t("sect_1_ul_li_4")))}</li>
                    <li>
                        {HTMLReactParser(formatedStrongText(t("sect_1_ul_li_5")))}{" "}
                        <a href="mailto:rooms@helloflatmate.com" className="text-blue-600 hover:underline">
                            {HTMLReactParser(formatedStrongText(t("sect_1_ul_li_5_a")))}
                        </a>
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_2_h2")}</h2>

                <h3 className="text-base font-semibold mt-4">{t("sect_2_h3_1")}</h3>
                <p className="pl-6 mt-2">{HTMLReactParser(formatedStrongText(t("sect_2_p_1")))}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sect_2_p_2")))}</p>
                <ul className="list-disc pl-12 mt-2 space-y-2">
                    <li>{t("sect_2_ul_1_li_1")}</li>
                    <li>{t("sect_2_ul_1_li_2")}</li>
                    <li>{t("sect_2_ul_1_li_3")}</li>
                    <li>{t("sect_2_ul_1_li_4")}</li>
                    <li>{t("sect_2_ul_1_li_5")}</li>
                    <li>{t("sect_2_ul_1_li_6")}</li>
                </ul>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sect_2_p_3")))}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sect_2_p_4")))}</p>
                <ul className="list-disc pl-12 mt-2 space-y-2">
                    <li>{t("sect_2_ul_2_li_1")}</li>
                    <li>{t("sect_2_ul_2_li_2")}</li>
                    <li>{t("sect_2_ul_2_li_3")}</li>
                    <li>{t("sect_2_ul_2_li_4")}</li>
                </ul>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sect_2_p_5")))}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sect_2_p_6")))}</p>

                <h3 className="text-base font-semibold mt-4">{t("sect_2_h3_2")}</h3>
                <p className="pl-6 mt-2">{HTMLReactParser(formatedStrongText(t("sect_2_p_7")))}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sect_2_p_8")))}</p>
                <ul className="list-disc pl-12 mt-2 space-y-2">
                    <li>{t("sect_2_ul_3_li_1")}</li>
                    <li>{t("sect_2_ul_3_li_2")}</li>
                    <li>{t("sect_2_ul_3_li_3")}</li>
                    <li>{t("sect_2_ul_3_li_4")}</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_3_h2")}</h2>
                <p className="pl-6 mt-4">{t("sect_3_p_1")}</p>
                <ul className="list-disc pl-12 mt-2 space-y-2">
                    <li>{t("sect_3_ul_li_1")}</li>
                    <li>{t("sect_3_ul_li_2")}</li>
                    <li>{t("sect_3_ul_li_3")}</li>
                    <li>{t("sect_3_ul_li_4")}</li>
                    <li>{t("sect_3_ul_li_5")}</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_4_h2")}</h2>
                <p className="pl-6 mt-4">{t("sect_4_p")}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_5_h2")}</h2>
                <p className="pl-6 mt-4">{t("sect_5_p")}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_6_h2")}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t("sect_6_ul_li_1")}</li>
                    <li>{t("sect_6_ul_li_2")}</li>
                    <li>{t("sect_6_ul_li_3")}</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_7_h2")}</h2>
                <p className="pl-6 mt-4">
                    {t("sect_7_p")}{" "}
                    <a href="mailto:rooms@helloflatmate.com" className="text-blue-600 hover:underline">
                        {t("sect_7_a")}
                    </a>
                    .
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_8_h2")}</h2>
                <p className="pl-6 mt-4">{t("sect_8_p")}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sect_9_h2")}</h2>
                <p className="pl-6 mt-4">{t("sect_9_p")}</p>
            </section>

            <p className="text-sm text-gray-500 mt-6">{t("legal")}</p>
        </main>
    );
};

export default PrivacyPolicy;
