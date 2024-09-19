"use client";
import Image from "next/image";
import Dropdown from "../public/auth/Dropdown";
import { useState } from "react";
import SideBar from "./side_bar/SideBar";
import { useRouter } from "next/navigation";

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
