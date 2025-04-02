"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AccordionItemV2 = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-300 bg-white rounded-xl p-3">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full p-4 text-left">
                <span className="font-semibold text-gray-800 text-xl">{title}</span>
                <div className="relative w-6 h-6">
                    {/* Línea horizontal */}
                    <motion.div
                        className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
                        animate={{ rotate: isOpen ? 0 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    {/* Línea vertical */}
                    <motion.div
                        className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </button>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <div className="p-4 text-gray-600 text-lg">{content}</div>
            </motion.div>
        </div>
    );
};

const SeventhSection = () => {
    const t = useTranslations("home");

    const items = [
        {
            title: t("home_seventh_sect_1_title"),
            content: t("home_seventh_sect_1_desc"), 
        },
        {
            title: t("home_seventh_sect_2_title"),
            content: t("home_seventh_sect_2_desc"),
        },
        {
            title: t("home_seventh_sect_3_title"),
            content: t("home_seventh_sect_3_desc"),
        },
        // {
        //     title: t("home_seventh_sect_4_title"),
        //     content: t("home_seventh_sect_4_desc"),
        // },
    ];

    return (
        <div className="w-full flex flex-col justify-center items-center py-16 px-2 bg-[#FFE5F7] space-y-10">
            <h2 className="text-4xl font-bold text-gray-800 text-center">{t("home_seventh_sect_h2")}</h2>
            <div className="max-w-screen-lg w-full space-y-4">
                {items.map((item, index) => (
                    <AccordionItemV2 key={index} title={item.title} content={item.content} />
                ))}
            </div>
            <div className="font-bold text-gray-600 text-center">
                {t("home_seventh_sect_div")}
                <Link href={"/faq"} target="_blank" className="pl-1 text-gray-700 underline">
                    {t("home_seventh_sect_link")}
                </Link>
            </div>
        </div>
    );
};

export default SeventhSection;
