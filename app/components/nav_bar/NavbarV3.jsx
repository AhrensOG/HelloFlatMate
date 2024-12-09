"use client"
import Link from "next/link";
import Dropdown from "../public/auth/Dropdown";
import Image from "next/image";
import { useState, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "@/app/context/GlobalContext";
import { logOut } from "@/app/firebase/logOut";

export default function NavbarV3({ fixed = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useContext(Context);
  const user = state?.user;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`flex items-center justify-between py-2 px-4 lg:px-10 z-30 border-b border-[#c7c7c7] bg-white ${
        fixed ? "fixed top-0 w-full h-16 z-20" : "relative"
      } `}
    >
      {/* Icono de menú hamburguesa a la izquierda */}
      <div className="md:hidden flex justify-center items-center">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Logo */}
      <Link href={"/"}>
        <Image
          src="/home/new_home/Helloflatmate.png"
          width={130}
          height={41.13}
          alt="logo"
        />
      </Link>

      {/* Menú de escritorio */}
      <div className="hidden md:flex items-center gap-5">
        <Link
          href="/lastrooms"
          target="_blank"
          className="font-bold text-base border border-black py-1 p-2 px-5"
        >
          Last rooms
        </Link>
        <Link
          href="/como-funciona"
          target="_blank"
          className="font-bold text-base"
        >
          Cómo funciona
        </Link>
        <Link
          href="/terminos-y-condiciones"
          target="_blank"
          className="font-bold text-base"
        >
          Términos y condiciones
        </Link>

        {user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 font-bold text-base">
              {user.name} <ChevronDownIcon className="size-4 text-gray-500" />
            </button>
            <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md hidden group-hover:block shadow-reservation-list">
              <Link
                href="/pages/user/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Perfil
              </Link>
              <Link
                href="/pages/user/my-bedrooms"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Panel
              </Link>
              <Link
                href="/pages/user/my-reservations"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Historico
              </Link>
              <Link
                href="/pages/user/history/payments"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Pagos
              </Link>
              <button
                onClick={() => logOut()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-1">
            <Link
              href="/pages/auth?register=true"
              className="font-bold text-base"
            >
              Registro
            </Link>
            <span className="font-bold text-base">|</span>
            <Link href="/pages/auth" className="font-bold text-base">
              Inicio
            </Link>
          </div>
        )}
        <Dropdown p={0} />
      </div>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-md p-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/lastrooms"
                target="_blank"
                className="block font-bold text-lg"
              >
                Last rooms
              </Link>
              <Link
                href="/como-funciona"
                target="_blank"
                className="block font-bold text-lg"
              >
                Cómo funciona
              </Link>
              <Link
                href="/privacy-policy"
                target="_blank"
                className="block font-bold text-lg"
              >
                Términos y condiciones
              </Link>
              {user ? (
                <>
                  <Link
                    href="/pages/user/profile"
                    className="block font-bold text-lg"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/pages/user/my-bedrooms"
                    className="block font-bold text-lg"
                  >
                    Panel
                  </Link>
                  <Link
                    href="/pages/user/my-reservations"
                    className="block font-bold text-lg"
                  >
                    Reservas
                  </Link>
                  <Link
                    href="/pages/user/history/payments"
                    className="block font-bold text-lg"
                  >
                    Pagos
                  </Link>
                  <button
                    onClick={() => logOut()}
                    className="block font-bold text-lg"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/pages/auth?register=true"
                    className="block font-bold text-lg"
                  >
                    Registro
                  </Link>
                  <Link href="/pages/auth" className="block font-bold text-lg">
                    Inicio
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
