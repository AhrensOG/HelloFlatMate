"use client";
import { useContext, useEffect, useState } from "react";
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

const helloroom = {
  hero: {
    img: "/home/hero2.jpeg",
    title: "Listo para vivir, listo para estudiar",
    description:
      "Ideales para nómadas digitales, incluyen servicios de atención, limpieza, suministros, Internet y convivencia con compañeros similares, fomentando colaboración y comunidad.",
    link: "/pages/select-category?c=HELLO_ROOM",
  },
  offer: {
    title: "Vive una Experiencia Lista para Habitar desde el Primer Momento",
    description:
      "Nuestras acogedoras Hello Rooms están diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento dado que vienen a Valencia por menos de un año y son gestionadas por los agentes de helloflatmate",
    link: "/pages/select-category?c=HELLO_ROOM",
  },
  family: {
    title: "Diseño Pensado en Estudiantes",
    description:
      "Cada Helloroom está equipada con todo lo que necesitas para tener éxito académico y disfrutar de tu vida universitaria. Desde escritorios amplios hasta espacios de almacenamiento eficiente, hemos pensado en cada detalle.",
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
    img: "/home/hero4.jpeg",
    title: "Trabaja, conecta y crece en HelloStudio",
    description:
      "Espacios de coworking productivos y colaborativos con tecnología avanzada, internet rápido, salas de reuniones, áreas comunes, y eventos comunitarios, ideales para profesionales y emprendedores en crecimiento.",
    link: "/pages/select-category?c=HELLO_STUDIO",
  },
  offer: {
    title: "Flexibilidad y Comodidad",
    description:
      "Nuestros espacios están diseñados para adaptarse a tus horarios y necesidades. Ya sea que necesites trabajar temprano en la mañana o tarde en la noche, hellostudio está siempre disponible para ti.",
    link: "/pages/select-category?c=HELLO_STUDIO",
  },
  family: {
    title: "Perfecto para Estudiar Toda tu Carrera en Valencia",
    description:
      "HelloStudio ofrece un ambiente productivo y colaborativo diseñado para profesionales y emprendedores. Disfruta de espacios modernos y funcionales que fomentan la creatividad y la eficiencia.En HelloStudio, encontrarás alta tecnología, internet rápido, salas de reuniones equipadas, áreas comunes cómodas y eventos comunitarios que fomentan el networking y la colaboración",
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
      "Hello Landlord ofrece habitaciones gestionadas por propietarios de nuestra confianza, diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento al llegar a Valencia por menos de un año",
    img1: "/home/family1.svg",
    img2: "/home/subFamily1.svg",
  },
};

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
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
        toast.error("Error al obtener propiedades");
      }
    };

    fetchProperties();
  }, [dispatch]);

  useEffect(() => {
    if (state.properties && state.properties !== properties) {
      setProperties(state.properties);
      setPropertiesInOffer(filterOffer(state.properties));
      // toast.success("Propiedades actualizadas");
    }
  }, [state.properties]);

  return (
    <div>
      <div className="flex flex-col sm:min-h-screen">
        <header>
          <HomeNavBar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </header>

        {/* Sección activa controlada por el estado */}
        {activeSection === "inicio" && (
          <div className="w-full flex flex-col">
            <DesktopHero />
            <OffersSection />
            <CommunitySection />
            <FamilySection />
            <PropertySlider data={properties} />
          </div>
        )}

        {/* {activeSection === "helloroom" && (
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
          </div>
        )}

        {activeSection === "hellocoliving" && (
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
          </div>
        )}

        {activeSection === "hellostudio" && (
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
          </div>
        )}

        {activeSection === "hellolandlord" && (
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
          </div>
        )} */}
        <InfoSection />
        <Banner />
        <Footer />
      </div>
    </div>
  );
}
