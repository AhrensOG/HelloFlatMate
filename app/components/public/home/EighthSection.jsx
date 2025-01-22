import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// components/HeroSection.js
export default function EightSection() {
    const t = useTranslations("home");
    return (
        <section className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-2">
            {/* Ilustración */}
            <div className="relative w-[300px] h-[150px] sm:w-[350px] sm:h-[300px]">
                <Image src={"/home/new_home/demasiado.gif"} fill alt="livingroom" className="object-cover overflow-visible" />
            </div>

            {/* Texto */}
            <h1 className="text-2xl sm:text-4xl font-semibold text-gray-800 my-10 mt-20">{t("home_eight_sect_1_title")}</h1>

            {/* Botón */}
            <Link
                href={"/#search"}
                className="px-6 py-3 sm:text-xl bg-violet-300 text-white font-medium rounded shadow hover:bg-violet-400 transition duration-300"
            >
                {t("home_eight_sect_1_link")}
            </Link>
        </section>
    );
}
