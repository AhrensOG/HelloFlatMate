"use client";
import Image from "next/image";
import Dropdown from "../public/auth/Dropdown";
import { useState } from "react";
import SideBar from "./side_bar/SideBar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBar({
  client = true,
  admin = false,
  owner = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const handleRedirect = (url) => {
    route.push(url);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="w-full">
      {/* MOBILE */}
      <div className="w-full flex justify-between items-center sm:hidden p-2">
        <button onClick={handleOpen} aria-label="Abrir menú">
          <Image
            src="/nav_bar/burger-btn-nav-bar.svg"
            width={24}
            height={24}
            alt="Botón para abrir menú de navegación"
            priority
          />
        </button>
        <div className="relative w-36 h-12">
          <Image
            onClick={() => handleRedirect("/")}
            className="ml-[4%] self-center"
            src="/nav_bar/nav-bar-logo.svg"
            fill
            alt="Logo de FlatMate"
            priority
          />
        </div>
        <div className="flex items-center gap-2 w-[87px] h-[34px]">
          <button
            onClick={() => handleRedirect("/pages/user/notification")}
            type="button"
            aria-label="Ir a notificaciones"
          >
            <Image
              src="/nav_bar/notification-logo.svg"
              width={34}
              height={34}
              alt="Botón para notificaciones"
            />
          </button>
          <Dropdown p-0 />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="w-full px-6 py-4 sm:flex justify-between items-center hidden border-b">
        {/* Logo */}
        <div className="relative w-[150px] h-[50px] cursor-pointer">
          <Link href="/">
            <Image
              src="/nav_bar/nav-bar-logo.svg"
              fill
              alt="Logo de FlatMate"
              priority
            />
          </Link>
        </div>

        {/* Opciones */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Mis contratos */}
          <div className="flex flex-col items-center">
            <Link href="/contracts" className="flex flex-col items-center justify-between gap-1">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/nav_bar/desktop-my-contracts.svg" // Cambiar al icono que desees
                  fill
                  alt="Mis contratos"
                  priority
                />
              </div>
              <p className="text-xs text-center text-[#636574]">
                Contratos
              </p>
            </Link>
          </div>

          {/* Mis Dormitorios */}
          <div className="flex flex-col items-center">
            <Link href="/rooms" className="flex flex-col items-center justify-between gap-1">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/nav_bar/desktop-my-bedrooms.svg" // Cambiar al icono que desees
                  fill
                  alt="Mis Dormitorios"
                  priority
                />
              </div>
              <p className="text-xs text-center text-[#636574]">
                Dormitorios
              </p>
            </Link>
          </div>

          {/* Chats */}
          <div className="flex flex-col items-center">
            <Link href="/chats" className="flex flex-col items-center justify-between gap-1">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/nav_bar/desktop-chats.svg" // Cambiar al icono que desees
                  fill
                  alt="Chats"
                  priority
                />
              </div>
              <p className="text-xs text-center text-[#636574]">Chats</p>
            </Link>
          </div>

          {/* Mi Perfil */}
          <div className="flex flex-col items-center">
            <Link href="/profile" className="flex flex-col items-center justify-between gap-1">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/nav_bar/desktop-profile.svg" // Cambiar al icono que desees
                  fill
                  alt="Mi Perfil"
                  priority
                />
              </div>
              <p className="text-xs text-center text-[#636574]">Mi Perfil</p>
            </Link>
          </div>

          {/* Soporte */}
          <div className="flex flex-col items-center">
            <Link href="/support" className="flex flex-col items-center justify-between gap-1">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/nav_bar/desktop-support.svg" // Cambiar al icono que desees
                  fill
                  alt="Soporte"
                  priority
                />
              </div>
              <p className="text-xs text-center text-[#636574]">Soporte</p>
            </Link>
          </div>

          {/* Notificaciones */}
          <Link
            href="/pages/user/notification"
            className="relative w-[34px] h-[34px]"
          >
            <Image
              src="/nav_bar/notification-logo.svg"
              fill
              alt="Notificaciones"
              priority
            />
          </Link>

          {/* Dropdown */}
          <Dropdown p={0} />
        </div>
      </div>

      <SideBar
        handleClose={handleClose}
        isOpen={isOpen}
        client={client}
        admin={admin}
        owner={owner}
      />
    </nav>
  );
}
