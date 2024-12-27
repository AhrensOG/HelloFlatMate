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

const getRentalPeriods = (propiedades) => {
    const fechasUnicas = new Set();

    const today = new Date(); // Fecha actual

    propiedades.forEach((propiedad) => {
        // Verificar si la propiedad es de tipo HELLO_ROOM, HELLO_COLIVING o HELLO_LANDLORD
        if (propiedad.category === "HELLO_ROOM" || propiedad.category === "HELLO_COLIVING" || propiedad.category === "HELLO_LANDLORD") {
            // Acceder al array rooms y mapear sobre él
            propiedad.rooms.forEach((room) => {
                // Acceder a rentalPeriods y filtrar los periodos válidos
                room.rentalItems?.forEach((periodo) => {
                    const startDate = new Date(periodo.rentalPeriod?.startDate);
                    const endDate = new Date(periodo.rentalPeriod?.endDate);

                    // Solo procesar si el startDate es superior a la fecha actual
                    if (startDate > today) {
                        // Formatear las fechas en el formato "Del dd/mm/aa al dd/mm/aa"
                        const formattedStartDate = `${startDate.getDate().toString().padStart(2, "0")}/${(startDate.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${startDate.getFullYear().toString().slice(-2)}`;

                        const formattedEndDate = `${endDate.getDate().toString().padStart(2, "0")}/${(endDate.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${endDate.getFullYear().toString().slice(-2)}`;

                        const fecha = `Del ${formattedStartDate} al ${formattedEndDate}`;

                        // Añadir la fecha al Set para evitar duplicados
                        fechasUnicas.add(fecha);
                    }
                });
            });
        }
    });

    // Convertir el Set a un array para devolverlo
    return Array.from(fechasUnicas);
};

export default function FilterPage() {
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");
    const location = searchParams.get("zone");
    const occupants = searchParams.get("numberOccupants");
    const rentalPeriod = searchParams.get("rentalPeriod");
    const type = searchParams.get("type");

    const { state, dispatch } = useContext(Context);
    const [properties, setProperties] = useState(state?.properties || []);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        word: "",
        startDate: startDate || "",
        endDate: endDate || "",
        categorys: category ? [category] : ["todos los alojamientos"],
        location: location || "",
        occupants: occupants || "",
        rentalPeriod: rentalPeriod || "",
        type: type || "",
    });
    const [filteredProperties, setFilteredProperties] = useState(properties);
    const [filteredRentalPeriods, setFilteredRentalPeriods] = useState([]);
    const [zones, setZones] = useState([]);

    const hasURLFilters = () => {
        return startDate || endDate || category || location || occupants || rentalPeriod;
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                await getAllProperties(dispatch);
                const activeProperties = (state.properties || []).filter((property) => property.isActive && property.status !== "DELETED");
                setProperties(activeProperties);
                const sorted = sortPropertiesByRooms(activeProperties);
                setFilteredProperties(sorted);

                // Extraer zonas únicas
                const uniqueZones = [...new Set(activeProperties.map((property) => property.zone))];
                setZones(uniqueZones);

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
            const sorted = sortPropertiesByRooms(activeProperties);
            setFilteredProperties(sorted);

            // Extraer zonas únicas
            const uniqueZones = [...new Set(activeProperties.map((property) => property.zone))];
            setZones(uniqueZones);

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
            if (
                property.category === "HELLO_ROOM" ||
                property.category === "HELLO_COLIVING" ||
                property.category === "HELLO_LANDLORD" ||
                property.category === "HELLO_STUDIO"
            ) {
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

            return false;
        });
    };

    const filterByCategory = (properties) => {
        if (!filters.categorys || filters.categorys.length === 0) {
            return properties;
        }

        const hasAllProperties = filters.categorys.includes("todos los alojamientos");
        const hasLastRooms = filters.categorys.includes("lastrooms");

        // Caso especial: si solo está "lastrooms" en los filtros
        if (hasLastRooms && filters.categorys.length === 1) {
            return properties
                .map((property) => {
                    // Filtrar las habitaciones activas
                    const activeRooms = property.rooms.filter((room) => room.isActive === true);

                    // Si no hay habitaciones activas, excluir la propiedad
                    if (activeRooms.length === 0) return null;

                    // Retornar la propiedad con solo las habitaciones activas
                    return {
                        ...property,
                        rooms: activeRooms,
                    };
                })
                .filter((property) => property !== null); // Eliminar propiedades sin habitaciones activas
        }

        // Filtrar propiedades según las categorías seleccionadas (excluyendo "todos los alojamientos" y "lastrooms")
        const filteredByCategory = properties.filter((property) => {
            if (hasAllProperties) {
                // Si "todos los alojamientos" está presente, incluir todas las categorías seleccionadas
                return true;
            }

            // Validar otras categorías
            return filters.categorys.includes(property.category) || filters.categorys.includes(property.category.replace(/_/g, "").toLowerCase());
        });

        if (hasLastRooms) {
            // Filtrar las propiedades que cumplen con la lógica de "lastrooms"
            return filteredByCategory
                .map((property) => {
                    // Filtrar las habitaciones activas
                    const activeRooms = property.rooms.filter((room) => room.isActive === true);

                    // Si no hay habitaciones activas, excluir la propiedad
                    if (activeRooms.length === 0) return null;

                    // Retornar la propiedad con solo las habitaciones activas
                    return {
                        ...property,
                        rooms: activeRooms,
                    };
                })
                .filter((property) => property !== null); // Eliminar propiedades sin habitaciones activas
        }

        // Retornar las propiedades filtradas por categoría
        return filteredByCategory;
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
            if (
                property.category === "HELLO_ROOM" ||
                property.category === "HELLO_COLIVING" ||
                property.category === "HELLO_LANDLORD" ||
                property.category === "HELLO_STUDIO"
            ) {
                return property.rooms.some((room) => {
                    return room.price >= (minPrice || 0) && room.price <= (maxPrice || 1000000);
                });
            }

            return true;
        });
    };

    const convertRentalPeriodToString = (startDate, endDate) => {
        const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
            const year = String(d.getFullYear()).slice(-2); // Tomamos los últimos 2 dígitos del año
            return `${day}/${month}/${year}`;
        };

        const start = formatDate(startDate);
        const end = formatDate(endDate);

        return `Del ${start} al ${end}`;
    };

    const filterByRentalPeriod = (properties) => {
        if (!filters.rentalPeriod) return properties;

        return properties.filter((property) => {
            const queryRentalPeriod = filters.rentalPeriod;

            if (
                property.category === "HELLO_ROOM" ||
                property.category === "HELLO_COLIVING" ||
                property.category === "HELLO_LANDLORD" ||
                property.category === "HELLO_STUDIO"
            ) {
                return property.rooms?.some((room) => {
                    return room.rentalItems?.some((period) => {
                        const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
                        return rentalPeriodString === queryRentalPeriod;
                    });
                });
            }

            return true;
        });
    };

    const filterByTypology = (properties) => {
        if (!filters.type) {
            return properties;
        }
        return properties.filter((property) => property.typology === filters.type);
    };

    const filterByCategoriesAndGetRentalPeriods = (properties) => {
        const filteredProperties = filters.categorys
            ? properties.filter(
                  (property) =>
                      filters.categorys.includes(property.category) || filters.categorys.includes(property.category.replace(/_/g, "").toLowerCase())
              )
            : properties;

        const periodsList = getRentalPeriods(filteredProperties);
        setFilteredRentalPeriods(periodsList);
    };

    const sortPropertiesByRooms = (properties) => {
        if (!Array.isArray(properties)) {
            throw new Error("El parámetro debe ser un array de propiedades.");
        }

        // Ordenar las propiedades y sus habitaciones
        return [...properties]
            .map((property) => {
                // Ordenar las habitaciones de cada propiedad
                const sortedRooms = [...property.rooms].sort((a, b) => {
                    // Priorizar habitaciones sin leaseOrdersRoom
                    if (a.leaseOrdersRoom.length === 0 && b.leaseOrdersRoom.length > 0) {
                        return -1;
                    }
                    if (a.leaseOrdersRoom.length > 0 && b.leaseOrdersRoom.length === 0) {
                        return 1;
                    }

                    // Priorizar habitaciones con isActive en true
                    if (a.isActive && !b.isActive) {
                        return -1;
                    }
                    if (!a.isActive && b.isActive) {
                        return 1;
                    }

                    // Si ambos criterios son iguales, mantener el orden actual
                    return 0;
                });

                return {
                    ...property,
                    rooms: sortedRooms,
                };
            })
            .sort((a, b) => {
                // Ordenar propiedades en función del estado de las habitaciones
                const aHasAvailableRoom = a.rooms.some((room) => room.leaseOrdersRoom.length === 0);
                const bHasAvailableRoom = b.rooms.some((room) => room.leaseOrdersRoom.length === 0);

                // Priorizar propiedades con habitaciones disponibles
                if (aHasAvailableRoom && !bHasAvailableRoom) {
                    return -1;
                }
                if (!aHasAvailableRoom && bHasAvailableRoom) {
                    return 1;
                }

                // Priorizar propiedades con habitaciones activas (isActive: true)
                const aHasActiveRoom = a.rooms.some((room) => room.isActive);
                const bHasActiveRoom = b.rooms.some((room) => room.isActive);

                if (aHasActiveRoom && !bHasActiveRoom) {
                    return -1;
                }
                if (!aHasActiveRoom && bHasActiveRoom) {
                    return 1;
                }

                // Si ambos tienen el mismo estado, mantener el orden actual
                return 0;
            });
    };

    const applyFilters = () => {
        let result = filterBySearch(properties);
        result = filterByCategory(result);
        result = filterByLocation(result);
        result = filterByDateRange(result);
        result = filterByPriceRange(result);
        // result = filterByOccupants(result);
        result = filterByRentalPeriod(result);
        result = filterByTypology(result);
        result = sortPropertiesByRooms(result);

        filterByCategoriesAndGetRentalPeriods(result);
        setFilteredProperties(result);
    };

    return (
        <div className="flex flex-col relative">
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
                                      })
                                    : ""}
                            </div>
                        ) : (
                            filteredProperties.map((property) => {
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
                        category={category}
                        rentalPeriods={filteredRentalPeriods}
                        zones={zones}
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
                                        })}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            filteredProperties.map((property) => {
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
                category={category}
                rentalPeriods={filteredRentalPeriods}
                zones={zones}
            />
        </div>
    );
}
