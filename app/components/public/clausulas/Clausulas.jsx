import HTMLReactParser from "html-react-parser";
import { useTranslations } from "next-intl";
import React from "react";

const ContractClauses = () => {
    const t = useTranslations("clauses");
    const formatedStrongText = (text) => {
        return text.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };
    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-resolution-blue">{t("title")}</h1>

            {/* Cláusula 1 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_1.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_1.p")}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sec_1.p_2")))}.</p>
            </section>

            {/* Cláusula 2 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_2.h2")}</h2>
                <p className="pl-6 mt-2">{HTMLReactParser(formatedStrongText(t("sec_2.p")))}</p>
                <p className="pl-6 mt-4">{t("sec_2.p_2")}</p>
            </section>

            {/* Cláusula 3 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_3.h2")}</h2>
                <p className="pl-6 mt-2">{HTMLReactParser(formatedStrongText(t("sec_3.p")))}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sec_3.p_2")))}</p>
            </section>

            {/* Cláusula 4 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_4.h2")}</h2>
                <p className="pl-6 mt-2">{HTMLReactParser(formatedStrongText(t("sec_4.p")))}.</p>
                <p className="pl-6 mt-4">
                    {t("sec_4.p_2_1")}{" "}
                    <a href="https://www.helloflatmate.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        www.helloflatmate.com
                    </a>{" "}
                    {t("sec_4.p_2_1")}
                </p>
                <p className="pl-6 mt-4">{t("sec_4.p_3")}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sec_4.p_4")))}.</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sec_4.p_5")))}.</p>
            </section>

            {/* Cláusula 5 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_5.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_5.p")}</p>
                <ul className="list-disc pl-12 mt-4 space-y-2">
                    <li>{HTMLReactParser(formatedStrongText(t("sec_5.ul_li_1")))}.</li>
                    <li>{HTMLReactParser(formatedStrongText(t("sec_5.ul_li_2")))}.</li>
                    <li>{HTMLReactParser(formatedStrongText(t("sec_5.ul_li_3")))}.</li>
                </ul>
            </section>

            {/* Cláusula 6 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_6.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_6.p")}</p>
                <p className="pl-6 mt-4">{t("sec_6.p_2")}</p>
            </section>

            {/* Causula 7 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_7.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_7.p")}</p>
            </section>
            {/* Cláusula 8 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_8.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_8.p")}</p>
                <p className="pl-6 mt-4">{t("sec_8.p_2")}</p>
                <p className="pl-6 mt-4">{t("sec_8.p_3")}</p>
            </section>

            {/* Cláusula 9 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_9.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_9.p")}</p>
            </section>

            {/* Cláusula 10 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_10.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_10.p")}</p>
                <p className="pl-6 mt-4">{t("sec_10.p_2")}</p>
            </section>

            {/* Cláusula 11 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_11.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_11.p")}</p>
                <p className="pl-6 mt-4">{HTMLReactParser(formatedStrongText(t("sec_11.p_2")))}</p>
            </section>

            {/* Cláusula 12 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_12.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_12.p")}</p>
            </section>

            {/* Cláusula 13 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_13.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_13.p")}</p>
                <p className="pl-6 mt-4">{t("sec_13.p_2")}</p>
            </section>

            {/* Cláusula 14 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_14.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_14.p")}</p>
                <p className="pl-6 mt-4">{t("sec_14.p_2")}</p>
            </section>

            {/* Cláusula 15 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_15.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_15.p")}</p>
                <p className="pl-6 mt-4">{t("sec_15.p_2")}</p>
            </section>

            {/* Cláusula 16 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_16.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_16.p")}</p>
            </section>

            {/* Cláusula 17 */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_17.h2")}</h2>
                <p className="pl-6 mt-2">{t("sec_17.p")}</p>
            </section>

            <p className="text-sm text-gray-500 mt-6">© 2024 HELLO FLAT MATE, S.L. {t("p")} </p>
        </main>
    );
};

export default ContractClauses;
