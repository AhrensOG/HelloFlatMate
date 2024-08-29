"use client";
import Filter from "@/app/components/user/filter/Filter";
import { getAllProperties } from "../../../../context/actions";
import NavBar from "@/app/components/nav_bar/NavBar";
import PropertyCard from "@/app/components/user/property/PropertyCard";
import SearchBarFiltered from "@/app/components/user/search_bar/SearchBarFiltered";
import { Context } from "@/app/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Filtered(params) {
  const { state, dispatch } = useContext(Context);
  const { word } = params.params;
  const [properties, setProperties] = useState(state?.properties || []);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ word: word });
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        await getAllProperties(dispatch);
        setProperties(state.properties || []);
        setFilteredProperties(filterBySearch(state.properties || []));
      } catch (error) {
        toast.error("Error al obtener propiedades");
      }
    };
    if (state.properties === undefined) {
      // Verifica si state.properties está disponible
      fetchProperties();
    } else {
      setProperties(state.properties);
      setFilteredProperties(filterBySearch(state.properties || []));
    }
  }, [state.properties, dispatch]);

  useEffect(() => {
    if (properties.length > 0) {
      applyFilters();
    }
  }, [filters, properties]);
  const handleFilterChange = (filterName, selectedValues) => {
    if (filterName === "search") {
      // Actualiza el estado word cuando el filtro de búsqueda cambia
      setFilters((prevFilters) => ({
        ...prevFilters,
        word: selectedValues,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: selectedValues,
      }));
    }
  };

  // Filtros

  const filterByCategory = (properties) => {
    if (!filters.categorys || filters.categorys.length === 0) {
      return properties;
    }
    const filterProperties = properties.filter((property) =>
      filters.categorys.includes(
        property.category.toLowerCase().replace("_", "")
      )
    );
    return filterProperties;
  };

  const filterByComodities = (properties) => {
    if (!filters.comodities || filters.comodities.length === 0) {
      return properties;
    }
    const filterProperties = properties.filter((property) =>
      filters.comodities.some((comodity) =>
        property.amenities.includes(comodity)
      )
    );
    return filterProperties;
  };

  const filterByPriceRange = (properties) => {
    if (
      !filters.minPrice ||
      !filters.maxPrice ||
      filters.minPrice === 0 ||
      filters.maxPrice === 0
    ) {
      return properties;
    }

    const filterProperties = properties.filter((property) => {
      const isPropertyInPriceRange =
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice;

      const hasValidRoom = property.rooms.some((room) => {
        return (
          room.price >= filters.minPrice &&
          room.price <= filters.maxPrice &&
          room.status === "FREE"
        );
      });

      return isPropertyInPriceRange || hasValidRoom;
    });

    return filterProperties;
  };

  const filterByLocation = (properties) => {
    let filterProperties;
    if (!filters.location) {
      return properties;
    }
    filterProperties = properties.filter((property) => {
      let location =
        property.city + " " + property.street + " " + property.streetNumber;
      return location.toLowerCase().includes(filters.location.toLowerCase());
    });
    return filterProperties;
  };

  const filterBySearch = (properties) => {
    if (!filters.word || filters.word.length === 0) {
      return properties;
    }
    const filterProperties = properties.filter((property) =>
      property.name.toLowerCase().includes(filters.word.toLowerCase())
    );
    return filterProperties;
  };

  const applyFilters = () => {
    let result = filterBySearch(properties);
    result = filterByCategory(result);
    result = filterByComodities(result);
    result = filterByPriceRange(result);
    result = filterByLocation(result);
    setFilteredProperties(result);
  };

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main className="mt-3">
        <SearchBarFiltered
          initialValue={filters?.word || ""}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onChange={handleFilterChange} // Ajusta si es necesario
          onApplyFilters={applyFilters}
        />
        <div className="flex flex-col m-3 mt-7 gap-7">
          {filteredProperties?.length === 0 ? (
            <div className="flex items-center justify-center h-screen">
              <p>No se encontraron propiedades</p>
            </div>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard key={property?.id} property={property} />
            ))
          )}
        </div>
      </main>
      <Filter
        isOpen={showFilters}
        setOpen={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
        onFilterChange={handleFilterChange} // Pasa la función handleFilterChange
      />
    </div>
  );
}
