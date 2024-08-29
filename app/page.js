"use client";
import { useContext, useEffect, useState } from "react";
import GuestHome from "./components/guest-home/GuestHome";
import FeaturedSection from "./components/home/FeaturedSection";
import Hero from "./components/home/Hero";
import PromotionSection from "./components/home/PromotionSection";
import NavBar from "./components/nav_bar/NavBar";
import SearchBar from "./components/search_bar/SearchBar";
import { Context } from "./context/GlobalContext";
import { toast } from "sonner";
import { getAllProperties } from "./context/actions";
import Filter from "./components/filter/Filter";

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [propertiesInOffer, setPropertiesInOffer] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const filterOffer = (properties) => {
    return properties.filter((property) => property.offer !== null);
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
    // Solo actualiza si hay un cambio en state.properties
    if (state.properties && state.properties !== properties) {
      setProperties(state.properties);
      setPropertiesInOffer(filterOffer(state.properties));
      toast.success("Propiedades actualizadas");
    }
  }, [state.properties, dispatch]);

  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main>
        <Hero />
        <div className="w-full pt-4">
          <SearchBar showFilters={showFilters} setShowFilters={setShowFilters} />
        </div>
        <FeaturedSection data={properties} />
        <PromotionSection data={propertiesInOffer} />
      </main>
    </div>
  );
}
