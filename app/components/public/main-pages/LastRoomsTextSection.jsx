import { useTranslations } from "next-intl";
import React from "react";

const LastRoomsTextSection = () => {
    const t = useTranslations("last_room_page.text_section");
    return (
        <div className="p-4 max-w-screen-lg mx-auto py-10">
            <h2 className="text-2xl font-bold my-4">{t("h2_1")}</h2>
            <p>{t("p_1")}</p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_1.li_1")}</li>
                <li>{t("ul_1.li_2")}</li>
                <li>{t("ul_1.li_3")}</li>
                <li>{t("ul_1.li_4")}</li>
            </ul>
            <br />

            <p>{t("p_2")}</p>

            <h2 className="text-2xl font-bold my-4">{t("h2_2")}</h2>
            <p>{t("p_3")}</p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_2.li_1")}</li>
                <li>{t("ul_2.li_2")}</li>
                <li>{t("ul_2.li_3")}</li>
            </ul>
            <br />

            <p>{t("p_4")}</p>

            <h2 className="text-2xl font-bold my-4">{t("h2_3")}</h2>
            <p>{t("p_5")}</p>
            <ol className="list-decimal list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ol_1.li_1")}</li>
                <li>{t("ol_1.li_2")}</li>
                <li>{t("ol_1.li_3")}</li>
                <li>{t("ol_1.li_4")}</li>
            </ol>
            <p>{t("p_6")}</p>

            <h2 className="text-2xl font-bold my-4">{t("h2_4")}</h2>
            <p>{t("p_7")}</p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_3.li_1")}</li>
                <li>{t("ul_3.li_2")}</li>
                <li>{t("ul_3.li_3")}</li>
                <li>{t("ul_3.li_4")}</li>
            </ul>
            <br />

            <p>{t("p_8")}</p>

            <h2 className="text-2xl font-bold my-4">{t("h2_5")}</h2>
            <p>{t("p_9")}</p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_4.li_1")}</li>
                <li>{t("ul_4.li_2")}</li>
                <li>{t("ul_4.li_3")}</li>
            </ul>
            <br />

            <p>{t("p_10")}</p>

            <h2 className="text-2xl font-bold my-4">{t("h2_6")}</h2>
            <p>{t("p_11")}</p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_5.li_1")}</li>
                <li>{t("ul_5.li_2")}</li>
                <li>{t("ul_5.li_3")}</li>
                <li>{t("ul_5.li_4")}</li>
            </ul>
            <br />

            <h2 className="text-2xl font-bold my-4">{t("h2_7")}</h2>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_6.li_1")}</li>
                <li>{t("ul_6.li_2")}</li>
                <li>{t("ul_6.li_3")}</li>
                <li>{t("ul_6.li_4")}</li>
            </ul>
            <br />

            <p>{t("p_12")}</p>

            <h2 className="text-2xl font-bold my-4">{t("h2_8")}</h2>
            <p>{t("p_13")}</p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                <li>{t("ul_7.li_1")}</li>
                <li>{t("ul_7.li_2")}</li>
                <li>{t("ul_7.li_3")}</li>
            </ul>
            <br />

            <p>
                <strong>{t("strong")}</strong>
            </p>
        </div>
    );
};

export default LastRoomsTextSection;
