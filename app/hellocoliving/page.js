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

const hellocoliving = {
  hero: {
    img: "/home/hero3.jpeg",
    title: "Listo para vivir, listo para estudiar",
    description:
      "Ideales para nómadas digitales, incluyen servicios de atención, limpieza, suministros, Internet y convivencia con compañeros similares, fomentando colaboración y comunidad.",
    // link: "/pages/select-category?c=HELLO_COLIVING",
    link: "/pages/user/filtered?category=HELLO_COLIVING",
  },
  offer: {
    title: "Una Experiencia de Coliving Inigualable",
    description:
      "En el contexto del coliving, donde valoramos la colaboración y la comunidad, ofrecemos servicios adicionales para una experiencia más completa. Además de todos los servicios de atención a huéspedes de helloflatmate.",
    link: "/pages/select-category?c=HELLO_COLIVING",
  },
  family: {
    title: "Diseño Pensado en Estudiantes",
    description:
      "Cada Helloroom está equipada con todo lo que necesitas para tener éxito académico y disfrutar de tu vida universitaria. Desde escritorios amplios hasta espacios de almacenamiento eficiente, hemos pensado en cada detalle.",
    img1: "/home/family3.svg",
    img2: "/home/subFamily3.svg",
  },
};

export default function HelloColiving() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);

  const filterByCategory = (properties) => {
    return properties.filter(
      (property) => property.category === "HELLO_COLIVING"
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
          <HomeNavBar activeSection={"hellocoliving"} />
        </header>
        <div className="w-full flex flex-col">
          <DesktopHero
            img={hellocoliving.hero.img}
            title={hellocoliving.hero.title}
            description={hellocoliving.hero.description}
            link={hellocoliving.hero.link}
          />
          <OffersSection
            title={hellocoliving.offer.title}
            description={hellocoliving.offer.description}
            link={hellocoliving.offer.link}
          />
          <CommunitySection />
          <FamilySection
            title={hellocoliving.family.title}
            description={hellocoliving.family.description}
            img1={hellocoliving.family.img1}
            img2={hellocoliving.family.img2}
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
