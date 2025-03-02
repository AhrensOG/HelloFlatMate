"use client";
import Link from "next/link";
import Dropdown from "../public/auth/Dropdown";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "@/app/context/GlobalContext";
import { logOut } from "@/app/firebase/logOut";
import { useTranslations } from "next-intl";

export default function NavbarV3({ fixed = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useContext(Context);
    const [socket, setSocket] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const user = state?.user;
    const t = useTranslations("nav_bar");

    const [locale, setLocale] = useState("es");
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const savedLocale = localStorage.getItem("preferredLanguage");
        if (savedLocale) {
            setLocale(savedLocale);
        }
    }, []);

    const renderMenuOptions = () => {
        switch (user?.role) {
            case "ADMIN":
                return (
                    <>
                        <Link
                            href={`/pages/admin/properties`}
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("admin_link_1")}
                        </Link>
                    </>
                );
            case "OWNER":
                return (
                    <>
                        <Link
                            href="/owner/properties"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("owner_link_1")}
                        </Link>
                        <Link
                            href="/owner/earnings"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("owner_link_2")}
                        </Link>
                    </>
                );
            case "CLIENT":
                return (
                    <>
                        <Link
                            href="/pages/user/profile"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("user_link_1")}
                        </Link>
                        <Link
                            href="/pages/user/my-bedrooms"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("user_link_2")}
                        </Link>
                        <Link
                            href="/pages/user/my-reservations"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("user_link_3")}
                        </Link>
                        <Link
                            href="/pages/user/history/payments"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("user_link_4")}
                        </Link>
                    </>
                );
            case "WORKER":
                return (
                    <>
                        <Link
                            href="/worker/tasks"
                            className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            {t("worker_link_1")}
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <nav
            className={`flex items-center justify-between py-2 px-4 lg:px-10 z-30 border-b border-[#c7c7c7] bg-white ${
                fixed ? "fixed top-0 w-full h-16 z-20" : "relative"
            } `}
        >
            {/* Icono de menú hamburguesa a la izquierda */}
            <div className="md:hidden flex justify-center items-center">
                <button onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>

            {/* Logo */}
            <Link href={`/`}>
                <Image src="/home/new_home/Helloflatmate.png" width={150} height={47.45} alt="logo" />
            </Link>

            {/* Menú de escritorio */}
            <div className="hidden md:flex items-center gap-5">
                {console.log(state)}
                <Link
                    href={`/${locale?.toLowerCase()}/ultimas-habitaciones`}
                    target="_blank"
                    className="font-bold text-base border border-black py-1 p-2 px-5"
                >
                    Last rooms
                </Link>
                <Link href={`/${locale?.toLowerCase()}/como-funciona`} target="_blank" className="font-bold text-base">
                    {t("link_how_it_works")}
                </Link>
                <Link href={`/${locale?.toLowerCase()}/terminos-y-condiciones`} target="_blank" className="font-bold text-base">
                    {t("link_terms_and_conditions")}
                </Link>

                {user ? (
                    <div className="relative group">
                        <button className="flex items-center gap-2 font-bold text-base">
                            {user.name} <ChevronDownIcon className="size-4 text-gray-500" />
                        </button>
                        <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md hidden group-hover:block shadow-reservation-list">
                            {renderMenuOptions()}
                            <button
                                onClick={() => logOut()}
                                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500 w-full text-start"
                            >
                                {t("logout")}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-1">
                        <Link href={`/${locale?.toLowerCase()}/pages/auth?register=true`} className="font-bold text-base">
                            {t("link_register")}
                        </Link>
                        <span className="font-bold text-base">|</span>
                        <Link href={`/${locale?.toLowerCase()}/pages/auth`} className="font-bold text-base">
                            {t("link_login")}
                        </Link>
                    </div>
                )}
                <Dropdown p={0} />
            </div>

            {/* Menú móvil con animación */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-16 left-0 w-full bg-white rounded-md p-4 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col">
                            <Link
                                href="/ultimas-habitaciones"
                                target="_blank"
                                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            >
                                Last rooms
                            </Link>
                            <Link
                                href={`/${locale?.toLowerCase()}/como-funciona`}
                                target="_blank"
                                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            >
                                {t("link_how_it_works")}
                            </Link>
                            <Link
                                href="/privacy-policy"
                                target="_blank"
                                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            >
                                {t("link_terms_and_conditions")}
                            </Link>
                            {user ? (
                                <>
                                    {renderMenuOptions()}
                                    <button
                                        onClick={() => logOut()}
                                        className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                    >
                                        {t("logout")}
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <Link
                                        href="/pages/auth?register=true"
                                        className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                    >
                                        {t("link_register")}
                                    </Link>
                                    <Link
                                        href="/pages/auth"
                                        className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                    >
                                        {t("link_login")}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
