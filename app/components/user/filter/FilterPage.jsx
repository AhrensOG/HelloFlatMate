import Filter from "@/app/components/user/filter/Filter";
import { getAllProperties } from "@/app/context/actions";
import NavBar from "@/app/components/nav_bar/NavBar";
import PropertyCard from "@/app/components/user/property/PropertyCard";
import SearchBarFiltered from "@/app/components/user/search_bar/SearchBarFiltered";
import { Context } from "@/app/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import DesktopFilter from "./DesktopFilter";

export default function FilterPage() {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const category = searchParams.get("category");
  const location = searchParams.get("zone"); // Cambiado de `zone` a `location` para representar la búsqueda por ubicación
  const occupants = searchParams.get("numberOccupants");

  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState(state?.properties || []);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    word: "",
    startDate: startDate || "",
    endDate: endDate || "",
    categorys: category ? [category] : [],
    location: location || "",
  });
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Extraer los parámetros de búsqueda al cargar la página
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: startDate || "",
      endDate: endDate || "",
      categorys: category ? [category] : [], // Convertir a array si es necesario
      location: location || "",
      occupants: occupants || "",
    }));
  }, [searchParams]);

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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedValues,
    }));
  };

  // Filtros
  const filterByDateRange = (properties) => {
    const { startDate, endDate } = filters;

    if (!startDate && !endDate) {
      return properties; // No aplicar filtro si no hay fechas
    }

    return properties.filter((property) => {
      // Lógica para HELLO_ROOM y HELLO_COLIVING
      if (
        property.category === "HELLO_ROOM" ||
        property.category === "HELLO_COLIVING"
      ) {
        return property.rooms.some((room) => {
          return room.rentalPeriods.some((period) => {
            const periodStart = new Date(period.startDate);
            const periodEnd = new Date(period.endDate);

            // Verificar que el periodo esté libre
            if (period.status !== "FREE") {
              return false;
            }

            // Lógica de filtrado
            if (startDate && endDate) {
              // Filtrar por rango completo
              return (
                periodStart <= new Date(endDate) &&
                periodEnd >= new Date(startDate)
              );
            } else if (startDate) {
              // Filtrar por `startDate`
              return periodEnd >= new Date(startDate);
            } else if (endDate) {
              // Filtrar por `endDate`
              return periodStart <= new Date(endDate);
            }
          });
        });
      }

      // Lógica para HELLO_STUDIO
      // if (property.category === "HELLO_STUDIO") {
      //   console.log(property);
      //   return property.rentalPeriods.every((leaseOrder) => {
      //     const leaseStart = new Date(leaseOrder.startDate);
      //     const leaseEnd = new Date(leaseOrder.endDate);

      //     console.log(leaseStart);
      //     console.log(new Date(startDate));

      //     // Verificar el estado de la orden
      //     if (
      //       ["IN_PROGRESS", "APPROVED", "PENDING", "OCCUPIED", "FREE"].includes(
      //         leaseOrder.status
      //       )
      //     ) {
      //       // Lógica de verificación para evitar fechas en conflicto
      //       if (startDate && endDate) {
      //         return (
      //           leaseEnd < new Date(startDate) || leaseStart > new Date(endDate)
      //         );
      //       } else if (startDate) {
      //         return leaseEnd < new Date(startDate);
      //       } else if (endDate) {
      //         return leaseStart > new Date(endDate);
      //       }
      //     }

      //     // Si el estado no es relevante, entonces no interfiere
      //     return true;
      //   });
      // }

      // Lógica para HELLO_STUDIO
      if (property.category === "HELLO_STUDIO") {
        return property.rentalPeriods.some((leaseOrder) => {
          const leaseStart = new Date(leaseOrder.startDate);
          const leaseEnd = new Date(leaseOrder.endDate);

          // Verificar si el estado de la orden es relevante
          if (
            ["IN_PROGRESS", "APPROVED", "PENDING", "OCCUPIED", "FREE"].includes(
              leaseOrder.status
            )
          ) {
            // Verificar si el startDate proporcionado es mayor o igual al rentalPeriod.startDate
          }
          if (startDate) {
            const providedStartDate = new Date(startDate);
            return providedStartDate.getTime() >= leaseStart.getTime();
          }

          // Si no hay coincidencias, no interfiere
          return false;
        });
      }

      // Otras categorías no aplican filtro por fecha
      return true;
    });
  };

  const filterByCategory = (properties) => {
    if (!filters.categorys || filters.categorys.length === 0) {
      return properties;
    }
    return properties.filter((property) => {
      return filters.categorys.includes(
        property.category.replace(/_/g, "").toLowerCase()
      ); // No necesitas transformar la categoría
    });
  };

  const filterByLocation = (properties) => {
    if (!filters.location) {
      return properties;
    }
    return properties.filter((property) => {
      // Combina city, street, streetNumber y zone en una sola cadena para buscar coincidencias
      const fullLocation =
        `${property.city} ${property.street} ${property.streetNumber} ${property.zone}`.toLowerCase();
      return fullLocation.includes(filters.location.toLowerCase());
    });
  };

  const filterByOccupants = (properties) => {
    if (!filters.occupants) {
      return properties; // Si no hay filtro de ocupantes, devolver todas las propiedades
    }
    return properties.filter((property) => {
      return property.maximumOccupants >= parseInt(filters.occupants, 10); // Filtrar por el número de ocupantes
    });
  };

  const filterBySearch = (properties) => {
    if (!filters.word || filters.word.length === 0) {
      return properties;
    }
    return properties.filter((property) =>
      property.name.toLowerCase().includes(filters.word.toLowerCase())
    );
  };

  const filterByPriceRange = (properties) => {
    const { minPrice, maxPrice } = filters;

    if (!minPrice && !maxPrice) {
      return properties; // No aplicar filtro si no hay valores de precio
    }

    return properties.filter((property) => {
      if (
        property.category === "HELLO_STUDIO" ||
        property.category === "HELLO_LANDLORD"
      ) {
        // Filtrar por el precio directo de la propiedad
        return (
          property.price >= (minPrice || 0) &&
          property.price <= (maxPrice || 1000000)
        );
      } else if (
        property.category === "HELLO_ROOM" ||
        property.category === "HELLO_COLIVING"
      ) {
        // Filtrar por el precio de las habitaciones
        return property.rooms.some((room) => {
          return (
            room.price >= (minPrice || 0) && room.price <= (maxPrice || 1000000)
          );
        });
      }

      // Si la propiedad no pertenece a ninguna de estas categorías, no filtrar por precio
      return true;
    });
  };

  const applyFilters = () => {
    let result = filterBySearch(properties);
    result = filterByCategory(result);
    result = filterByLocation(result); // Aplicar filtro de ubicación
    result = filterByDateRange(result); // Aplicar filtro de rango de fechas
    result = filterByPriceRange(result); // Aplicar filtro de rango de precio
    result = filterByOccupants(result); // Aplicar filtro de maximo de ocupantes
    setFilteredProperties(result);
  };

  if (properties.length === 0) {
    return (
      <div className="h-screen flex flex-col">
        <header className="px-2">
          <NavBar />
        </header>
        <main className="grow flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="px-2">
        <NavBar />
      </header>
      <main className="grow">
        {/* MOBILE */}
        <div className="sm:hidden">
          <SearchBarFiltered
            initialValue={filters?.word || ""}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            onChange={handleFilterChange}
            onApplyFilters={applyFilters}
          />
          <div className="flex flex-col m-3 mt-7 gap-7">
            {filteredProperties?.length === 0 ? (
              <div className="flex flex-col items-center w-full gap-6">
                <p className="text-slate-400">
                  No se encontraron propiedades segun tu búsqueda
                </p>
                <div className="w-full flex flex-col justify-center gap-2">
                  <h2>Podrian interesarte</h2>
                  <div className="flex flex-row flex-wrap justify-center gap-7 ">
                    {properties.map((property) => {
                      // Verificar si la propiedad es de categoría HELLO_ROOM o HELLO_COLIVING
                      if (
                        property.category === "HELLO_ROOM" ||
                        property.category === "HELLO_COLIVING"
                      ) {
                        return property.rooms.map((room, index) => (
                          <PropertyCard
                            key={`${property?.id}-${index}`}
                            property={property} // Pasar los datos de la propiedad
                            price={room.price} // Pasar el precio específico de cada room
                            roomId={room.id}
                          />
                        ));
                      } else {
                        // Para otras categorías, devolver una sola PropertyCard
                        return (
                          <PropertyCard
                            key={property?.id}
                            property={property}
                            price={property.price} // Pasar el precio de la propiedad directamente
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            ) : (
              filteredProperties.map((property) => {
                // Verificar si la propiedad es de categoría HELLO_ROOM o HELLO_COLIVING
                if (
                  property.category === "HELLO_ROOM" ||
                  property.category === "HELLO_COLIVING"
                ) {
                  return property.rooms.map((room, index) => (
                    <PropertyCard
                      key={`${property?.id}-${index}`}
                      property={property} // Pasar los datos de la propiedad
                      price={room.price} // Pasar el precio específico de cada room
                    />
                  ));
                } else {
                  // Para otras categorías, devolver una sola PropertyCard
                  return (
                    <PropertyCard
                      key={property?.id}
                      property={property}
                      price={property.price} // Pasar el precio de la propiedad directamente
                    />
                  );
                }
              })
            )}
          </div>
        </div>
        {/* DESKTOP */}
        <div className="hidden sm:flex">
          {/* DesktopFilter ocupa el 25% del ancho */}
          <DesktopFilter
            isOpen={showFilters}
            setOpen={setShowFilters}
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={applyFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Contenedor de PropertyCard que ocupa el 75% del ancho */}
          <div className="w-[70%] overflow-y-auto gap-7 h-[calc(100vh-93px)] fixed right-0 scrollbar-none p-4 flex flex-row flex-wrap justify-center">
            {filteredProperties?.length > 0 ? (
              filteredProperties.map((property) => {
                // Verificar si la propiedad es de categoría HELLO_ROOM o HELLO_COLIVING
                if (
                  property.category === "HELLO_ROOM" ||
                  property.category === "HELLO_COLIVING"
                ) {
                  return property.rooms.map((room, index) => (
                    <PropertyCard
                      key={`${property?.id}-${index}`}
                      property={property} // Pasar los datos de la propiedad
                      price={room.price} // Pasar el precio específico de cada room
                      roomId={room.id}
                    />
                  ));
                } else {
                  // Para otras categorías, devolver una sola PropertyCard
                  return (
                    <PropertyCard
                      key={property?.id}
                      property={property}
                      price={property.price} // Pasar el precio de la propiedad directamente
                    />
                  );
                }
              })
            ) : (
              <div className="flex flex-col items-center w-full gap-6">
                <p className="text-slate-400">
                  No se encontraron propiedades segun tu búsqueda
                </p>
                <div className="w-full flex flex-col justify-center gap-2">
                  <h2>Podrian interesarte</h2>
                  <div className="flex flex-row flex-wrap justify-center gap-7 ">
                    {properties
                      .filter((property) => {
                        if (property.category === "HELLO_STUDIO") {
                          return (
                            (property.status === "FREE" ||
                              property.status === "OCCUPIED") &&
                            property.category === category
                          );
                        }
                        return (
                          property.status === "FREE" &&
                          property.category === category
                        );
                      })
                      .map((property) => {
                        // Verificar si la propiedad es de categoría HELLO_ROOM o HELLO_COLIVING
                        if (
                          property.category === "HELLO_ROOM" ||
                          property.category === "HELLO_COLIVING"
                        ) {
                          return property.rooms.map((room, index) => (
                            <PropertyCard
                              key={`${property?.id}-${index}`}
                              property={property} // Pasar los datos de la propiedad
                              price={room.price} // Pasar el precio específico de cada room
                              roomId={room.id}
                            />
                          ));
                        } else {
                          // Para otras categorías, devolver una sola PropertyCard
                          return (
                            <PropertyCard
                              key={property?.id}
                              property={property}
                              price={property.price} // Pasar el precio de la propiedad directamente
                            />
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Filter
        isOpen={showFilters}
        setOpen={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
