"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "@/app/context/GlobalContext";
import { getAllProperties } from "@/app/context/actions";
import HomeNavBar from "@/app/components/nav_bar/HomeNavBar";
import DesktopHero from "@/app/components/user/home/desktop/DesktopHero";
import OffersSection from "@/app/components/user/home/desktop/OfferSection";
import CommunitySection from "@/app/components/user/home/desktop/CommunitySection";
import FamilySection from "@/app/components/user/home/desktop/FamilySection";
import PropertySlider from "@/app/components/user/home/desktop/PropertySlider";
import InfoSection from "@/app/components/user/home/desktop/InfoSection";
import Banner from "@/app/components/user/home/desktop/Banner";
import Footer from "@/app/components/user/home/desktop/Footer";
import MapSection from "@/app/components/user/home/desktop/auxiliarComponents/MapSection";
import { useTranslations } from "next-intl";

export default function HelloStudio() {
    const t = useTranslations("hellostudio_page");
    const hellostudio = {
        hero: {
            // img: "/home/hero4.",
            img: "https://www.youtube.com/watch?v=TbgLp9EpTyI",
            title: t("hero.title"),
            description: t("hero.desc"),
            // link: "/pages/select-category?c=HELLO_STUDIO",
            link: "/pages/user/filtered?category=HELLO_STUDIO",
        },
        offer: {
            title: t("offer.title"),
            description: t("offer.desc"),
            link: "/pages/select-category?c=HELLO_STUDIO",
        },
        family: {
            title: t("family.title"),
            description: t("family.desc"),
            img1: "/home/family4.svg",
            img2: "/home/subFamily4.svg",
        },
    };
    const { state, dispatch } = useContext(Context);
    const [properties, setProperties] = useState([]);

    const filterByCategory = (properties) => {
        return properties.filter((property) => property.category === "HELLO_STUDIO");
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                await getAllProperties(dispatch);
            } catch (error) {
                toast.error("Error al obtener propiedades");
            }
        };

        fetchProperties();
    }, [dispatch]);

    useEffect(() => {
        if (state.properties && state.properties !== properties) {
            setProperties(filterByCategory(state.properties));
        }
    }, [state.properties]);

    return (
        <div>
            <div className="flex flex-col sm:min-h-screen">
                <header className="mb-[144px]">
                    <HomeNavBar activeSection={"hellostudio"} />
                </header>
                <div className="w-full flex flex-col">
                    <DesktopHero
                        img={hellostudio.hero.img}
                        title={hellostudio.hero.title}
                        description={hellostudio.hero.description}
                        link={hellostudio.hero.link}
                    />
                    <OffersSection title={hellostudio.offer.title} description={hellostudio.offer.description} link={hellostudio.offer.link} />
                    <CommunitySection />
                    <FamilySection
                        title={hellostudio.family.title}
                        description={hellostudio.family.description}
                        img1={hellostudio.family.img1}
                        img2={hellostudio.family.img2}
                    />
                    <PropertySlider data={properties} />
                    <MapSection />
                </div>
                <InfoSection />
                <Banner />
                <Footer />
            </div>
        </div>
    );
}
