import Image from "next/image";

export default function FamilySection({
  title = "Conviértete en Parte de Nuestra Familia",
  description = "En Helloflatmate, no solo encontrarás un lugar para vivir, sino también una comunidad vibrante de estudiantes como tú. Aquí, compartimos más que espacio; compartimos experiencias, sueños y metas. Vive con personas que entienden tus desafíos y celebran tus logros.",
  img1 = "/home/family1.svg",
  img2 = "/home/subFamily1.svg",
}) {
  return (
    <section className="relative w-full flex items-center justify-center">
      {/* Imagen de fondo - ocupa toda la pantalla en versión móvil y la mitad izquierda en versión escritorio */}
      <div className="relative w-full sm:w-5/6 h-[350px] sm:h-[500px]">
        <Image
          src={img1}
          alt="Personas jugando en una comunidad"
          fill
          objectFit="cover"
          className="rotate-[0.01deg]"
          quality={100}
        />

        {/* Gradiente superpuesto */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Contenido que se muestra sobre la imagen en ambas versiones */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 p-6 sm:max-w-[75%] text-white h-full">
          {/* Título */}
          <h2 className="font-bold text-[26px] leading-[24px] tracking-[-1.5px] text-center sm:text-left md:text-3xl">
            {title}
          </h2>

          {/* Descripción */}
          <p className="font-normal text-[18px] leading-[27px] text-center sm:text-center md:text-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Cuadro azul solo visible en escritorio */}
      <div className="hidden sm:block w-1/2 h-[500px] bg-[#1FAECC]"></div>

      {/* Imagen superpuesta sobre la división entre la imagen de fondo y el fondo azul */}
      <div className="absolute z-20 hidden sm:block left-2/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Image
          src={img2} // Cambia esta ruta por la imagen superpuesta que quieras usar
          alt="Imagen superpuesta"
          width={400}
          height={400}
          quality={100}
        />
      </div>
    </section>
  );
}
