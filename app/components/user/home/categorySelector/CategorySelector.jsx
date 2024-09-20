"use client";
import { useState } from "react";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CategoryCard from "./auxiliarComponents/CategoryCard";
import Select from "./auxiliarComponents/Select";
import { useRouter } from "next/navigation";

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
  const [currentCategory, setCurrentCategory] = useState(null); // Estado para la categoría seleccionada
  const [data, setData] = useState({}); // Estado para almacenar los datos seleccionados

  // Función para extraer las ubicaciones de las propiedades
  const extractLocations = (properties) => {
    if (properties.length === 0) {
      return ["Sin opciones disponibles"];
    }
    return properties.map((property) => {
      const { street, streetNumber, city } = property;
      return `${street}, ${city}`;
    });
  };

  // Función para extraer las fechas disponibles de las propiedades
  const extractDates = (properties) => {
    const availableDates = properties
      .map((property) => property.date)
      .filter(Boolean); // Filtra fechas válidas

    if (availableDates.length === 0) {
      return ["Sin opciones disponibles"];
    }
    return availableDates;
  };

  // Función que devuelve el contenido según la categoría seleccionada
  const renderSelectedCategoryContent = () => {
    switch (currentCategory) {
      case "HELLO_ROOM":
        const helloRoomLocations = extractLocations(helloRoomProperties);
        const helloRoomDates = extractDates(helloRoomProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center items-start gap-4">
              <Select
                options={helloRoomLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
              />
              <Select
                options={helloRoomDates}
                data={data}
                setData={setData}
                title="Fechas disponibles"
              />
            </div>
          </div>
        );
      case "HELLO_COLIVING":
        const helloColivingLocations = extractLocations(
          helloColivingProperties
        );
        const helloColivingDates = extractDates(helloColivingProperties);
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
          ¿Que deseas reservar?
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
          <button onClick={() => router.push("/pages/home")} className="px-10 py-4 bg-[#1FAECC] rounded-md text-white font-bold">Buscar</button>
        </div>
      </div>
    </motion.section>
  );
};

export default CategorySelector;
