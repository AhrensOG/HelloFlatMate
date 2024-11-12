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

const helloroom = {
  hero: {
    // img: "/home/hero2.jpeg",
    img: "https://www.youtube.com/watch?v=TbgLp9EpTyI",
    title: "Listo para vivir, listo para estudiar",
    description:
      "Ideales para nómadas digitales, incluyen servicios de atención, limpieza, suministros, Internet y convivencia con compañeros similares, fomentando colaboración y comunidad.",
    link: "/pages/select-category?c=HELLO_ROOM",
  },
  offer: {
    title: "Vive una Experiencia Lista para Habitar desde el Primer Momento",
    description:
      "Nuestras acogedoras hellorooms están diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento dado que vienen a Valencia por menos de un año y son gestionadas por los agentes de helloflatmate",
    link: "/pages/select-category?c=HELLO_ROOM",
  },
  family: {
    title: "Diseño Pensado en Estudiantes",
    description:
      "Cada helloroom está equipada con todo lo que necesitas para tener éxito académico y disfrutar de tu vida universitaria. Desde escritorios amplios hasta espacios de almacenamiento eficiente, hemos pensado en cada detalle.",
    img1: "/home/family2.svg",
    img2: "/home/subFamily2.svg",
  },
};

export default function HelloRoom() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);

  const filterByCategory = (properties) => {
    return properties.filter((property) => property.category === "HELLO_ROOM");
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
        <header>
          <HomeNavBar activeSection={"helloroom"} />
        </header>
        <div className="w-full flex flex-col">
          <DesktopHero
            img={helloroom.hero.img}
            title={helloroom.hero.title}
            description={helloroom.hero.description}
            link={helloroom.hero.link}
          />
          <OffersSection
            title={helloroom.offer.title}
            description={helloroom.offer.description}
            link={helloroom.offer.link}
          />
          <CommunitySection />
          <FamilySection
            title={helloroom.family.title}
            description={helloroom.family.description}
            img1={helloroom.family.img1}
            img2={helloroom.family.img2}
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
