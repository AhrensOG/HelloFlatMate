import { useTranslations } from "next-intl";

export default function CommunitySection() {
    const t = useTranslations("hellostudio_page.community_section");
    return (
        <section className="w-full py-10 pb-20 px-2 bg-white flex flex-col items-center justify-center">
            {/* Título */}
            <h2 className="w-full max-w-[480px] text-[40px] leading-[50px] font-normal text-center tracking-[-0.6px] text-black">{t("h2")}</h2>

            {/* Párrafo */}
            <p className="w-full max-w-[913px] mt-4 text-[18px] leading-[27px] text-center text-[#67686A]">{t("p")}</p>
        </section>
    );
}
