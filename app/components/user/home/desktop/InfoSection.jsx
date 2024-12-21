import React from "react";
import InfoCard from "./auxiliarComponents/InfoCard";
import { useTranslations } from "next-intl";

const InfoSection = () => {
    const t = useTranslations("hellostudio_page.info_section");
    const list = [
        {
            img: "/home/objetivo.gif",
            title: t("title_1"),
            description: t("desc_1"),
        },
        {
            img: "/home/seguro.gif",
            title: t("title_2"),
            description: t("desc_2"),
        },
        {
            img: "/home/robot-de-chat.gif",
            title: t("title_3"),
            description: t("desc_3"),
        },
        {
            img: "/home/lugar-de-trabajo.gif",
            title: t("title_4"),
            description: t("desc_4"),
        },
        {
            img: "/home/mantenimiento.gif",
            title: t("title_5"),
            description: t("desc_5"),
        },
        {
            img: "/home/idea.gif",
            title: t("title_6"),
            description: t("desc_6"),
        },
    ];

    return (
        <div className="p-2 flex flex-col justify-center items-center gap-4 py-20 pt-10">
            <div className="flex flex-col justify-center items-start gap-10 max-w-screen-lg w-full">
                <h2 className="text-2xl sm:text-3xl font-medium">{t("h2")}</h2>
                <div className="flex flex-row flex-wrap justify-around items-center gap-4">
                    {list.map((item) => {
                        return <InfoCard img={item.img} title={item.title} description={item.description} key={item.title} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
