import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Definimos los datos para cada sección
const data = {
  helloroom: {
    title: "Diseño pensado en estudiantes",
    description:
      "Cada helloroom está equipada con todo lo que necesitas para tener éxito académico y disfrutar de tu vida universitaria. Desde escritorios amplios hasta espacios de almacenamiento eficiente, hemos pensado en cada detalle.",
    img1: "/home/family2.svg",
    img2: "/home/subFamily2.svg",
  },
  hellocoliving: {
    title: "Diseño pensado en estudiantes",
    description:
      "Cada helloroom está equipada con todo lo que necesitas para tener éxito académico y disfrutar de tu vida universitaria. Desde escritorios amplios hasta espacios de almacenamiento eficiente, hemos pensado en cada detalle.",
    img1: "/home/family3.svg",
    img2: "/home/subFamily3.svg",
  },
  hellostudio: {
    title: "Perfecto para estudiar toda tu carrera en valencia",
    description:
      "hellostudio ofrece un ambiente productivo y colaborativo diseñado para profesionales y emprendedores. Disfruta de espacios modernos y funcionales que fomentan la creatividad y la eficiencia. En HelloStudio, encontrarás alta tecnología, internet rápido, salas de reuniones equipadas, áreas comunes cómodas y eventos comunitarios que fomentan el networking y la colaboración.",
    img1: "/home/family4.svg",
    img2: "/home/subFamily4.svg",
  },
  hellolandlord: {
    title: "Habitaciones gestionadas para tu comodidad",
    description:
      "hellolandlord ofrece habitaciones gestionadas por propietarios de nuestra confianza, diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento al llegar a Valencia por menos de un año.",
    img1: "/home/family1.svg",
    img2: "/home/subFamily1.svg",
  },
};

export default function FamilySection() {
  // Estado para controlar la sección activa
  const [activeSection, setActiveSection] = useState("helloroom");

  // Obtiene las claves de las secciones para iterar
  const sectionKeys = Object.keys(data);

  // Cambia la sección activa automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prevSection) => {
        const currentIndex = sectionKeys.indexOf(prevSection);
        const nextIndex = (currentIndex + 1) % sectionKeys.length;
        return sectionKeys[nextIndex];
      });
    }, 5000); // Cambiar cada 5 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [sectionKeys]);

  // Datos de la sección activa
  const { title, description, img1, img2 } = data[activeSection];

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo - ocupa toda la pantalla en versión móvil y la mitad izquierda en versión escritorio */}
      <motion.div
        key={img1} // Cambiar la clave para que el componente se reanime al cambiar la imagen
        initial={{ opacity: 0 }} // Agregar animación de escala
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }} // Duración de la animación
        className="relative w-full sm:w-5/6 h-[350px] sm:h-[500px]"
      >
        <Image
          src={img1}
          alt="Personas jugando en una comunidad"
          fill
          className="object-cover"
          quality={100}
          priority
        />

        {/* Gradiente superpuesto */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Contenido que se muestra sobre la imagen en ambas versiones */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 p-6 sm:max-w-[75%] text-white h-full">
          {/* Título */}
          <motion.h2
            initial={{ opacity: 0 }} // Agregar animación de escala
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-[26px] leading-[24px] tracking-[-1.5px] text-center sm:text-left md:text-3xl"
          >
            {title}
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0 }} // Agregar animación de escala
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }} // Añadir un retraso para que aparezca después del título
            className="font-normal text-[18px] leading-[27px] text-center sm:text-center md:text-2xl"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>

      {/* Cuadro azul solo visible en escritorio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden sm:block w-1/2 h-[500px] bg-[#1FAECC]"
      ></motion.div>

      {/* Imagen superpuesta sobre la división entre la imagen de fondo y el fondo azul */}
      <div className="absolute z-20 hidden sm:block left-2/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <motion.div
          key={img2} // Cambiar la clave para que el componente se reanime al cambiar la imagen
          initial={{ opacity: 0, scale: 0.8 }} // Agregar animación de escala
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={img2}
            alt="Imagen superpuesta"
            width={400}
            height={400}
            quality={100}
            priority
          />
        </motion.div>
      </div>

      {/* Botones del carrusel */}
      <div className="absolute bottom-0 sm:bottom-auto sm:right-10 sm:top-1/2 transform -translate-y-1/2 z-30 flex sm:flex-col flex-row gap-4">
        {sectionKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`w-3 h-3 rounded-full ${
              activeSection === key ? "bg-black scale-150" : "bg-black"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
