import { useTranslations } from "next-intl";

export default function SecondSection() {
    const t = useTranslations("home");
    return (
        <section className="bg-[#E3F0FB] w-full py-10 px-2 flex flex-wrap justify-center gap-6 items-center">
            <div className="bg-white p-1 w-full max-w-[10rem] md:max-w-[20rem] h-[5rem] rounded-2xl flex justify-center items-center font-bold text-center md:text-xl">
                {t("home_second_sect_1")}
            </div>
            <div className="bg-white p-1 w-full max-w-[10rem] md:max-w-[20rem] h-[5rem] rounded-2xl flex justify-center items-center font-bold text-center md:text-xl">
                {t("home_second_sect_2")}
            </div>
            <div className="bg-white p-1 w-full max-w-[10rem] md:max-w-[20rem] h-[5rem] rounded-2xl flex justify-center items-center font-bold text-center md:text-xl">
                {t("home_second_sect_3")}
            </div>
        </section>
    );
}
