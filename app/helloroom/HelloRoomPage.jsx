import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { getAllProperties } from "../context/actions";
import Footer_1 from "../components/public/home/Footer";
import TitleSection from "../components/public/main-pages/TitleSection";
import PropertyCard from "../components/user/property/PropertyCard";
import FourthSection from "../components/public/home/FourthSection";
import SeventhSection from "../components/public/home/SeventhSection";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TextSection from "../components/public/main-pages/TextSection";
import CategorySelector from "../components/public/main-pages/CategorySelector";
import PropertyCardSekeleton from "../components/public/main-pages/PropertyCardSekeleton";
import { useSearchParams } from "next/navigation";
import NavbarV3 from "../components/nav_bar/NavbarV3";
import RequestSection from "../components/public/main-pages/RequestSection";
import Head from "next/head";


export default function HelloRoomPage() {
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

  //filtros
  const filterByCategory = (properties) => {
    return properties.filter((property) => property.category === "HELLO_ROOM");
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

    const currentDate = new Date(); // Obtener la fecha actual

    // Convertir las fechas de entrada a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Formatear las fechas si son válidas
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    return `Del ${formattedStart} al ${formattedEnd}`;
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
        .filter(Boolean)
        .sort((a, b) => {
          const currentDate = new Date(); // Obtener la fecha actual

          // Obtener el startDate del primer rentalItem de cada room
          const startDateA = new Date(
            a.rentalItems[0]?.rentalPeriod?.startDate
          );
          const startDateB = new Date(
            b.rentalItems[0]?.rentalPeriod?.startDate
          );

          // Verificar si el startDate es mayor que la fecha actual
          const isFutureA = startDateA > currentDate;
          const isFutureB = startDateB > currentDate;

          // Si ambos son futuros, ordenar por fecha más cercana
          if (isFutureA && isFutureB) {
            return startDateA - startDateB; // Ordenar por fecha ascendente
          }

          // Si solo A es futuro, A va primero
          if (isFutureA && !isFutureB) return -1;

          // Si solo B es futuro, B va primero
          if (!isFutureA && isFutureB) return 1;

          // Si ambos son pasados, se puede decidir cómo manejarlos,
          // aquí simplemente los dejamos en el orden original.
          return 0;
        });

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
        const topPosition =
          contactUsElement.getBoundingClientRect().top +
          window.scrollY -
          offset;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    };

    if (
      scrollToForm &&
      displayedRooms &&
      displayedRooms.length === 0 &&
      state?.user
    ) {
      // Intentar el desplazamiento una vez que los displayedRooms estén listos
      const timeout = setTimeout(tryScrollToContactUs, 100); // Pequeño retraso para asegurar el montaje
      return () => clearTimeout(timeout); // Limpiar timeout si el componente se desmonta
    }
  }, [scrollToForm, displayedRooms, state?.user]);

  return (
    <>
      <Head>
        <title>
          Alquiler de habitaciones en Valencia para estudiantes | helloflatmate
        </title>
        <meta
          name="description"
          content="Encuentra el mejor alquiler de habitaciones en Valencia para estudiantes. Pisos compartidos, atención personalizada y ubicaciones ideales. ¡Reserva ya!"
        />
      </Head>
      <div>
        <div className="flex flex-col sm:min-h-screen">
          <header className="mb-16">
            <NavbarV3 fixed={true} />
          </header>
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-8 bg-white items-center justify-around py-10 px-2">
              <h1 className="text-3xl font-bold">
                Alquiler de habitaciones en Valencia para estudiantes
              </h1>
              <h3 id="subtitle" className="text-lg text-center max-w-screen-md">
                Encuentra el alquiler de habitaciones en Valencia para
                estudiantes perfecto con helloflatmate, la solución ideal para
                quienes buscan comodidad, calidad y una experiencia estudiantil
                sin complicaciones. Ofrecemos pisos compartidos modernos, bien
                ubicados y adaptados a tus necesidades para que disfrutes de tu
                estancia en Valencia al máximo.
                <br />
                <br />
                Ya seas estudiante nacional, internacional o Erasmus, en
                helloflatmate tenemos una amplia oferta de habitaciones pensadas
                especialmente para ti.
              </h3>
            </div>
          </div>
          {/* Contenedor de búsqueda y botones */}
          <CategorySelector
            category={"HELLO_ROOM"}
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
              {!state.properties || state.properties?.length === 0 ? (
                // Mostrar skeletons cuando no hay propiedades
                Array.from({ length: 6 }).map((_, index) => (
                  <PropertyCardSekeleton key={index} />
                ))
              ) : displayedRooms.length === 0 ? (
                showSkeleton ? (
                  // Mostrar skeletons por 1 segundo
                  Array.from({ length: 6 }).map((_, index) => (
                    <PropertyCardSekeleton key={index} />
                  ))
                ) : (
                  <>
                    <div className="text-center py-6">
                      <span className="text-lg font-semibold text-gray-600">
                        No se encontraron propiedades que coincidan con tus
                        preferencias. ¡Pero no te preocupes! Aquí tienes otras
                        opciones que podrían interesarte:
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                      {state.properties
                        ?.filter(
                          (property) =>
                            property.category === "HELLO_ROOM" ||
                            property.category === "HELLO_LANDLORD" ||
                            property.category === "HELLO_COLIVING"
                        )
                        .flatMap((property) =>
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
                    <RequestSection
                      filters={filters}
                      requestForm={requestForm}
                    />
                  </>
                )
              ) : (
                // Mostrar habitaciones cuando hay resultados
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {displayedRooms.map((room) => (
                    <div
                      key={`${room.id}-room`}
                      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full"
                    >
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
          <section className="p-4 max-w-screen-lg mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4">
              ¿Por qué elegir el alquiler de habitaciones en Valencia con
              helloflatmate?
            </h2>
            <p className="mb-4">
              En helloflatmate, nuestra prioridad es que encuentres un
              alojamiento cómodo y seguro. Contamos con años de experiencia
              ayudando a estudiantes a encontrar su habitación ideal en
              Valencia. Estas son algunas de las ventajas que ofrecemos:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Pisos recién reformados: Habitaciones modernas, funcionales y
                con todo lo que necesitas.
              </li>
              <li>
                Asesoramiento personalizado: Te acompañamos en cada paso del
                proceso, desde la búsqueda hasta tu estancia.
              </li>
              <li>
                Contrato transparente: Conoce todas las condiciones antes de
                reservar. Sin sorpresas.
              </li>
              <li>
                Fianza garantizada: Recupera tu fianza al final del contrato si
                cumples las condiciones.
              </li>
              <li>
                Soporte continuo: Resolución de cualquier problema con
                compañeros o propietarios de forma rápida y eficiente.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">
              Habitaciones en pisos compartidos cerca de tu universidad
            </h2>
            <p className="mb-4">
              Sabemos lo importante que es vivir cerca de tu universidad para
              ahorrar tiempo y dinero. Por eso, en helloflatmate ofrecemos
              habitaciones en las mejores zonas de Valencia, perfectamente
              conectadas con:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Universidad de Valencia (UV).</li>
              <li>Universidad Politécnica de Valencia (UPV).</li>
              <li>Universidad Católica de Valencia (UCV).</li>
              <li>ESIC Business & Marketing School.</li>
            </ul>
            <p className="mb-4">
              Gracias a nuestra plataforma de búsqueda avanzada, podrás filtrar
              las habitaciones por ubicación, cercanía a transporte público y
              servicios esenciales.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Amplia oferta de habitaciones adaptadas a estudiantes
            </h2>
            <p className="mb-4">
              En helloflatmate, te ofrecemos diferentes tipos de habitaciones
              para que encuentres la opción que mejor se adapte a tus
              necesidades:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Habitaciones individuales: Espacio privado para tu estudio y
                descanso.
              </li>
              <li>
                Habitaciones dobles: Comparte habitación y ahorra en gastos.
              </li>
              <li>
                Habitaciones con baño privado: Comodidad adicional para tu día a
                día.
              </li>
              <li>
                Habitaciones exclusivas para chicas: Opciones adaptadas a tus
                preferencias.
              </li>
            </ul>
            <p className="mb-4">
              ¿Necesitas ayuda? Nuestros agentes están disponibles para
              asesorarte en todo momento y garantizar que encuentres la
              habitación perfecta.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Cómo encontrar tu habitación ideal en Valencia paso a paso
            </h2>
            <p className="mb-4">
              Buscar alquiler de habitaciones en Valencia para estudiantes nunca
              fue tan sencillo. En helloflatmate hemos diseñado un proceso ágil
              y claro:
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Elige tus filtros: Define tu presupuesto, zona y fecha de
                inicio.
              </li>
              <li>
                Explora las opciones: Accede a nuestra plataforma y selecciona
                la habitación que mejor se adapte a ti.
              </li>
              <li>
                Reserva con confianza: Revisa las condiciones del contrato y
                asegura tu habitación online.
              </li>
              <li>
                Disfruta de tu estancia: Instálate en tu nueva habitación y vive
                una experiencia única.
              </li>
            </ol>
            <p className="mb-4">
              Gracias a nuestro sistema, podrás reservar tu habitación desde
              cualquier parte del mundo con total tranquilidad y transparencia.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Ventajas de vivir en un piso compartido en Valencia
            </h2>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              1. Nuevas amistades y experiencias
            </h3>
            <p className="mb-4">
              Conoce a estudiantes nacionales e internacionales, amplía tu red
              de contactos y vive momentos inolvidables.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              2. Flexibilidad de precios
            </h3>
            <p className="mb-4">
              Encuentra habitaciones ajustadas a tu presupuesto sin renunciar a
              la calidad.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              3. Zonas estratégicas
            </h3>
            <p className="mb-4">
              Vive en los mejores barrios de Valencia, cerca de universidades,
              transporte público, ocio y servicios.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              4. Todo incluido
            </h3>
            <p className="mb-4">
              Muchas de nuestras habitaciones incluyen gastos como internet,
              agua y electricidad, para que no tengas que preocuparte por nada
              más.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              ¿Por qué estudiar y vivir en Valencia?
            </h2>
            <p className="mb-4">
              Valencia es una de las ciudades más atractivas de España para
              estudiantes. Estas son algunas razones para elegir Valencia como
              tu destino de estudios:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Clima mediterráneo: Disfruta de más de 300 días de sol al año.
              </li>
              <li>
                Coste de vida asequible: Comparado con otras ciudades europeas,
                Valencia ofrece opciones económicas de alojamiento y ocio.
              </li>
              <li>
                Oferta cultural y de ocio: Museos, eventos deportivos,
                festivales y una vibrante vida nocturna.
              </li>
              <li>
                Playas y naturaleza: Relájate en la playa de la Malvarrosa o
                explora la Albufera en tu tiempo libre.
              </li>
            </ul>
            <p className="mb-4">
              Vivir en un piso compartido con helloflatmate te permitirá
              aprovechar todo lo que Valencia tiene para ofrecer.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Reserva hoy tu habitación con helloflatmate
            </h2>
            <p className="mb-4">
              En helloflatmate, nos especializamos en alquiler de habitaciones
              en Valencia para estudiantes. Ofrecemos una amplia variedad de
              opciones en pisos compartidos, garantizando siempre calidad,
              comodidad y seguridad.
            </p>
            <p className="mb-4">
              ¿Listo para encontrar tu habitación ideal? Contacta con nuestro
              equipo, explora nuestras opciones y reserva hoy mismo.
            </p>
            <p className="mb-4">
              ¡Haz de Valencia tu nuevo hogar con helloflatmate!
            </p>
          </section>
        </div>
        <Footer_1 />
      </div>
    </>
  );
}
