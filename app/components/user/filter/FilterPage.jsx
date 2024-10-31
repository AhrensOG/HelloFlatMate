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

    // Extraer los parámetros de búsqueda al cargar la página y aplicar filtros iniciales
    useEffect(() => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            startDate: startDate || "",
            endDate: endDate || "",
            categorys: category ? [category] : [],
            location: location || "",
            occupants: occupants || "",
            rentalPeriod: rentalPeriod || "",
        }));

        applyFilters(); // Aplica los filtros al cargar la página
    }, [searchParams]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                await getAllProperties(dispatch);
                const activeProperties = (state.properties || []).filter((property) => property.isActive && property.status !== "DELETED");
                setProperties(activeProperties);
                setFilteredProperties(activeProperties);
                applyFilters(); // Aplica los filtros después de obtener las propiedades
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
            applyFilters(); // Aplica los filtros cuando ya existen propiedades en el estado
        }
    }, [state.properties, dispatch]);

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
            if (property.category === "HELLO_ROOM" || property.category === "HELLO_COLIVING") {
                return property.rooms?.some((room) => {
                    return room.rentalItems?.some((period) => {
                        const periodStart = new Date(period.rentalItem?.rentalPeriod?.startDate);
                        const periodEnd = new Date(period.rentalItem?.rentalPeriod?.endDate);

                        if (!period.period.rentalItem?.isFree) {
                            return false;
                        }

                        if (startDate && endDate) {
                            return periodStart <= new Date(endDate) && periodEnd >= new Date(startDate);
                        } else if (startDate) {
                            return periodEnd >= new Date(startDate);
                        } else if (endDate) {
                            return periodStart <= new Date(endDate);
                        }
                    });
                });
            }

            if (property.category === "HELLO_STUDIO") {
                return property.rentalPeriods?.some((leaseOrder) => {
                    const leaseStart = new Date(leaseOrder.startDate);
                    const leaseEnd = new Date(leaseOrder.endDate);

                    if (startDate) {
                        const providedStartDate = new Date(startDate);
                        return providedStartDate.getTime() >= leaseStart.getTime();
                    }

                    return false;
                });
            }

            return true;
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
                    return room.rentalItem?.some((period) => {
                        const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
                        return rentalPeriodString === queryRentalPeriod;
                    });
                });
            }

            if (property.category === "HELLO_STUDIO" || property.category === "HELLO_LANDLORD") {
                return property.rentalItem?.some((period) => {
                    const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
                    return rentalPeriodString === queryRentalPeriod;
                });
            }

            return true;
        });
    };

    // Aplicar los filtros solo al hacer clic en "Aplicar filtro"
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
                        onApplyFilters={applyFilters} // Aplicar filtros solo cuando se hace clic en "Aplicar filtro"
                    />
                    <div className="flex flex-col m-3 mt-7 gap-7">
                        {filteredProperties?.length === 0 ? (
                            <div className="flex flex-col items-center w-full gap-6">
                                <p className="text-slate-400">No se encontraron propiedades según tu búsqueda</p>
                            </div>
                        ) : (
                            filteredProperties.map((property) => {
                                return <PropertyCard key={property?.id} property={property} price={property.price} />;
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
                        onApplyFilters={applyFilters} // Aplicar filtros solo cuando se hace clic en "Aplicar filtro"
                        onFilterChange={handleFilterChange}
                    />
                    <div className="w-[75%] overflow-y-auto gap-7 h-[calc(100vh-93px)] fixed right-0 scrollbar-none p-4 flex flex-row flex-wrap justify-center">
                        {filteredProperties?.length > 0 ? (
                            filteredProperties.map((property) => <PropertyCard key={property?.id} property={property} price={property.price} />)
                        ) : (
                            <div className="flex flex-col items-center w-full gap-6">
                                <p className="text-slate-400">No se encontraron propiedades según tu búsqueda</p>
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
                onApplyFilters={applyFilters} // Aplicar filtros solo cuando se hace clic en "Aplicar filtro"
                onFilterChange={handleFilterChange}
            />
        </div>
    );
}
