"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { getAllProperties } from "../context/actions";
import Footer_1 from "../components/public/home/Footer";
import NavbarV3 from "../components/nav_bar/NavbarV3";
import PropertyCard from "../components/user/property/PropertyCard";
import FourthSection from "../components/public/home/FourthSection";
import SeventhSection from "../components/public/home/SeventhSection";
import TextSection from "../components/public/main-pages/TextSection";
import CategorySelector from "../components/public/main-pages/CategorySelector";
import PropertyCardSekeleton from "../components/public/main-pages/PropertyCardSekeleton";

export default function HelloRoom() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [helloRoomProperties, setHelloRoomProperties] = useState([]);
  const [helloColivingProperties, setHelloColivingProperties] = useState([]);
  const [helloStudioProperties, setHelloStudioProperties] = useState([]);
  const [helloLandlordProperties, setHelloLandlordProperties] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 18;

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    category: "HELLO_LANDLORD",
    zone: null,
    rentalPeriod: null,
    startDate: null,
    endDate: null,
    type: null,
    numberOccupants: null,
  });

  const filterByCategory = (properties) => {
    return properties.filter(
      (property) => property.category === "HELLO_LANDLORD"
    );
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

      if (
        property.category === "HELLO_ROOM" ||
        property.category === "HELLO_COLIVING" ||
        property.category === "HELLO_LANDLORD"
      ) {
        return property.rooms?.some((room) => {
          return room.rentalItems?.some((period) => {
            const rentalPeriodString = convertRentalPeriodToString(
              period.rentalPeriod?.startDate,
              period.rentalPeriod?.endDate
            );
            return rentalPeriodString === queryRentalPeriod;
          });
        });
      }

      if (property.category === "HELLO_STUDIO") {
        return property.rentalItems?.some((period) => {
          const rentalPeriodString = convertRentalPeriodToString(
            period.rentalPeriod?.startDate,
            period.rentalPeriod?.endDate
          );
          return rentalPeriodString === queryRentalPeriod;
        });
      }

      return true;
    });
  };

  // Aplicar filtros a las propiedades y extraer habitaciones
  useEffect(() => {
    if (state.properties && state.properties.length > 0) {
      // Aplicar filtros generales a las propiedades
      const filteredProperties = state.properties.filter((property) => {
        const matchesZone = !filters.zone || property.zone === filters.zone;
        const matchesCategory =
          !filters.category || property.category === filters.category;

        return matchesZone && matchesCategory;
      });

      // Aplicar filtro de período de renta
      const propertiesWithRentalPeriod =
        filterByRentalPeriod(filteredProperties);

      // Extraer habitaciones filtradas e incluir la propiedad completa en cada habitación
      const filteredRoomsList = propertiesWithRentalPeriod
        .flatMap(
          (property) =>
            property.rooms?.map((room) => {
              // Incluir siempre la propiedad completa dentro de cada room
              const matchesTypology =
                !filters.type || property.typology === filters.type;

              if (matchesTypology) {
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
  return (
    <div>
      <div className="flex flex-col sm:min-h-screen">
        <header className="mb-16">
          <NavbarV3 fixed={true} />
        </header>
        <div className="w-full flex flex-col">
          <div className="flex flex-col gap-8 bg-white items-center justify-around py-10 px-2">
            <h1 className="text-3xl font-bold">hello landlord</h1>
            <h2 className="text-lg">
              Habitaciones en pisos compartidos con la calidad{" "}
              <strong>hello flat mate</strong>
            </h2>
            <h3 id="subtitle" className="text-lg text-center max-w-screen-md">
              <strong>hello landlord</strong> es la solución perfecta para
              estudiantes que buscan habitaciones en pisos compartidos
              gestionadas directamente por propietarios de confianza. Cada
              propietario ha sido cuidadosamente seleccionado por{" "}
              <strong>hello flat mate</strong>, siguiendo nuestro modelo de
              contrato y estándares de gestión. Esto garantiza un entorno
              seguro, cómodo y adaptado a tus necesidades.
              <br />
              <br />
              Además, siempre contarás con el respaldo de nuestro equipo para
              asegurarnos de que tengas una experiencia tranquila y sin
              sobresaltos.
            </h3>
          </div>
        </div>
        {/* Contenedor de búsqueda y botones */}
        <CategorySelector
          category={"HELLO_LANDLORD"}
          filters={filters}
          setFilters={setFilters}
          helloRoomProperties={helloRoomProperties}
          helloColivingProperties={helloColivingProperties}
          helloStudioProperties={helloStudioProperties}
          helloLandlordProperties={helloLandlordProperties}
          allProperties={properties}
        />

        {/* Lista de habitaciones */}
        <div
          id="carousel-container"
          className="w-full flex justify-center items-start"
        >
          <div className="w-full max-w-screen-lg h-full gap-7 scrollbar-none p-4 flex flex-wrap justify-center items-start">
            {displayedRooms.length > 0
              ? displayedRooms.map((room) => (
                  <PropertyCard
                    key={room.id + "room"}
                    property={room.property}
                    roomId={room.id}
                    price={room.price}
                    name={room.name}
                    images={room.images[0]}
                    room={room}
                  />
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <PropertyCardSekeleton key={index} />
                ))}
          </div>
        </div>
        {/* Botones de paginación */}
        <div className="w-full flex justify-center items-center gap-4 my-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded-lg ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
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
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
        <FourthSection />
        <SeventhSection />
        <TextSection />
      </div>

      <Footer_1 />
    </div>
  );
}
