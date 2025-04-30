import React from "react";
import NavigationButton from "./NavigationButton";
import { useTranslations } from "next-intl";

const BottomNavBar = ({ section }) => {
    const t = useTranslations("worker_panel.bottom_nav");

    const buttonsList = [
        {
            img: "/worker-panel/home.svg",
            alt: "Home Icon",
            title: t("home"),
            link: "/pages/worker-panel/home",
        },
        {
            img: "/worker-panel/check.svg",
            alt: "Task Icon",
            title: t("tasks"),
            link: "/pages/worker-panel/tasks",
        },
    ];

    return (
        <div className="bg-white w-full h-full flex justify-center items-center">
            <div className="p-2 pb-4 w-full h-full max-w-screen flex justify-around items-center border-t">
                {buttonsList.map((b) => {
                    return (
                        <NavigationButton
                            key={b.title}
                            img={b.img}
                            alt={b.alt}
                            title={b.title}
                            link={b.link}
                            gray={section === b.title.replace(" ", "_").toLowerCase() ? false : true}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNavBar;
