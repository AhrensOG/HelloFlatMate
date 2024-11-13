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
import BotIcon from "../../public/chat-bot/BotIcon";

export default function FilterPage() {
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");
    const location = searchParams.get("zone");
    const occupants = searchParams.get("numberOccupants");
    const rentalPeriod = searchParams.get("rentalPeriod");

    const { state, dispatch } = useContext(Context);
    const [properties, setProperties] = useState(state?.properties || []);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        word: "",
        startDate: startDate || "",
        endDate: endDate || "",
        categorys: category ? [category] : [],
        location: location || "",
        occupants: occupants || "",
        rentalPeriod: rentalPeriod || "",
    });
    const [filteredProperties, setFilteredProperties] = useState(properties);

    const hasURLFilters = () => {
        return startDate || endDate || category || location || occupants || rentalPeriod;
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                await getAllProperties(dispatch);
                const activeProperties = (state.properties || []).filter((property) => property.isActive && property.status !== "DELETED");
                setProperties(activeProperties);
                setFilteredProperties(activeProperties);

                // Aplica los filtros solo si hay parámetros en la URL
                if (hasURLFilters() && activeProperties.length > 0) {
                    applyFilters();
                }
            } catch (error) {
                toast.error("Error al obtener propiedades");
            }
        };

        if (state.properties === undefined) {
            fetchProperties();
        } else {
            const activeProperties = state.properties.filter((property) => property.isActive && property.status !== "DELETED");
            setProperties(activeProperties);
            setFilteredProperties(activeProperties);

            // Aplica los filtros solo si hay parámetros en la URL
            if (hasURLFilters() && activeProperties.length > 0) {
                applyFilters();
            }
        }
    }, [state.properties, dispatch]);

    useEffect(() => {
        if (hasURLFilters() && properties.length > 0) {
            applyFilters();
        }
    }, [properties]);

    const handleFilterChange = (filterName, selectedValues) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: selectedValues,
        }));
    };

    const filterByDateRange = (properties) => {
        const { startDate, endDate } = filters;

        if (!startDate && !endDate) {
            return properties;
        }

        return properties.filter((property) => {
            if (property.category === "HELLO_ROOM" || property.category === "HELLO_COLIVING" || property.category === "HELLO_LANDLORD") {
                if (!property.rooms) return false;

                const roomsInRange = property.rooms.filter((room) =>
                    room.rentalItems?.some((period) => {
                        const periodStart = new Date(period.rentalPeriod.startDate);
                        const periodEnd = new Date(period.rentalPeriod.endDate);

                        if (!period.isFree) return false;

                        if (startDate && endDate) {
                            return periodStart <= new Date(endDate) && periodEnd >= new Date(startDate);
                        } else if (startDate) {
                            return periodEnd >= new Date(startDate);
                        } else if (endDate) {
                            return periodStart <= new Date(endDate);
                        }
                    })
                );

                return roomsInRange.length > 0;
            }

            if (property.category === "HELLO_STUDIO") {
                if (!property.rentalItems) return false;

                const itemsInRange = property.rentalItems.some((period) => {
                    const periodStart = new Date(period.rentalPeriod.startDate);
                    const periodEnd = new Date(period.rentalPeriod.endDate);

                    if (!period.isFree) return false;

                    if (startDate && endDate) {
                        return periodStart <= new Date(endDate) && periodEnd >= new Date(startDate);
                    } else if (startDate) {
                        return periodEnd >= new Date(startDate);
                    } else if (endDate) {
                        return periodStart <= new Date(endDate);
                    }
                });

                return itemsInRange;
            }

            return false;
        });
    };

    const filterByCategory = (properties) => {
        if (!filters.categorys || filters.categorys.length === 0) {
            return properties;
        }
        return properties.filter((property) => {
            return filters.categorys.includes(property.category) || filters.categorys.includes(property.category.replace(/_/g, "").toLowerCase());
        });
    };

    const filterByLocation = (properties) => {
        if (!filters.location) {
            return properties;
        }
        return properties.filter((property) => {
            const fullLocation = `${property.city} ${property.street} ${property.streetNumber} ${property.zone}`.toLowerCase();
            return fullLocation.includes(filters.location.toLowerCase());
        });
    };

    const filterByOccupants = (properties) => {
        if (!filters.occupants) {
            return properties;
        }
        return properties.filter((property) => {
            return property.maximumOccupants >= parseInt(filters.occupants, 10);
        });
    };

    const filterBySearch = (properties) => {
        if (!filters.word || filters.word.length === 0) {
            return properties;
        }
        return properties.filter((property) => property.name.toLowerCase().includes(filters.word.toLowerCase()));
    };

    const filterByPriceRange = (properties) => {
        const { minPrice, maxPrice } = filters;

        if (!minPrice && !maxPrice) {
            return properties;
        }

        return properties.filter((property) => {
            if (property.category === "HELLO_STUDIO" || property.category === "HELLO_LANDLORD") {
                return property.price >= (minPrice || 0) && property.price <= (maxPrice || 1000000);
            } else if (property.category === "HELLO_ROOM" || property.category === "HELLO_COLIVING") {
                return property.rooms.some((room) => {
                    return room.price >= (minPrice || 0) && room.price <= (maxPrice || 1000000);
                });
            }

            return true;
        });
    };

    const convertRentalPeriodToString = (startDate, endDate) => {
        const start = new Date(startDate).toLocaleDateString("es-ES");
        const end = new Date(endDate).toLocaleDateString("es-ES");
        return `Del ${start} al ${end}`;
    };

    const filterByRentalPeriod = (properties) => {
        if (!filters.rentalPeriod) return properties;

        return properties.filter((property) => {
            const queryRentalPeriod = filters.rentalPeriod;

            if (property.category === "HELLO_ROOM" || property.category === "HELLO_COLIVING") {
                return property.rooms?.some((room) => {
                    return room.rentalItems?.some((period) => {
                        const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
                        return rentalPeriodString === queryRentalPeriod;
                    });
                });
            }

            if (property.category === "HELLO_STUDIO") {
                return property.rentalItems?.some((period) => {
                    const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
                    return rentalPeriodString === queryRentalPeriod;
                });
            }

            return true;
        });
    };

    const applyFilters = () => {
        let result = filterBySearch(properties);
        result = filterByCategory(result);
        result = filterByLocation(result);
        result = filterByDateRange(result);
        result = filterByPriceRange(result);
        result = filterByOccupants(result);
        result = filterByRentalPeriod(result);
        setFilteredProperties(result);
    };

    return (
        <div className="h-screen flex flex-col relaive">
            <BotIcon />
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
                                    No se encontraron propiedades según tu búsqueda <br />
                                    <span>Podrian interesarte</span>
                                </p>
                                {properties?.length > 0
                                    ? properties.map((property) => {
                                          // Si la categoría es "HELLO_STUDIO", mostramos la propiedad completa
                                          if (property.category === "HELLO_STUDIO") {
                                              return (
                                                  <PropertyCard
                                                      key={property?.id + "property"}
                                                      property={property}
                                                      price={property.price}
                                                      name={property.name}
                                                      images={property.images[0]}
                                                  />
                                              );
                                          } else {
                                              // Si no, iteramos sobre las habitaciones y mostramos cada una
                                              return property.rooms?.map((room) => (
                                                  <PropertyCard
                                                      key={room?.id + "room"}
                                                      property={property}
                                                      roomId={room.id}
                                                      price={room.price}
                                                      name={room.name}
                                                      images={room.images[0]}
                                                      room={room}
                                                  />
                                              ));
                                          }
                                      })
                                    : ""}
                            </div>
                        ) : (
                            filteredProperties.map((property) => {
                                // Si la categoría es "HELLO_STUDIO", mostramos la propiedad completa
                                if (property.category === "HELLO_STUDIO") {
                                    return (
                                        <PropertyCard
                                            key={property?.id + "property"}
                                            property={property}
                                            price={property.price}
                                            name={property.name}
                                            images={property.images[0]}
                                        />
                                    );
                                } else {
                                    // Si no, iteramos sobre las habitaciones y mostramos cada una
                                    return property.rooms?.map((room) => (
                                        <PropertyCard
                                            key={room?.id + "room"}
                                            property={property}
                                            roomId={room.id}
                                            price={room.price}
                                            name={room.name}
                                            images={room.images[0]}
                                            room={room}
                                        />
                                    ));
                                }
                            })
                        )}
                    </div>
                </div>
                {/* DESKTOP */}
                <div className="hidden sm:flex">
                    <DesktopFilter
                        isOpen={showFilters}
                        setOpen={setShowFilters}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={applyFilters}
                        onFilterChange={handleFilterChange}
                    />
                    <div className="w-[75%] overflow-y-auto gap-7 h-[calc(100vh-93px)] fixed right-0 scrollbar-none p-4 flex flex-wrap justify-center items-start">
                        {filteredProperties?.length === 0 ? (
                            <div className="flex flex-col items-center w-full gap-6">
                                <p className="text-slate-400 text-center">
                                    No se encontraron propiedades según tu búsqueda <br />
                                    <span>Podrían interesarte las siguientes propiedades:</span>
                                </p>
                                {properties?.length > 0 ? (
                                    <div className="w-full flex flex-row flex-wrap justify-center items-start gap-7 h-[calc(100vh-181px)]">
                                        {properties.map((property) => {
                                            // Si la categoría es "HELLO_STUDIO", mostramos la propiedad completa
                                            if (property.category === "HELLO_STUDIO") {
                                                return (
                                                    <PropertyCard
                                                        key={property?.id + "property"}
                                                        property={property}
                                                        price={property.price}
                                                        name={property.name}
                                                        images={property.images[0]}
                                                    />
                                                );
                                            } else {
                                                // Si no, iteramos sobre las habitaciones y mostramos cada una
                                                return property.rooms?.map((room) => (
                                                    <PropertyCard
                                                        key={room?.id + "room"}
                                                        property={property}
                                                        roomId={room.id}
                                                        price={room.price}
                                                        name={room.name}
                                                        images={room.images[0]}
                                                        room={room}
                                                    />
                                                ));
                                            }
                                        })}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            filteredProperties.map((property) => {
                                // Si la categoría es "HELLO_STUDIO", mostramos la propiedad completa
                                if (property.category === "HELLO_STUDIO") {
                                    return (
                                        <PropertyCard
                                            key={property?.id + "property"}
                                            property={property}
                                            price={property.price}
                                            name={property.name}
                                            images={property.images[0]}
                                        />
                                    );
                                } else {
                                    // Si no, iteramos sobre las habitaciones y mostramos cada una
                                    return property.rooms?.map((room) => (
                                        <PropertyCard
                                            key={room?.id + "room"}
                                            property={property}
                                            roomId={room.id}
                                            price={room.price}
                                            name={room.name}
                                            images={room.images[0]}
                                            room={room}
                                        />
                                    ));
                                }
                            })
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
