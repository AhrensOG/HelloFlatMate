"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "../public/auth/Dropdown";

const HomeNavBar = () => {
  return (
    <nav className="w-full p-2 sm:p-0">
      {/* Mobile version */}
      <div className="sm:hidden flex-col w-full divide-y">
        {/* Primera fila - Logo, Buscar habitación, Cuenta e Idioma */}
        <div className="flex h-20 justify-between items-center w-full gap-2">
          {/* Botón "Buscar una habitación" a la izquierda */}
          <button
            className="bg-[#0E175C] text-sm text-white px-3 py-2 rounded"
            aria-label="Buscar una habitación"
          >
            Buscar habitaciones
          </button>

          {/* Logo en el centro */}
          <Link
            href="/"
            className="relative w-[100px] h-[35px]"
            title="Volver a inicio"
          >
            <Image
              src="/nav_bar/nav-bar-logo.svg"
              fill
              alt="Logo de HelloFlatMate"
              priority
            />
          </Link>

          {/* Icono de cuenta y dropdown a la derecha */}
          <div className="flex items-center gap-2">
            <div className="relative w-[24px] h-[24px]">
              <Image src="/nav_bar/account.svg" fill alt="Cuenta del usuario" />
            </div>
            <Dropdown p-0 />
          </div>
        </div>

        {/* Segunda fila - Navegación */}
        <div className="w-full h-10 flex flex-wrap items-center justify-start gap-1">
          <Link
            href="/"
            title="Ir al inicio"
            className="text-xs font-medium hover:font-bold hover:bg-slate-100 px-1 py-1 rounded-xl transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#"
            title="Explorar habitaciones en helloroom"
            className="text-xs font-medium hover:font-bold hover:bg-slate-100 px-1 py-1 rounded-xl transition-colors"
          >
            helloroom
          </Link>
          <Link
            href="/#"
            title="Explorar hellocoliving"
            className="text-xs font-medium hover:font-bold hover:bg-slate-100 px-1 py-1 rounded-xl transition-colors"
          >
            hellocoliving
          </Link>
          <Link
            href="/#"
            title="Explorar estudios en hellostudio"
            className="text-xs font-medium hover:font-bold hover:bg-slate-100 px-1 py-1 rounded-xl transition-colors"
          >
            hellostudio
          </Link>
          <Link
            href="/#"
            title="Explorar opciones en hellolandlord"
            className="text-xs font-medium hover:font-bold hover:bg-slate-100 px-1 py-1 rounded-xl transition-colors"
          >
            hellolandlord
          </Link>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:flex flex-col w-full divide-y">
        {/* Primera fila - Logo, Buscar habitación, Cuenta e Idioma */}
        <div className="flex justify-between items-center w-full h-20 px-4 md:px-6">
          {/* Sección izquierda - Logo y botón "Buscar Habitación" */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/"
              className="relative w-[120px] h-[40px] md:w-[145px] md:h-[48px]"
              title="Volver a inicio"
            >
              <Image
                src="/nav_bar/nav-bar-logo.svg"
                fill
                alt="Logo de HelloFlatMate"
                priority
              />
            </Link>

            <div className="h-[40px] md:h-[44px] border-l border-black"></div>

            <button
              className="bg-[#0E175C] text-white px-4 py-2 md:px-6 md:py-3 rounded"
              aria-label="Buscar una habitación"
            >
              Buscar una habitación
            </button>
          </div>

          {/* Sección derecha - Cuenta e Idioma */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="relative w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                <Image
                  src="/nav_bar/account.svg"
                  fill
                  alt="Cuenta del usuario"
                />
              </div>
              <Link
                href="/pages/auth"
                title="Ir a iniciar sesión"
                className="font-['Plus_Jakarta_Sans'] text-[16px] md:text-[18px]"
              >
                Cuenta
              </Link>
            </div>

            <div className="h-[40px] md:h-[44px] border-l border-black"></div>

            <Dropdown p-0 />
          </div>
        </div>

        {/* Segunda fila - Navegación */}
        <div className="w-full h-16 flex items-center justify-start gap-3 md:gap-4 px-4 md:px-6">
          <Link
            href="/"
            title="Ir al inicio"
            className="text-base md:text-lg font-medium hover:font-bold hover:bg-slate-100 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#"
            title="Explorar habitaciones en helloroom"
            className="text-base md:text-lg font-medium hover:font-bold hover:bg-slate-100 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors"
          >
            helloroom
          </Link>
          <Link
            href="/#"
            title="Explorar hellocoliving"
            className="text-base md:text-lg font-medium hover:font-bold hover:bg-slate-100 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors"
          >
            hellocoliving
          </Link>
          <Link
            href="/#"
            title="Explorar estudios en hellostudio"
            className="text-base md:text-lg font-medium hover:font-bold hover:bg-slate-100 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors"
          >
            hellostudio
          </Link>
          <Link
            href="/#"
            title="Explorar opciones en hellolandlord"
            className="text-base md:text-lg font-medium hover:font-bold hover:bg-slate-100 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors"
          >
            hellolandlord
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
