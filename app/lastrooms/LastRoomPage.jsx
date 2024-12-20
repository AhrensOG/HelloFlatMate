import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { getAllProperties } from "../context/actions";
import Footer_1 from "../components/public/home/Footer";
import PropertyCard from "../components/user/property/PropertyCard";
import FourthSection from "../components/public/home/FourthSection";
import SeventhSection from "../components/public/home/SeventhSection";
import TextSection from "../components/public/main-pages/TextSection";
import CategorySelector from "../components/public/main-pages/CategorySelector";
import PropertyCardSekeleton from "../components/public/main-pages/PropertyCardSekeleton";
import { useSearchParams } from "next/navigation";
import NavbarV3 from "../components/nav_bar/NavbarV3";
import RequestSection from "../components/public/main-pages/RequestSection";
import Head from "next/head";

export default function LastRoomsPage() {
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
      const last = state.properties.filter(
        (property) => property.status === "FREE"
      );

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

        return matchesZone;
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
          Últimas habitaciones en alquiler en Valencia | helloflatmate
        </title>
        <meta
          name="description"
          content="Descubre las últimas habitaciones en alquiler en Valencia. Pisos compartidos modernos, servicios incluidos y atención personalizada. ¡Reserva ahora antes de que se agoten!"
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
                Últimas habitaciones en alquiler en Valencia para estudiantes
              </h1>
              <h3 id="subtitle" className="text-lg text-center max-w-screen-md">
                ¿Buscas una habitación en Valencia? Descubre las últimas
                habitaciones en alquiler en Valencia con helloflatmate.
                Habitaciones modernas, totalmente equipadas y en pisos
                compartidos bien ubicados, ideales para estudiantes y jóvenes
                profesionales.
                <br />
                <br />
                No dejes pasar esta oportunidad: ¡reserva tu habitación antes de
                que se agoten!
              </h3>
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
              ¿Por qué elegir nuestras últimas habitaciones en alquiler en
              Valencia?
            </h2>
            <p className="mb-4">
              En helloflatmate, sabemos lo importante que es encontrar un
              alojamiento que cumpla con todas tus expectativas. Nuestras
              últimas habitaciones disponibles ofrecen:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Pisos recién reformados: Habitaciones con mobiliario nuevo y
                diseño moderno.
              </li>
              <li>
                Ubicaciones estratégicas: Cerca de universidades, transporte
                público y zonas de ocio.
              </li>
              <li>
                Servicios incluidos: Agua, electricidad, internet de alta
                velocidad y limpieza de zonas comunes.
              </li>
              <li>
                Proceso rápido y transparente: Reserva tu habitación online con
                total confianza.
              </li>
            </ul>
            <p className="mb-4">
              ¡No te quedes sin tu espacio ideal! La disponibilidad es limitada.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Habitaciones en alquiler para estudiantes y jóvenes en Valencia
            </h2>
            <p className="mb-4">
              Nuestras habitaciones en alquiler están pensadas para estudiantes
              nacionales, Erasmus y jóvenes profesionales que buscan:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Comodidad: Habitaciones individuales y dobles adaptadas a tu
                estilo de vida.
              </li>
              <li>
                Convivencia: Comparte piso con personas afines y disfruta de una
                experiencia multicultural.
              </li>
              <li>
                Proximidad a universidades: Habitaciones cerca de la Universidad
                de Valencia (UV), Universidad Politécnica (UPV) y otras
                instituciones.
              </li>
            </ul>
            <p className="mb-4">
              Ya sea para un curso completo, un semestre o una estancia corta,
              en helloflatmate encontrarás la opción perfecta.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              ¿Cómo reservar una de las últimas habitaciones en Valencia?
            </h2>
            <p className="mb-4">
              El proceso es rápido y sencillo. Sigue estos pasos y asegura tu
              habitación en pocos minutos:
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Explora nuestras habitaciones disponibles: Accede a nuestra
                plataforma y utiliza los filtros para encontrar la mejor opción.
              </li>
              <li>
                Revisa las características: Consulta fotos, ubicación, servicios
                incluidos y precio.
              </li>
              <li>
                Reserva online: Formaliza tu reserva con un contrato
                transparente y seguro.
              </li>
              <li>
                Disfruta tu estancia: Instálate en tu nueva habitación y vive
                una experiencia única en Valencia.
              </li>
            </ol>
            <p className="mb-4">
              Si tienes alguna duda, nuestro equipo de atención personalizada
              está aquí para ayudarte durante todo el proceso.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              ¿Qué incluyen nuestras últimas habitaciones en alquiler?
            </h2>
            <p className="mb-4">
              Las habitaciones en alquiler de helloflatmate están diseñadas para
              que tu estancia sea lo más cómoda y sencilla posible. Nuestras
              habitaciones incluyen:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Mobiliario completo: Cama, escritorio, armario y espacios de
                almacenamiento.
              </li>
              <li>
                Internet de alta velocidad: Perfecto para estudiar, trabajar o
                relajarte viendo tus series favoritas.
              </li>
              <li>
                Gastos incluidos: Agua, luz y gas, para que no tengas que
                preocuparte por nada.
              </li>
              <li>
                Limpieza de zonas comunes: Para que siempre disfrutes de un
                entorno limpio y ordenado.
              </li>
            </ul>
            <p className="mb-4">
              Alquila una habitación lista para entrar a vivir, sin
              complicaciones y con todas las comodidades.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Últimas habitaciones en alquiler: ¡Disponibilidad limitada!
            </h2>
            <p className="mb-4">
              Nuestras habitaciones en alquiler en Valencia tienen una alta
              demanda, especialmente al inicio del curso académico. Si buscas:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Habitaciones cerca de tu universidad.</li>
              <li>Pisos compartidos modernos y bien ubicados.</li>
              <li>Flexibilidad en la duración de la estancia.</li>
            </ul>
            <p className="mb-4">
              ¡No esperes más! Las últimas habitaciones se agotan rápidamente.
              Asegura la tuya y disfruta de una estancia sin preocupaciones con
              helloflatmate.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Ventajas de alquilar con helloflatmate en Valencia
            </h2>
            <p className="mb-4">
              Al elegir helloflatmate para encontrar tu habitación en alquiler,
              disfrutarás de:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Atención personalizada: Te ayudamos a encontrar la habitación
                perfecta para ti.
              </li>
              <li>
                Transparencia total: Sin sorpresas ni letra pequeña en tu
                contrato.
              </li>
              <li>
                Flexibilidad: Opciones de alquiler adaptadas a tu presupuesto y
                tiempo de estancia.
              </li>
              <li>
                Soporte continuo: Resolvemos cualquier incidencia durante tu
                estancia.
              </li>
            </ul>
            <p className="mb-4">
              Vive una experiencia única en Valencia con las mejores condiciones
              y el respaldo de una empresa especializada en alojamiento para
              estudiantes y jóvenes.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Valencia: La ciudad perfecta para estudiantes
            </h2>
            <p className="mb-4">
              Valencia no solo es una ciudad universitaria, sino también un
              lugar vibrante lleno de oportunidades:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Clima mediterráneo: Disfruta del buen tiempo durante todo el
                año.
              </li>
              <li>
                Cultura y ocio: Museos, playas, parques y una gastronomía
                inigualable.
              </li>
              <li>
                Coste de vida asequible: Perfecto para estudiantes y jóvenes.
              </li>
              <li>
                Bien comunicada: Excelente transporte público para moverte
                fácilmente por la ciudad.
              </li>
            </ul>
            <p className="mb-4">
              Con nuestras últimas habitaciones en alquiler en Valencia, podrás
              aprovechar todo lo que esta ciudad tiene para ofrecerte.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              ¡Reserva ahora tu habitación en Valencia antes de que se agoten!
            </h2>
            <p className="mb-4">
              Las últimas habitaciones en alquiler en Valencia están disponibles
              por tiempo limitado. Si quieres asegurar tu espacio en un piso
              compartido moderno y bien ubicado, no pierdas más tiempo.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Contacta con nosotros y reserva tu habitación ideal.</li>
              <li>Vive en las mejores zonas de Valencia.</li>
              <li>Disfruta de una experiencia cómoda y sin complicaciones.</li>
            </ul>
            <p className="mb-4">
              ¡No te quedes sin la tuya! Tu habitación perfecta en Valencia te
              está esperando.
            </p>
          </section>
        </div>

        <Footer_1 />
      </div>
    </>
  );
}
