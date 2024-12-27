import HTMLReactParser from "html-react-parser";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Cookies() {
    const t = useTranslations("cookies");
    const formatStrongText = (str) => {
        return str.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };
    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-resolution-blue">{t("title")}</h1>
            <section className="mb-6">
                <p>{HTMLReactParser(formatStrongText(t("sec_1.p_1")))}</p>
                <p>{HTMLReactParser(formatStrongText(t("sec_1.p_2")))}</p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_2.h2")}</h2>
                <p>{t("sec_2.p")}</p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_3.h2")}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{HTMLReactParser(formatStrongText(t("sec_3.ul_li_1")))}</li>
                    <li>{HTMLReactParser(formatStrongText(t("sec_3.ul_li_2")))}</li>
                    <li>{HTMLReactParser(formatStrongText(t("sec_3.ul_li_3")))}</li>
                    <li>{HTMLReactParser(formatStrongText(t("sec_3.ul_li_4")))}</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_4.h2")}</h2>
                <p>{t("sec_4.p")}</p>
                <table className="table-auto border-collapse w-full my-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">{t("sec_4.th_1")}</th>
                            <th className="border px-4 py-2">{t("sec_4.th_2")}</th>
                            <th className="border px-4 py-2">{t("sec_4.th_3")}</th>
                            <th className="border px-4 py-2">{t("sec_4.th_4")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">{t("sec_4.tr_td_1")}</td>
                            <td className="border px-4 py-2">{t("sec_4.tr_td_2")}</td>
                            <td className="border px-4 py-2">{t("sec_4.tr_td_3")}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {t("sec_4.tr_td_4")}
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_5.h2")}</h2>
                <p>{t("sec_5.p")}</p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_6.h2")}</h2>
                <p>{t("sec_6.p")}</p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{t("sec_7.h2")}</h2>
                <p>{t("sec_7.p")}</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <Link
                            href="https://support.google.com/chrome/answer/95647?hl=es"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Google Chrome
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Mozilla Firefox
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://support.microsoft.com/es-es/microsoft-edge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Microsoft Edge
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Safari
                        </Link>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className="text-lg font-semibold">{t("sec_8.h2")}</h2>
                <p>
                    {t("sec_8.p")}{" "}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                        {t("sec_8.p_link")}
                    </Link>
                    .
                </p>
                <p>{t("sec_8.p_2")}</p>
            </section>
        </main>
    );
}
