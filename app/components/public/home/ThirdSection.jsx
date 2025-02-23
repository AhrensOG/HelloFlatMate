import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ThirdSection() {
    const t = useTranslations("home");

    const articles = [
        {
            title: t("home_third_sect_1_title"),
            description: t("home_third_sect_1_desc"),
            image: "/home/new_home/dormir.png",
        },
        {
            title: t("home_third_sect_2_title"),
            description: t("home_third_sect_2_desc"),
            image: "/home/new_home/documento.png",
        },
        {
            title: t("home_third_sect_3_title"),
            description: t("home_third_sect_3_desc"),
            image: "/home/new_home/robot-de-chat.png",
        },
        {
            title: t("home_third_sect_4_title"),
            description: t("home_third_sect_4_desc"),
            image: "/home/new_home/escritorio.png",
        },
        {
            title: t("home_third_sect_5_title"),
            description: t("home_third_sect_5_desc"),
            image: "/home/new_home/mecanico.png",
        },
        {
            title: t("home_third_sect_6_title"),
            description: t("home_third_sect_6_desc"),
            image: "/home/new_home/lampara-de-escritorio.gif",
        },
    ];

    return (
        <section className="w-full bg-white flex flex-wrap justify-center items-stretch mt-10 gap-6 px-2 py-10">
            {articles.map(({ title, description, image }, index) => (
                <article
                    key={index}
                    className="border-2 rounded-2xl flex flex-col items-center justify-between gap-4 p-4 w-full max-w-[500px] hover:scale-[1.025] hover:shadow-reservation-list duration-300 transition"
                >
                    <h1 className="text-3xl font-bold text-center">{title}</h1>
                    <h2 className="text-lg text-center">{description}</h2>
                    <Image src={image} width={130} height={130} alt={title} />
                </article>
            ))}
        </section>
    );
}
