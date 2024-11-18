import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "../public/auth/Dropdown";
import AccountDropdown from "./AccountDropdown";
import ClimaTime from "./ClimaTime";

const HomeNavBar = ({ setActiveSection, activeSection }) => {
  return (
    <nav className="w-full p-2 sm:p-0">
      {/* Mobile version */}
      <div className="sm:hidden flex-col w-full divide-y">
        <div className="flex h-20 justify-between items-center w-full gap-2">
          <div className="flex items-center h-20 w-full">
            <Link
              href="/"
              className="relative w-[80px] h-[50px]"
              title="Volver a inicio"
            >
              <Image
                // src="/nav_bar/nav-bar-logo.svg"
                src="/home/onlyLogo.svg"
                fill
                alt="Logo de HelloFlatMate"
                priority
              />
            </Link>
            {/* <Link
              href={"/pages/select-category"}
              className="px-4 py-2 text-sm font-medium underline underline-offset-2 rounded"
              aria-label="Buscar una habitación"
            >
              Buscar alojamientos
            </Link> */}
            <ClimaTime />
          </div>
          <div className="flex items-center gap-2">
            <AccountDropdown />
            <Dropdown p-0 />
          </div>
        </div>

        {/* Segunda fila - Navegación */}
        <div className="w-full h-10 flex flex-wrap items-center justify-start gap-1">
          <Link
            href={"/"}
            // onClick={() => setActiveSection("inicio")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "inicio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            Inicio
          </Link>
          <Link
            href={"/helloroom"}
            // onClick={() => setActiveSection("helloroom")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "helloroom"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            helloroom
          </Link>
          <Link
            href={"/hellostudio"}
            // onClick={() => setActiveSection("hellostudio")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "hellostudio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellostudio
          </Link>
          <Link
            href={"/hellocoliving"}
            // onClick={() => setActiveSection("hellocoliving")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "hellocoliving"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellocoliving
          </Link>
          <Link
            href={"/hellolandlord"}
            // onClick={() => setActiveSection("hellolandlord")}
            className={`text-xs font-medium px-1 py-1 rounded-xl transition-colors ${
              activeSection === "hellolandlord"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellolandlord
          </Link>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:flex flex-col w-full divide-y">
        <div className="flex justify-between items-center w-full h-20 px-4 md:px-6">
          <div className="flex items-center gap-1 md:gap-4">
            <Link
              href="/"
              className="relative w-[80px] h-[50px]"
              title="Volver a inicio"
            >
              <Image
                // src="/nav_bar/nav-bar-logo.svg"
                src="/home/onlyLogo.svg"
                fill
                alt="Logo de HelloFlatMate"
                priority
              />
            </Link>
            <div className="h-[40px] md:h-[44px] border-l border-black"></div>
            {/* <Link
              href={"/pages/select-category"}
              className="px-4 py-2 text-lg font-medium rounded"
              aria-label="Buscar una habitación"
            >
              
            </Link> */}
            <ClimaTime />
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href={"/pages/user/filtered"}
              className="bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded"
              aria-label="Reservar una habitación"
            >
              Reservar
            </Link>
            <div className="flex items-center gap-2">
              <AccountDropdown />
            </div>

            <div className="h-[40px] md:h-[44px] border-l border-black"></div>
            <Dropdown p-0 />
          </div>
        </div>

        <div className="w-full h-16 flex items-center justify-start gap-3 md:gap-4 px-4 md:px-6">
          <Link
            href={"/"}
            // onClick={() => setActiveSection("inicio")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "inicio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            Inicio
          </Link>
          <Link
            href={"/helloroom"}
            // onClick={() => setActiveSection("helloroom")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "helloroom"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            helloroom
          </Link>
          <Link
            href={"/hellostudio"}
            // onClick={() => setActiveSection("hellostudio")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "hellostudio"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellostudio
          </Link>
          <Link
            href={"/hellocoliving"}
            // onClick={() => setActiveSection("hellocoliving")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "hellocoliving"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellocoliving
          </Link>
          <Link
            href={"/hellolandlord"}
            // onClick={() => setActiveSection("hellolandlord")}
            className={`text-base md:text-lg font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-colors ${
              activeSection === "hellolandlord"
                ? "font-bold bg-slate-100"
                : "hover:font-bold hover:bg-slate-100"
            }`}
          >
            hellolandlord
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
