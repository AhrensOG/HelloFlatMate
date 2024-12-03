import Image from "next/image";
import Link from "next/link";

// components/HeroSection.js
export default function EightSection() {
  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-2">
      {/* Ilustración */}
      <div className="relative w-[300px] h-[200px] sm:w-[550px] sm:h-[350px]">
        <Image
          src={"/home/new_home/livingroom.svg"}
          fill
          alt="livingroom"
          className="object-cover"
        />
      </div>

      {/* Texto */}
      <h1 className="text-2xl sm:text-4xl font-semibold text-gray-800 my-10 mt-20">
        Encuentra tu casa ideal con Spotahome
      </h1>

      {/* Botón */}
      <Link
        href={"/#search"}
        className="px-6 py-3 sm:text-xl bg-orange-500 text-white font-medium rounded shadow hover:bg-orange-600 transition duration-300"
      >
        Empieza a buscar
      </Link>
    </section>
  );
}
