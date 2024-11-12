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

const hellolandlord = {
  hero: {
    img: "/home/hero5.jpeg",
    title: "Inquilinos ideales, gestión en tus manos.",
    description:
      "HelloLandlord conecta propietarios con inquilinos ideales. Nos encargamos del contrato y la publicidad, mientras tú gestionas la propiedad de forma sencilla y segura.",
    link: "/pages/select-category?c=HELLO_LANDLORD",
  },
  offer: {
    title: "Propiedades de Calidad",
    description:
      "Accede a una selección de departamentos bien mantenidos y equipados, listos para que te mudes de inmediato. Nos aseguramos de que cada propiedad cumpla con nuestros altos estándares de calidad.",
    link: "/pages/select-category?c=HELLO_LANDLORD",
  },
  family: {
    title: "Habitaciones Gestionadas para tu Comodidad",
    description:
      "Hello Landlord ofrece habitaciones gestionadas por propietarios de nuestra confianza, diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento al llegar a Valencia por menos de un año",
    img1: "/home/family1.svg",
    img2: "/home/subFamily1.svg",
  },
};

export default function HelloLandlord() {
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
        <header>
          <HomeNavBar activeSection={"hellolandlord"} />
        </header>
        <div className="w-full flex flex-col">
          <DesktopHero
            img={hellolandlord.hero.img}
            title={hellolandlord.hero.title}
            description={hellolandlord.hero.description}
            link={hellolandlord.hero.link}
          />
          <OffersSection
            title={hellolandlord.offer.title}
            description={hellolandlord.offer.description}
            link={hellolandlord.offer.link}
          />
          <CommunitySection />
          <FamilySection
            title={hellolandlord.family.title}
            description={hellolandlord.family.description}
            img1={hellolandlord.family.img1}
            img2={hellolandlord.family.img2}
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
