import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "../public/auth/Dropdown";

const HomeNavBar = ({ setActiveSection, activeSection }) => {
  return (
    <nav className="w-full p-2 sm:p-0">
      {/* Mobile version */}
      <div className="sm:hidden flex-col w-full divide-y">
        <div className="flex h-20 justify-between items-center w-full gap-2">
          <button
            className="bg-[#0E175C] text-sm text-white px-3 py-2 rounded"
            aria-label="Buscar una habitación"
          >
            Buscar habitaciones
          </button>

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

          <div className="flex items-center gap-2">
            <Link href={"/pages/auth"} className="relative w-[24px] h-[24px]">
              <Image src="/nav_bar/account.svg" fill alt="Cuenta del usuario" />
            </Link>
            <Dropdown p-0 />
          </div>
        </div>

        {/* Segunda fila - Navegación */}
        <div className="w-full h-10 flex flex-wrap items-center justify-start gap-1">
          <button
            onClick={() => setActiveSection("inicio")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "inicio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveSection("helloroom")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "helloroom"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            helloroom
          </button>
          <button
            onClick={() => setActiveSection("hellocoliving")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "hellocoliving"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellocoliving
          </button>
          <button
            onClick={() => setActiveSection("hellostudio")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "hellostudio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellostudio
          </button>
          <button
            onClick={() => setActiveSection("hellolandlord")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "hellolandlord"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellolandlord
          </button>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:flex flex-col w-full divide-y">
        <div className="flex justify-between items-center w-full h-20 px-4 md:px-6">
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

        <div className="w-full h-16 flex items-center justify-start gap-3 md:gap-4 px-4 md:px-6">
          <button
            onClick={() => setActiveSection("inicio")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "inicio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveSection("helloroom")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "helloroom"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            helloroom
          </button>
          <button
            onClick={() => setActiveSection("hellocoliving")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "hellocoliving"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellocoliving
          </button>
          <button
            onClick={() => setActiveSection("hellostudio")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "hellostudio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellostudio
          </button>
          <button
            onClick={() => setActiveSection("hellolandlord")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "hellolandlord"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellolandlord
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
