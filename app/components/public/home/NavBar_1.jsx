import Link from "next/link";
import Dropdown from "../auth/Dropdown";
import Image from "next/image";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function NavBar_1({ fixed = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`flex items-center justify-between py-2 px-10 border-b border-[#c7c7c7] bg-white ${
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
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            class=""
          >
            <title></title>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                transform="translate(-15.000000, -21.000000)"
                fill="#666666"
                fill-rule="nonzero"
                stroke="#666666"
                stroke-width="0.75"
              >
                <path
                  d="M32,23.5540267 L16,23.5540267 L16,22 L32,22 L32,23.5540267 Z M32,30.7770134 L16,30.7770134 L16,29.2229866 L32,29.2229866 L32,30.7770134 Z M32,38 L16,38 L16,36.4459733 L32,36.4459733 L32,38 Z"
                  id=""
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
      <Link href={"/"}>
        <Image
          src="/home/new_home/Helloflatmate.png"
          width={100}
          height={100}
          alt="logo"
        />
      </Link>
      <div className="hidden md:flex items-center gap-5">
        {/* <button className="border py-3 px-5 font-bold text-lg border-black">Soy un propietario</button> */}
        <Link href="#" target="_blank" className="font-bold text-base">
          Cómo funciona
        </Link>
        <Link href="#" target="_blank" className="font-bold text-base">
          Términos y condiciones
        </Link>
        <div className="flex gap-1">
          <Link href="#" target="_blank" className="font-bold text-base">
            Registro
          </Link>
          <span className="font-bold text-base">|</span>
          <Link href="#" target="_blank" className="font-bold text-base">
            Inicio
          </Link>
        </div>
        {/* <Link href="#" target="_blank" className="font-bold text-lg">
                    Ayuda
                </Link> */}
        <Dropdown p={0} />
      </div>

      {/* Menú desplegable solo para móvil (no se abrirá) */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-md p-4 md:hidden">
          {/* <button className="border py-3 px-5 font-bold text-lg border-black w-full">Soy un propietario</button> */}
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
          <div className="flex flex-col mt-2">
            <Link href="#" target="_blank" className="block font-bold text-lg">
              Registro
            </Link>
            <span className="block font-bold text-lg my-1">|</span>
            <Link href="#" target="_blank" className="block font-bold text-lg">
              Inicio
            </Link>
          </div>
          {/* <Link href="#" target="_blank" className="block font-bold text-lg mt-2">
                        Ayuda
                    </Link> */}
          <Dropdown p={0} />
        </div>
      )}
    </nav>
  );
}
