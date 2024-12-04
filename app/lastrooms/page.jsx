"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { getAllProperties } from "../context/actions";
import Footer_1 from "../components/public/home/Footer";
import NavBar_1 from "../components/public/home/NavBar_1";
import TitleSection from "../components/public/main-pages/TitleSection";
import PropertyCard from "../components/user/property/PropertyCard";
import FourthSection from "../components/public/home/FourthSection";
import SeventhSection from "../components/public/home/SeventhSection";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TextSection from "../components/public/main-pages/TextSection";

export default function HelloRoom() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const roomsPerPage = 18;

  const filterByCategory = (properties) => {
    return properties.filter((property) => property.category === "HELLO_ROOM");
  };

  const paginateRooms = (allRooms) => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    return allRooms.slice(startIndex, startIndex + roomsPerPage);
  };

  const filterBySearchQuery = (allRooms) => {
    if (!searchQuery) return allRooms;
    const query = searchQuery.toLowerCase();
    return allRooms.filter((room) => {
      const { property, name } = room;
      const city = property?.city?.toLowerCase() || "";
      const street = property?.street?.toLowerCase() || "";
      const streetNumber = property?.streetNumber || "";
      const fullAddress = `${street} ${streetNumber}, ${city}`;
      return (
        name.toLowerCase().includes(query) ||
        fullAddress.toLowerCase().includes(query)
      );
    });
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
      setProperties(filterByCategory(state.properties));
    }
  }, [state.properties]);

  const allRooms = properties?.flatMap((property) =>
    property.rooms?.map((room) => ({ ...room, property })) || []
  ) || [];

  const displayedRooms = paginateRooms(filterBySearchQuery(allRooms));
  const totalPages = Math.ceil(allRooms.length / roomsPerPage);

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
          <NavBar_1 fixed={true} />
        </header>
        <div className="w-full flex flex-col">
          <div className="relative flex flex-col gap-8 bg-white items-center justify-around py-10 px-2">
            <h1 className="text-3xl font-bold">last rooms</h1>
            <h3 id="subtitle" className="text-lg text-center max-w-screen-md">
            hello rooms son habitaciones equipadas y listas para mudarse desde el primer día, con Internet de alta velocidad y todos los servicios activos. Nos ocupamos de la gestión y el mantenimiento para que sólo te enfoques en estudiar, disfrutar y explorar Valencia. Comparte piso con otros estudiantes de edad similar y vive una experiencia única en un entorno diseñado para tu estilo de vida. 
              <br />
              <br />
              Contigo desde la reserva hasta tu último día en Valencia.
            </h3>
            <div className="flex items-center justify-between gap-2 border-2 border-gray-300 rounded-full mt-5 w-full max-w-[40rem]">
              <label htmlFor="search" hidden></label>
              <input
                type="text"
                name="search"
                id="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  scrollToCarousel(); // Lleva al inicio del listado al buscar
                }}
                className="appearance-none outline-none w-[80%] ml-4 my-3 font-bold text-gray-800"
                placeholder="¿Dónde quieres vivir? (nombre o dirección)"
              />
              <button
                className="h-12 w-12 rounded-full bg-[#FB6E44] flex justify-center items-center m-2"
                onClick={scrollToCarousel} // Asegura que al hacer clic también desplace
              >
                <MagnifyingGlassIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

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
                  <PropertyCardSkeleton key={index} />
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

function PropertyCardSkeleton() {
  return (
    <article className="animate-pulse flex flex-col max-h-96 h-full gap-3 w-full sm:max-w-72 cursor-pointer border sm:border-none rounded-sm">
      <div className="flex sm:flex-col gap-3 sm:gap-0 w-full h-full">
        {/* Imagen */}
        <div className="relative h-28 w-28 sm:w-72 sm:h-60 bg-gray-300 rounded-md"></div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-1 items-stretch p-2 sm:py-4 gap-2">
          <div className="flex flex-col grow sm:gap-2">
            {/* Categoría */}
            <div className="h-4 bg-gray-300 rounded w-20"></div>

            {/* Nombre */}
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>

            {/* Ubicación */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>

            {/* Amenidades */}
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Precio */}
          <div className="flex justify-end items-end gap-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
