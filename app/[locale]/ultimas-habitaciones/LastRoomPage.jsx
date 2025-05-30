"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "@/app/context/GlobalContext";
import { getAllProperties } from "@/app/context/actions";
import Footer_1 from "@/app/components/public/home/Footer";
import PropertyCard from "@/app/components/user/property/PropertyCard";
import FourthSection from "@/app/components/public/home/FourthSection";
import SeventhSection from "@/app/components/public/home/SeventhSection";
import TextSection from "@/app/components/public/main-pages/TextSection";
import CategorySelector from "@/app/components/public/main-pages/CategorySelector";
import PropertyCardSekeleton from "@/app/components/public/main-pages/PropertyCardSekeleton";
import { useSearchParams } from "next/navigation";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import RequestSection from "@/app/components/public/main-pages/RequestSection";
import LastRoomsTextSection from "@/app/components/public/main-pages/LastRoomsTextSection";
import { useTranslations } from "next-intl";
import HTMLReactParser from "html-react-parser";

export default function LastRoomsPage() { 
    const t = useTranslations("last_room_page");
    const formatedStrong = (text) => {
        return text.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };

    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");
    const location = searchParams.get("zone");
    const occupants = searchParams.get("numberOccupants");
    const rentalPeriod = searchParams.get("rentalPeriod");
    const type = searchParams.get("type");
    const requestForm = searchParams.get("requestForm");
    const scrollToForm = searchParams.get("scrollToForm");

    const { state, dispatch } = useContext(Context);
    const [properties, setProperties] = useState([]);
    const [helloRoomProperties, setHelloRoomProperties] = useState([]);
    const [helloColivingProperties, setHelloColivingProperties] = useState([]);
    const [helloStudioProperties, setHelloStudioProperties] = useState([]);
    const [helloLandlordProperties, setHelloLandlordProperties] = useState([]);
    const [lastRooms, setLastRooms] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 18;

    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filters, setFilters] = useState({
        category: "HELLO_ROOM",
        zone: location === "Sin opciones disponibles" ? null : location || null,
        rentalPeriod: rentalPeriod || null,
        startDate: startDate || null,
        endDate: endDate || null,
        type: type || null,
        numberOccupants: occupants || null,
    });
    const [showSkeleton, setShowSkeleton] = useState(true);

    const filterByCategory = (properties) => {
        return properties.filter((property) => property);
    };

    const paginateRooms = (rooms) => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        return rooms.slice(startIndex, startIndex + roomsPerPage);
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
        if (state.properties && state.properties.length > 0) {
            // Filtrar propiedades según la categoría
            const roomProps = state.properties.filter((property) => property.category === "HELLO_ROOM");
            const colivingProps = state.properties.filter((property) => property.category === "HELLO_COLIVING");
            const studioProps = state.properties.filter((property) => property.category === "HELLO_STUDIO");
            const landlordProps = state.properties.filter((property) => property.category === "HELLO_LANDLORD");
            const last = state.properties.filter((property) => property.status === "FREE");

            // Actualizar los estados locales
            setProperties(state.properties);
            setLastRooms(last);
            setHelloRoomProperties(roomProps);
            setHelloColivingProperties(colivingProps);
            setHelloStudioProperties(studioProps);
            setHelloLandlordProperties(landlordProps);
        }
    }, [state.properties]);

    useEffect(() => {
        if (state.properties && state.properties !== properties) {
            setProperties(filterByCategory(state.properties));
        }
    }, [state.properties]);

    const convertRentalPeriodToString = (startDate, endDate) => {
        const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
            const year = String(d.getFullYear()).slice(-2); // Últimos 2 dígitos del año
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

            if (property.category) {
                return property.rooms?.some((room) => {
                    return room.rentalItems?.some((period) => {
                        const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
                        return rentalPeriodString === queryRentalPeriod;
                    });
                });
            }

            // if (property.category === "HELLO_STUDIO") {
            //     return property.rentalItems?.some((period) => {
            //         const rentalPeriodString = convertRentalPeriodToString(period.rentalPeriod?.startDate, period.rentalPeriod?.endDate);
            //         return rentalPeriodString === queryRentalPeriod;
            //     });
            // }

            return true;
        });
    };

    // Aplicar filtros a las propiedades y extraer habitaciones
    useEffect(() => {
        if (state.properties && state.properties.length > 0) {
            // Aplicar filtros generales a las propiedades
            const filteredProperties = state.properties.filter((property) => {
                const matchesZone = !filters.zone || property.zone === filters.zone;

                return matchesZone;
            });

            // Aplicar filtro de período de renta
            const propertiesWithRentalPeriod = filterByRentalPeriod(filteredProperties);

            // Extraer habitaciones filtradas e incluir la propiedad completa en cada habitación
            const filteredRoomsList = propertiesWithRentalPeriod
                .flatMap(
                    (property) =>
                        property.rooms?.map((room) => {
                            // Incluir siempre la propiedad completa dentro de cada room
                            const matchesTypology = !filters.type || property.typology === filters.type;
                            const matchesStatus = room.isActive === true;

                            if (matchesTypology && matchesStatus) {
                                // Retornar habitación con la propiedad completa
                                return {
                                    ...room, // Room original
                                    property, // La propiedad completa asociada
                                };
                            }
                            return null; // Si no coincide, no incluir esta habitación
                        }) || []
                )
                .filter((room) => room !== null); // Filtrar cualquier valor nulo

            setFilteredRooms(filteredRoomsList); // Actualizar habitaciones filtradas
            setCurrentPage(1); // Reiniciar a la primera página al cambiar filtros
        }
    }, [filters, state.properties]);

    // Calcular las habitaciones paginadas y total de páginas
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
    const displayedRooms = paginateRooms(filteredRooms);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
            scrollToCarousel();
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            scrollToCarousel();
        }
    };

    const scrollToCarousel = () => {
        const carousel = document.getElementById("subtitle");
        if (carousel) {
            carousel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        if (displayedRooms.length === 0) {
            // Establece un temporizador de 1 segundo para ocultar el skeleton
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 1000);

            // Limpia el temporizador al desmontar el componente
            return () => clearTimeout(timer);
        } else {
            // Reinicia el estado si hay habitaciones
            setShowSkeleton(true);
        }
    }, [displayedRooms]);

    useEffect(() => {
        const tryScrollToContactUs = () => {
            const contactUsElement = document.getElementById("contactUs");
            if (contactUsElement) {
                const offset = 200; // Ajusta según sea necesario
                const topPosition = contactUsElement.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: topPosition,
                    behavior: "smooth",
                });
            }
        };

        if (scrollToForm && displayedRooms && displayedRooms.length === 0 && state?.user) {
            // Intentar el desplazamiento una vez que los displayedRooms estén listos
            const timeout = setTimeout(tryScrollToContactUs, 100); // Pequeño retraso para asegurar el montaje
            return () => clearTimeout(timeout); // Limpiar timeout si el componente se desmonta
        }
    }, [scrollToForm, displayedRooms, state?.user]);

    return (
        <div>
            <div className="flex flex-col sm:min-h-screen">
                <header className="mb-16">
                    <NavbarV3 fixed={true} />
                </header>
                <div className="w-full flex flex-col">
                    <div className="flex flex-col gap-8 bg-white items-center justify-around py-10 px-2">
                        <h1 className="text-3xl font-bold">{t("h1")}</h1>
                        <p id="subtitle" className="text-lg text-center max-w-screen-md">
                            {/* last rooms son habitaciones equipadas y listas para mudarse desde el primer día, con Internet de alta velocidad y todos
                            los servicios activos. Nos ocupamos de la gestión y el mantenimiento para que sólo te enfoques en estudiar, disfrutar y
                            explorar Valencia. Comparte piso con otros estudiantes de edad similar y vive una experiencia única en un entorno diseñado
                            para tu estilo de vida.
                            <br />
                            <br />
                            Contigo desde la reserva hasta tu último día en Valencia. */}
                            {HTMLReactParser(formatedStrong(t("p_1")))}
                        </p>
                    </div>
                </div>
                {/* Contenedor de búsqueda y botones */}
                <CategorySelector
                    category={"lastroom"}
                    filters={filters}
                    setFilters={setFilters}
                    helloRoomProperties={helloRoomProperties}
                    helloColivingProperties={helloColivingProperties}
                    helloStudioProperties={helloStudioProperties}
                    helloLandlordProperties={helloLandlordProperties}
                    allProperties={lastRooms}
                />

                {/* Lista de habitaciones */}
                <div id="carousel-container" className="w-full flex justify-center items-start">
                    <div className="w-full max-w-screen-lg h-full gap-7 scrollbar-none p-4 flex flex-wrap justify-center items-start">
                        {!state.properties || state.properties?.length === 0 ? (
                            // Mostrar skeletons cuando no hay propiedades
                            Array.from({ length: 6 }).map((_, index) => <PropertyCardSekeleton key={index} />)
                        ) : displayedRooms.length === 0 ? (
                            showSkeleton ? (
                                // Mostrar skeletons por 1 segundo
                                Array.from({ length: 6 }).map((_, index) => <PropertyCardSekeleton key={index} />)
                            ) : (
                                <>
                                    <div className="text-center py-6">
                                        <span className="text-lg font-semibold text-gray-600">{t("span_1")}</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                                        {state.properties
                                            ?.flatMap((property) =>
                                                property.rooms
                                                    ?.filter((room) => room.isActive === true)
                                                    .map((room) => ({
                                                        ...room,
                                                        property, // Adjuntar la propiedad completa para pasarla al componente
                                                    }))
                                            )
                                            .map((room) => (
                                                <PropertyCard
                                                    key={`${room.id}-room`}
                                                    property={room.property}
                                                    roomId={room.id}
                                                    price={room.price}
                                                    name={room.name}
                                                    images={room.images?.[0]} // Verificar si hay imágenes disponibles
                                                    room={room}
                                                />
                                            ))}
                                    </div>
                                    <RequestSection filters={filters} requestForm={requestForm} />
                                </>
                            )
                        ) : (
                            // Mostrar habitaciones cuando hay resultados
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                                {displayedRooms.map((room) => (
                                    <div key={`${room.id}-room`} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full">
                                        <PropertyCard
                                            property={room.property}
                                            roomId={room.id}
                                            price={room.price}
                                            name={room.name}
                                            images={room.images[0]}
                                            room={room}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Botones de paginación */}
                <div className="w-full flex justify-center items-center gap-4 my-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                    >
                        Prev
                    </button>
                    <span className="text-gray-700 font-semibold">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-gray-200 rounded-lg ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                        }`}
                    >
                        Next
                    </button>
                </div>
                <FourthSection />
                <SeventhSection />
                <LastRoomsTextSection />
            </div>

            <Footer_1 />
        </div>
    );
}
