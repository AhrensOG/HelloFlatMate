"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { getAllProperties } from "../context/actions";
import HomeNavBar from "../components/nav_bar/HomeNavBar";
import DesktopHero from "../components/user/home/desktop/DesktopHero";
import OffersSectionHelloroom from "../components/user/home/desktop/helloroom/OfferSectionHelloroom";
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
    title: "¡Descubre nuestras habitaciones hellorooms para estudiantes!",
    description:
      "Estas habitaciones son gestionadas por el equipo de helloflatmate para brindar a los estudiantes una estancia cómoda, segura y sin complicaciones. ",
    link: "/pages/select-category?c=HELLO_ROOM",
  },
  offer: {
    title: "¡Disfruta de una habitación limpia y preparada a tu llegada junto con la mejor atención personalizada!",
    description:
      "Equipadas y listas para que puedas instalarte desde el primer día, con todos los servicios activos, incluyendo conexión a Internet de alta velocidad. En hellorooms nos encargamos de todo lo relacionado con la gestión de tu estancia, gestión de  mantenimiento, para que sólo tengas que preocuparte de estudiar, explorar la ciudad y disfrutar de tu experiencia en Valencia, compartiendo piso con otros estudiantes de edad igual o similar.",
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
          <OffersSectionHelloroom
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
          <InfoSection />
          <PropertySlider data={properties} />
          
          {/* <MapSection /> */}
        </div>
        
        <Banner />
        <Footer />
      </div>
    </div>
  );
}
