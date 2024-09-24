"use client";
import { useState, useEffect } from "react";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CategoryCard from "./auxiliarComponents/CategoryCard";
import Select from "./auxiliarComponents/Select";
import { useRouter, useSearchParams } from "next/navigation";

const list = [
  {
    name: "helloroom",
    img: "/create-property/helloroom.svg",
    id: "HELLO_ROOM",
  },
  {
    name: "hellocoliving",
    img: "/create-property/hellocoliving.svg",
    id: "HELLO_COLIVING",
  },
  {
    name: "hellostudio",
    img: "/create-property/hellostudio.svg",
    id: "HELLO_STUDIO",
  },
  {
    name: "hellolandlord",
    img: "/create-property/hellolandlord.svg",
    id: "HELLO_LANDLORD",
  },
];

const CategorySelector = ({
  helloRoomProperties,
  helloColivingProperties,
  helloStudioProperties,
  helloLandlordProperties,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("c"); // Obtiene el parámetro "c" de la URL

  const [currentCategory, setCurrentCategory] = useState(null); // Estado para la categoría seleccionada
  const [data, setData] = useState({}); // Estado para almacenar los datos seleccionados

  // Si recibimos selectedCategory (prop c), lo usamos como la categoría seleccionada
  useEffect(() => {
    if (categoryQuery) {
      setCurrentCategory(categoryQuery);
    }
  }, [categoryQuery]);

  // Función para extraer las ubicaciones de las propiedades
  const extractLocations = (properties) => {
    if (properties.length === 0) {
      return ["Sin opciones disponibles"];
    }

    // Extraemos las zonas y eliminamos las duplicadas usando un Set
    const uniqueZones = [
      ...new Set(properties.map((property) => property.zone)),
    ];

    // Si no hay zonas válidas después de eliminar duplicados, mostramos un mensaje
    return uniqueZones.length > 0 ? uniqueZones : ["Sin opciones disponibles"];
  };

  // Función para extraer las fechas disponibles de las propiedades
  const extractDates = (properties, category) => {
    let availableDates = new Set(); // Usamos un Set para evitar duplicados

    if (category === "HELLO_ROOM" || category === "HELLO_COLIVING") {
      // Si la categoría es HELLO_ROOM o HELLO_COLIVING, acceder a los rooms de cada propiedad
      properties.forEach((property) => {
        property.rooms.forEach((room) => {
          room.rentalPeriods
            .filter((period) => period.status === "FREE") // Filtrar los periodos disponibles
            .forEach((period) => {
              const startDate = new Date(period.startDate);
              const endDate = new Date(period.endDate);

              // Formatear las fechas
              const formattedStartDate = new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "numeric",
                year: "2-digit",
              }).format(startDate);

              const formattedEndDate = new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "numeric",
                year: "2-digit",
              }).format(endDate);

              // Añadir al Set para evitar duplicados
              availableDates.add(
                `Del ${formattedStartDate} al ${formattedEndDate}`
              );
            });
        });
      });
    } else {
      // Para las demás categorías, se accede directamente a los rentalPeriods de la propiedad
      properties.forEach((property) => {
        property.rentalPeriods
          .filter((period) => period.status === "FREE") // Filtrar los periodos disponibles
          .forEach((period) => {
            const startDate = new Date(period.startDate);
            const endDate = new Date(period.endDate);

            // Formatear las fechas
            const formattedStartDate = new Intl.DateTimeFormat("es-ES", {
              day: "numeric",
              month: "numeric",
              year: "2-digit",
            }).format(startDate);

            const formattedEndDate = new Intl.DateTimeFormat("es-ES", {
              day: "numeric",
              month: "numeric",
              year: "2-digit",
            }).format(endDate);

            // Añadir al Set para evitar duplicados
            availableDates.add(
              `Del ${formattedStartDate} al ${formattedEndDate}`
            );
          });
      });
    }

    // Convertimos el Set de fechas en un array
    const uniqueDates = Array.from(availableDates);

    // Si no hay fechas disponibles
    if (uniqueDates.length === 0) {
      return ["Sin opciones disponibles"];
    }

    return uniqueDates;
  };

  // Función que devuelve el contenido según la categoría seleccionada
  const renderSelectedCategoryContent = () => {
    switch (currentCategory) {
      case "HELLO_ROOM":
        const helloRoomLocations = extractLocations(helloRoomProperties);
        const helloRoomDates = extractDates(
          helloRoomProperties,
          currentCategory
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center items-start gap-4">
              <Select
                options={helloRoomLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
                name="zone"
              />
              <Select
                options={helloRoomDates}
                data={data}
                setData={setData}
                title="Fechas disponibles"
                name="date"
              />
            </div>
          </div>
        );
      case "HELLO_COLIVING":
        const helloColivingLocations = extractLocations(
          helloColivingProperties
        );
        const helloColivingDates = extractDates(
          helloColivingProperties,
          currentCategory
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center items-start gap-4">
              <Select
                options={helloColivingLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
              />
              <Select
                options={helloColivingDates}
                data={data}
                setData={setData}
                title="Fechas disponibles"
              />
            </div>
          </div>
        );
      case "HELLO_STUDIO":
        const helloStudioLocations = extractLocations(helloStudioProperties);
        const helloStudioDates = extractDates(helloStudioProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center items-start gap-4">
              <Select
                options={helloStudioLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
              />
              <Select
                options={helloStudioDates}
                data={data}
                setData={setData}
                title="Fechas disponibles"
              />
            </div>
          </div>
        );
      case "HELLO_LANDLORD":
        const helloLandlordLocations = extractLocations(
          helloLandlordProperties
        );
        const helloLandlordDates = extractDates(helloLandlordProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center items-start gap-4">
              <Select
                options={helloLandlordLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
              />
              <Select
                options={helloLandlordDates}
                data={data}
                setData={setData}
                title="Fechas disponibles"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-5 p-4`}
    >
      <div className="w-full flex flex-row justify-start items-center gap-2 p-5">
        <button
          onClick={() => router.push("/")} // Restablecer la categoría seleccionada
          type="button"
          className="self-start flex justify-center items-center gap-2"
        >
          <Image
            src={"/payment/back-icon.svg"}
            width={24}
            height={24}
            alt="Boton para regresar"
          />
          <span className="text-sm underline font-medium">Volver</span>
        </button>
        <h1 className="w-[calc(100%_-_170px)] text-center font-bold sm:text-lg">
          ¿Qué deseas reservar?
        </h1>
      </div>

      {/* Cards de categorías */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5 items-center justify-center">
        {list.map((e) => (
          <CategoryCard
            key={e.id}
            title={e.name}
            image={e.img}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            categoryId={e.id}
            onClick={() => setCurrentCategory(e.id)} // Actualizar categoría seleccionada
          />
        ))}
      </div>

      {currentCategory && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="w-full mt-6 p-4 text-center"
          >
            {renderSelectedCategoryContent()}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-screen-lg flex justify-start items-center">
          <button
            onClick={() => router.push("/pages/home")}
            className="px-10 py-4 bg-[#1FAECC] rounded-md text-white font-bold"
          >
            Buscar
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default CategorySelector;
