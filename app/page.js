"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { Context } from "./context/GlobalContext";
import { toast } from "sonner";
import { getAllProperties } from "./context/actions";
import DesktopHero from "./components/user/home/desktop/DesktopHero";
import HomeNavBar from "./components/nav_bar/HomeNavBar";
import OffersSection from "./components/user/home/desktop/OfferSection";
import CommunitySection from "./components/user/home/desktop/CommunitySection";
import FamilySection from "./components/user/home/desktop/FamilySection";
import PropertySlider from "./components/user/home/desktop/PropertySlider";
import InfoSection from "./components/user/home/desktop/InfoSection";
import Banner from "./components/user/home/desktop/Banner";
import Footer from "./components/user/home/desktop/Footer";
import MapSection from "./components/user/home/desktop/auxiliarComponents/MapSection";
import StayWithUs from "./components/user/home/desktop/StayWithUs";
import BotIcon from "./components/public/chat-bot/BotIcon";
import CookieModal from "./components/public/cookies/CookieModal";
import TitleSection from "./components/public/home/TitleSection";
import SecondSection from "./components/public/home/SecondSection";
import ThirdSection from "./components/public/home/ThirdSection";
import FourthSection from "./components/public/home/FourthSection";
import FifthSection from "./components/public/home/FifthSection";
import SixthSection from "./components/public/home/SixthSection";
import SeventhSection from "./components/public/home/SeventhSection";
import EightSection from "./components/public/home/EighthSection";
import Footer_1 from "./components/public/home/Footer";
import NavbarV3 from "./components/nav_bar/NavbarV3";
// import CategorySelector from "./components/public/main-pages/CategorySelector";
import SecondaryCategorySelector from "./components/public/main-pages/SecondaryCategorySelector";
import Image from "next/image";

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
const hellocoliving = {
  hero: {
    img: "/home/hero3.jpeg",
    title: "Listo para vivir, listo para estudiar",
    description:
      "Ideales para nómadas digitales, incluyen servicios de atención, limpieza, suministros, Internet y convivencia con compañeros similares, fomentando colaboración y comunidad.",
    link: "/pages/select-category?c=HELLO_COLIVING",
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
const hellostudio = {
  hero: {
    // img: "/home/hero4.",
    img: "https://www.youtube.com/watch?v=TbgLp9EpTyI",
    title: "Trabaja, conecta y crece en hellostudio",
    description:
      "Espacios de coworking productivos y colaborativos con tecnología avanzada, internet rápido, salas de reuniones, áreas comunes, y eventos comunitarios, ideales para profesionales y emprendedores en crecimiento.",
    link: "/pages/select-category?c=HELLO_STUDIO",
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
      "hellolandlord ofrece habitaciones gestionadas por propietarios de nuestra confianza, diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento al llegar a Valencia por menos de un año",
    img1: "/home/family1.svg",
    img2: "/home/subFamily1.svg",
  },
};

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [helloRoomProperties, setHelloRoomProperties] = useState([]);
  const [helloColivingProperties, setHelloColivingProperties] = useState([]);
  const [helloStudioProperties, setHelloStudioProperties] = useState([]);
  const [helloLandlordProperties, setHelloLandlordProperties] = useState([]);

  const [propertiesInOffer, setPropertiesInOffer] = useState([]);

  // Estados para controlar las secciones visibles
  const [activeSection, setActiveSection] = useState("inicio");

  const filterOffer = (properties) => {
    return properties.filter(
      (property) => property.offer !== null && property.status === "FREE"
    );
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        await getAllProperties(dispatch);
      } catch (error) {
        console.log(error);
        // toast.error("Error al obtener propiedades");
      }
    };

    fetchProperties();
  }, [dispatch]);

  useEffect(() => {
    if (state.properties && state.properties.length > 0) {
      // Filtrar propiedades según la categoría
      const roomProps = state.properties.filter(
        (property) => property.category === "HELLO_ROOM"
      );
      const colivingProps = state.properties.filter(
        (property) => property.category === "HELLO_COLIVING"
      );
      const studioProps = state.properties.filter(
        (property) => property.category === "HELLO_STUDIO"
      );
      const landlordProps = state.properties.filter(
        (property) => property.category === "HELLO_LANDLORD"
      );

      // Actualizar los estados locales
      setProperties(state.properties);
      setHelloRoomProperties(roomProps);
      setHelloColivingProperties(colivingProps);
      setHelloStudioProperties(studioProps);
      setHelloLandlordProperties(landlordProps);
    }
  }, [state.properties]);

  useEffect(() => {
    if (state.properties && state.properties !== properties) {
      setProperties(state.properties);
      setPropertiesInOffer(filterOffer(state.properties));
      // toast.success("Propiedades actualizadas");
    }
  }, [state.properties]);

  const Loader = () => {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader"></div>{" "}
        {/* Puedes crear una animación CSS para el loader */}
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };
  return (
    <div>
      <div className="flex flex-col relative">
        {/* <BotIcon /> */}
        <CookieModal />
        <header>
          <NavbarV3 />
        </header>
        <section className="relative flex flex-col gap-8 bg-white items-center justify-around pb-0 py-10 px-4">
          <h1 className="text-5xl font-bold">helloflatmate</h1>
          <h3 className="text-lg text-center">
            Especializados en gestión de alojamientos para estudiantes en
            Valencia. <br /> ¡Reservas y trámites 100% online, rápido, fácil y
            sin complicaciones!
          </h3>
          <div className="w-full">
            <SecondaryCategorySelector
              helloRoomProperties={helloRoomProperties}
              helloColivingProperties={helloColivingProperties}
              helloStudioProperties={helloStudioProperties}
              helloLandlordProperties={helloLandlordProperties}
              allProperties={properties}
            />
          </div>

          <div className="relative max-w-screen-lg w-full h-[150px] sm:h-[300px] ">
            <Image
              src={"/home/new_home/valencia.png"}
              fill
              className="object-contain object-bottom"
              alt="Valencia"
            />
          </div>
        </section>
        <SecondSection />
        <SixthSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SeventhSection />
        <EightSection />
        <Footer_1 />
      </div>
    </div>
  );
}
