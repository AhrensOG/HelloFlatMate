import { useTranslations } from "next-intl";
import Image from "next/image";

// components/Garantias.js
export default function FifthSection() {
    const t = useTranslations("home");
    const garantias = [
        {
            icon: "/home/new_home/mesa-de-ayuda.gif",
            title: t("home_fifth_sect_1_title"),
            description: t("home_fifth_sect_1_desc"),
        },
        {
            icon: "/home/new_home/blindaje.gif",
            title: t("home_fifth_sect_2_title"),
            description: t("home_fifth_sect_2_desc"),
        },
        {
            icon: "/home/new_home/facil.gif",
            title: t("home_fifth_sect_3_title"),
            description: t("home_fifth_sect_3_desc"),
        },
        {
            icon: "/home/new_home/compras.gif",
            title: t("home_fifth_sect_4_title"),
            description: t("home_fifth_sect_4_desc"),
        },
        {
            icon: "/home/new_home/reiniciar.gif",
            title: t("home_fifth_sect_5_title"),
            description: t("home_fifth_sect_5_desc"),
        },
        {
            icon: "/home/new_home/confianza.gif",
            title: t("home_fifth_sect_6_title"),
            description: t("home_fifth_sect_6_desc"),
        },
    ];

    return (
        <section className="py-12 bg-[#E3F0FB] w-full">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">{t("home_fifth_sect_h2")}</h2>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-stretch gap-6 px-2 w-full ">
                {garantias.map((garantia, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 max-w-[500px] w-full flex flex-col justify-start items-center gap-3 hover:scale-[1.025] hover:shadow-reservation-list duration-300 transition"
                    >
                        {/* <div className="flex items-center justify-center mb-4 text-5xl">
              {garantia.icon}
            </div> */}
                        <Image src={garantia.icon} width={100} height={100} alt={garantia.title} />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{garantia.title}</h3>
                        <p className="text-gray-600">{garantia.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
