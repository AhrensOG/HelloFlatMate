"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { getAllProperties } from "../context/actions";
import HomeNavBar from "../components/nav_bar/HomeNavBar";
import DesktopHero from "../components/user/home/desktop/DesktopHero";
import OffersSection from "../components/user/home/desktop/OfferSection";
import CommunitySection from "../components/user/home/desktop/CommunitySection";
import FamilySection from "../components/user/home/desktop/FamilySection";
import PropertySlider from "../components/user/home/desktop/PropertySlider";
import InfoSection from "../components/user/home/desktop/InfoSection";
import Banner from "../components/user/home/desktop/Banner";
import Footer from "../components/user/home/desktop/Footer";
import MapSection from "../components/user/home/desktop/auxiliarComponents/MapSection";

const hellostudio = {
  hero: {
    // img: "/home/hero4.",
    img: "https://www.youtube.com/watch?v=TbgLp9EpTyI",
    title: "Trabaja, conecta y crece en hellostudio",
    description:
      "Espacios de coworking productivos y colaborativos con tecnología avanzada, internet rápido, salas de reuniones, áreas comunes, y eventos comunitarios, ideales para profesionales y emprendedores en crecimiento.",
    // link: "/pages/select-category?c=HELLO_STUDIO",
    link: "/pages/user/filtered?category=HELLO_STUDIO",
  },
  offer: {
    title: "Flexibilidad y comodidad",
    description:
      "Nuestros espacios están diseñados para adaptarse a tus horarios y necesidades. Ya sea que necesites trabajar temprano en la mañana o tarde en la noche, hellostudio está siempre disponible para ti.",
    link: "/pages/select-category?c=HELLO_STUDIO",
  },
  family: {
    title: "Perfecto para estudiar toda tu carrera en Valencia",
    description:
      "hellostudio ofrece un ambiente productivo y colaborativo diseñado para profesionales y emprendedores. Disfruta de espacios modernos y funcionales que fomentan la creatividad y la eficiencia.En HelloStudio, encontrarás alta tecnología, internet rápido, salas de reuniones equipadas, áreas comunes cómodas y eventos comunitarios que fomentan el networking y la colaboración",
    img1: "/home/family4.svg",
    img2: "/home/subFamily4.svg",
  },
};

export default function HelloStudio() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);

  const filterByCategory = (properties) => {
    return properties.filter(
      (property) => property.category === "HELLO_STUDIO"
    );
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
          <OffersSection
            title={hellostudio.offer.title}
            description={hellostudio.offer.description}
            link={hellostudio.offer.link}
          />
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
