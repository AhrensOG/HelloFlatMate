import Link from "next/link";
import Dropdown from "../auth/Dropdown";
import Image from "next/image";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function SecondaryNavbar({ fixed = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`flex items-center justify-around py-2 px-10 z-30 bg-transparent ${
        fixed ? "fixed top-0 w-full h-16 z-20" : "relative"
      } `}
    >
      {/* Icono de menú hamburguesa a la izquierda */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="absolute left-4"
        >
          <Bars3Icon className="size-6" />
        </button>
      </div>
      <Link href={"/"}>
        <Image
          src="/home/new_home/newLogo.png"
          width={100}
          height={31.25}
          alt="logo"
          className="filter brightness grayscale"
        />
      </Link>
      <div className="hidden md:flex items-center gap-5">
        {/* <button className="border py-3 px-5 font-bold text-lg border-black">Soy un propietario</button> */}
        <Link
          href="/ultimas-habitaciones"
          target="_blank"
          className="font-bold text-base text-black border border-black p-2 px-5"
        >
          Last rooms
        </Link>
        <Link
          href="/como-funciona"
          target="_blank"
          className="font-bold text-base text-black"
        >
          Cómo funciona
        </Link>
        <Link
          href="/terminos-y-condiciones"
          target="_blank"
          className="font-bold text-base text-black"
        >
          Términos y condiciones
        </Link>
        <div className="flex gap-1">
          <Link
            href="/pages/auth?register=true"
            target="_blank"
            className="font-bold text-base text-black"
          >
            Registro
          </Link>
          <span className="font-bold text-base text-black">|</span>
          <Link
            href="/pages/auth"
            target="_blank"
            className="font-bold text-base text-black"
          >
            Iniciar sesión
          </Link>
        </div>
        {/* <Link href="#" target="_blank" className="font-bold text-lg">
                    Ayuda
                </Link> */}
        <Dropdown p={0} />
      </div>

      {/* Menú desplegable solo para móvil (no se abrirá) */}
      {isOpen && (
        <div className="bg-white absolute top-16 left-0 right-0 bg-transparent shadow-lg rounded-md p-4 md:hidden">
          {/* <button className="border py-3 px-5 font-bold text-lg border-black w-full">Soy un propietario</button> */}
          <Link
          href="/"
            target="_blank"
            className="block font-bold text-lg mt-2"
          >
            Inicio
          </Link>
          <Link
          href="/ultimas-habitaciones"
            target="_blank"
            className="block font-bold text-lg mt-2"
          >
            Last rooms
          </Link>
          <Link
            href="#"
            target="_blank"
            className="block font-bold text-lg mt-2"
          >
            Cómo funciona
          </Link>
          <Link
            href="#"
            target="_blank"
            className="block font-bold text-lg mt-2"
          >
            Términos y condiciones
          </Link>
          <div className="flex flex-col gap-2 mt-2">
            <Link href="#" target="_blank" className="block font-bold text-lg">
              Registro
            </Link>
            <span className="hidden font-bold text-lg my-1 sm:block">|</span>
            <Link href="#" target="_blank" className="block font-bold text-lg">
              Iniciar sesión
            </Link>
          </div>
          <Dropdown p={0} />
        </div>
      )}
    </nav>
  );
}
