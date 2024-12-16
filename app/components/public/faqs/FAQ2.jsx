"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const AccordionItemV2 = ({ title, content, bgColor, titleColor, contentColor }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border-b border-gray-300 ${bgColor} rounded-xl p-3`}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full p-4 text-left">
                <span className={`font-semibold ${titleColor} text-xl text-center w-full`}>{title}</span>
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
                <div className={`p-4 ${contentColor} text-lg text-center`}>{content}</div>
            </motion.div>
        </div>
    );
};

const FAQ2 = ({
    dropdownColor = "bg-white",
    bgColor = "bg-violet-300",
    titleDropdownColor = "text-gray-800",
    contentDropdownColor = "text-gray-600",
}) => {
    const t = useTranslations("FAQ");
    const items = [
        {
            title: t("1_title"),
            content: t("1_desc"),
        },
        {
            title: t("2_title"),
            content: t("2_desc"),
        },
        {
            title: t("3_title"),
            content: t("3_desc"),
        },
        {
            title: t("4_title"),
            content: t("4_desc"),
        },
        {
            title: t("5_title"),
            content: t("5_desc"),
        },
        {
            title: t("6_title"),
            content: t("6_desc"),
        },
        {
            title: t("7_title"),
            content: t("7_desc"),
        },
        {
            title: t("8_title"),
            content: t("8_desc"),
        },
        {
            title: t("9_title"),
            content: t("9_desc"),
        },
        {
            title: t("10_title"),
            content: t("10_desc"),
        },
        {
            title: t("11_title"),
            content: t("11_desc"),
        },
        {
            title: t("12_title"),
            content: t("12_desc"),
        },
        {
            title: t("13_title"),
            content: t("13_desc"),
        },
        {
            title: t("14_title"),
            content: t("14_desc"),
        },
        {
            title: t("15_title"),
            content: t("15_desc"),
        },
        {
            title: t("16_title"),
            content: t("16_desc"),
        },
        {
            title: t("17_title"),
            content: t("17_desc"),
        },
        {
            title: t("18_title"),
            content: t("18_desc"),
        },
        {
            title: t("19_title"),
            content: t("19_desc"),
        },
        {
            title: t("20_title"),
            content: t("20_desc"),
        },
        {
            title: t("21_title"),
            content: t("21_desc"),
        },
        {
            title: t("22_title"),
            content: t("22_desc"),
        },
    ];

    return (
        <div className={`w-full flex flex-col justify-center items-center py-16 px-2 ${bgColor} space-y-10`}>
            <h2 className="text-4xl font-bold text-gray-800 text-center">{t("title")}</h2>
            <div className="max-w-screen-lg w-full space-y-4">
                {items.map((item, index) => (
                    <AccordionItemV2
                        key={index}
                        title={item.title}
                        content={item.content}
                        bgColor={dropdownColor}
                        titleColor={titleDropdownColor}
                        contentColor={contentDropdownColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQ2;
