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
import PropertyCard from "./components/user/home/desktop/auxiliarComponents/PropertyCard";
import PropertySlider from "./components/user/home/desktop/PropertySlider";
import InfoSection from "./components/user/home/desktop/InfoSection";
import Banner from "./components/user/home/desktop/Banner";
import Footer from "./components/user/home/desktop/Footer";

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [propertiesInOffer, setPropertiesInOffer] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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
  }, []);

  useEffect(() => {
    if (state.properties && state.properties !== properties) {
      setProperties(state.properties.filter((prop) => prop.status === "FREE"));
      setPropertiesInOffer(filterOffer(state.properties));
      toast.success("Propiedades actualizadas");
    }
  }, [state.properties, dispatch]);

  return (
    <div>
      <div className="flex flex-col sm:min-h-screen">
        <header>
          <HomeNavBar />
        </header>

        {/* El DesktopHero ocupará el resto de la pantalla */}
        <DesktopHero />
        <OffersSection />
        <CommunitySection />
        <FamilySection />
        <PropertySlider data={properties} />
        <InfoSection />
        <Banner />
        <Footer />
      </div>
    </div>
  );
}
