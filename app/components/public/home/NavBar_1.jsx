"use client";
import Link from "next/link";
import Dropdown from "../auth/Dropdown";
import Image from "next/image";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function NavBar_1({ fixed = false }) {
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations("nav_bar");

    const [locale, setLocale] = useState("es"); // Valor por defecto

    // Asegurarse de que localStorage se accede solo en el cliente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const preferredLanguage = localStorage.getItem("preferredLanguage")?.toLocaleLowerCase() || "es";
            setLocale(preferredLanguage);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav
            className={`flex items-center justify-between py-2 px-10 z-30 border-b border-[#c7c7c7] bg-white ${
                fixed ? "fixed top-0 w-full h-16 z-20" : "relative"
            } `}
        >
            {/* Icono de menú hamburguesa a la izquierda */}
            <div className="md:hidden">
                <button onClick={toggleMenu} aria-label="Toggle menu" className="absolute left-4">
                    <Bars3Icon className="size-6" />
                </button>
            </div>
            <Link href={`/${locale}`}>
                <Image src="/home/new_home/Helloflatmate.png" width={100} height={31.25} alt="logo" />
            </Link>
            <div className="hidden md:flex items-center gap-5">
                {/* <button className="border py-3 px-5 font-bold text-lg border-black">Soy un propietario</button> */}
                <Link href={`/${locale}/lastrooms`} target="_blank" className="font-bold text-base border border-black p-2 px-5">
                    last rooms
                </Link>
                <Link href={`/${locale}/como-funciona`} target="_blank" className="font-bold text-base">
                    {t("link_how_it_works")}
                </Link>
                <Link href={`/${locale}/terminos-y-condiciones`} target="_blank" className="font-bold text-base">
                    {t("link_terms_and_conditions")}
                </Link>
                <div className="flex gap-1">
                    <Link href={`/${locale}/pages/auth?register=true`} target="_blank" className="font-bold text-base">
                        {t("link_register")}
                    </Link>
                    <span className="font-bold text-base">|</span>
                    <Link href={`/${locale}/pages/auth`} target="_blank" className="font-bold text-base">
                        {t("link_login")}
                    </Link>
                </div>
                {/* <Link href="#" target="_blank" className="font-bold text-lg">
                    Ayuda
                </Link> */}
                <Dropdown p={0} />
            </div>

            {/* Menú desplegable solo para móvil (no se abrirá) */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-md p-4 md:hidden">
                    {/* <button className="border py-3 px-5 font-bold text-lg border-black w-full">Soy un propietario</button> */}
                    <Link href="#" target="_blank" className="block font-bold text-lg mt-2">
                        {t("link_how_it_works")}
                    </Link>
                    <Link href="#" target="_blank" className="block font-bold text-lg mt-2">
                        {t("link_terms_and_conditions")}
                    </Link>
                    <div className="flex flex-col mt-2">
                        <Link href="#" target="_blank" className="block font-bold text-lg">
                            {t("link_register")}
                        </Link>
                        <span className="block font-bold text-lg my-1">|</span>
                        <Link href="#" target="_blank" className="block font-bold text-lg">
                            {t("link_login")}
                        </Link>
                    </div>
                    {/* <Link href="#" target="_blank" className="block font-bold text-lg mt-2">
                        Ayuda
                    </Link> */}
                    <Dropdown p={0} />
                </div>
            )}
        </nav>
    );
}
