import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HTMLReactParser from "html-react-parser";
import Link from "next/link";

export default function SixthSection() {
    const router = useRouter();
    const t = useTranslations("home");

    const alojamientos = [
        {
            title: t("home_sixth_sect_1_title"),
            description: t("home_sixth_sect_1_desc"),
            imageUrl: "/home/new_home/landlord.png",
            link: "/hellolandlord",
        },
        {
            title: t("home_sixth_sect_2_title"),
            description: t("home_sixth_sect_2_desc"),
            imageUrl: "/home/new_home/hellorooms.png",
            link: "/alquiler-habitaciones-valencia",
        },
        {
            title: t("home_sixth_sect_3_title"),
            description: t("home_sixth_sect_3_desc"),
            imageUrl: "/home/new_home/hellostudio.png",
            link: "/hellostudio",
        },
        {
            title: t("home_sixth_sect_4_title"),
            description: t("home_sixth_sect_4_desc"),
            imageUrl: "/home/new_home/hellocoliving.png",
            link: "/coliving-valencia",
        },
    ];

    return (
        <section className="py-12 w-full">
            <div className="max-w-screen-xl mx-auto px-4">

                <h2 className="text-3xl text-center mb-12">
                    <strong>{t("home_sixth_sect_h2_strong")}</strong> {HTMLReactParser(t("home_sixth_sect_h2"))}
                </h2>
                <div className="flex flex-wrap justify-center items-stretch gap-8">
                    {alojamientos.map((alojamiento, index) => (
                        <Link
                            href={alojamiento.link}
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 max-w-64 w-full space-y-4 hover:scale-[1.025] hover:shadow-reservation-list transition duration-300 cursor-pointer"
                        >
                            <div className="relative w-full h-48">
                                <Image src={alojamiento.imageUrl} alt={alojamiento.title} fill className="rounded-lg object-cover" />
                            </div>
                            <div className="">
                                <span className="bg-violet-300 px-3 py-2 rounded-full text-xs text-white font-semibold">{alojamiento.title}</span>
                                <p className="mt-2 text-gray-600 text-sm">{alojamiento.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
