"use client";
import Image from "next/image";
import Dropdown from "../public/auth/Dropdown";
import { useState, useEffect, useContext } from "react";
import SideBar from "./side_bar/SideBar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Context } from "@/app/context/GlobalContext";
import { logOut } from "@/app/firebase/logOut";
import { ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

// Opciones para los diferentes roles
const clientOptions = [
  {
    title: "Pagos",
    icon: "/nav_bar/payment.gif",
    link: "/pages/user/history/payments",
  },
  {
    title: "Histórico",
    icon: "/nav_bar/desktop-my-contracts.gif",
    link: "/pages/user/my-reservations",
  },
  {
    title: "Panel",
    icon: "/nav_bar/monitor.gif",
    link: "/pages/user/my-bedrooms",
  },
  {
    title: "Perfil",
    icon: "/nav_bar/desktop-profile.gif",
    link: "/pages/user/profile",
  },
];

const ownerOptions = [
  {
    title: "Dashboard",
    icon: "/nav_bar/side_bar/owner/configuration.svg",
    link: "/pages/owner",
  },
  {
    title: "Propiedades",
    icon: "/nav_bar/side_bar/owner/properties.svg",
    link: "/pages/owner/properties",
  },
  {
    title: "Mis Inquilinos",
    icon: "/nav_bar/side_bar/owner/tenants.svg",
    link: "/pages/owner/my-tenants",
  },
  {
    title: "Chats",
    icon: "/nav_bar/side_bar/owner/chats.svg",
    link: "/pages/user/chats",
  },
];

const adminOptions = [
  {
    title: "Dashboard",
    icon: "/nav_bar/side_bar/admin/configuration.svg",
    link: "/pages/admin",
  },
  {
    title: "Usuarios",
    icon: "/nav_bar/side_bar/admin/users.svg",
    link: "/pages/admin/users",
  },
  {
    title: "Propiedades",
    icon: "/nav_bar/side_bar/admin/properties.svg",
    link: "/pages/admin/properties",
  },
  {
    title: "Documentos",
    icon: "/nav_bar/side_bar/admin/documents.svg",
    link: "/pages/admin/documents",
  },
  {
    title: "Mensajes",
    icon: "/nav_bar/side_bar/admin/chats.svg",
    link: "/pages/admin/chats_panel",
  },
];

export default function NavBar({
  client = true,
  admin = false,
  owner = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const { state } = useContext(Context); // Obtener el contexto global para conocer el rol
  const [user, setUser] = useState(state?.user || null); // Estado para manejar el usuario

  const handleRedirect = (url) => {
    route.push(url);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogOut = async () => {
    await logOut();
    return handleRedirect("/pages/auth");
  };

  // Actualizar el estado del usuario cuando el contexto cambie
  useEffect(() => {
    setUser(state?.user);
  }, [state.user]);

  // Renderizar las opciones según el rol
  const renderOptions = (options) => {
    return options.map((option) => (
      <div key={option.title} className="flex flex-col items-center">
        <Link
          href={option.link}
          className="flex flex-col items-center justify-between gap-1"
        >
          <div className="relative w-[40px] h-[40px]">
            <Image src={option.icon} fill alt={option.title} priority />
          </div>
          <p className="text-xs text-center text-[#636574]">{option.title}</p>
        </Link>
      </div>
    ));
  };

  return (
    <nav className="w-full min-h-[93px]">
      {/* MOBILE */}
      <div className="w-full min-h-[93px] flex justify-between items-center sm:hidden p-2">
        <button onClick={handleOpen} aria-label="Abrir menú">
          <Image
            src="/nav_bar/burger-btn-nav-bar.svg"
            width={24}
            height={24}
            alt="Botón para abrir menú de navegación"
            priority
          />
        </button>
        <div className="relative w-[80px] h-[50px] cursor-pointer">
          <Link href="/">
            <Image
              src="/home/onlyLogo.svg"
              fill
              alt="Logo de FlatMate"
              priority
            />
          </Link>
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
      <div className="w-full min-h-[93px] px-6 py-4 sm:flex justify-between items-center hidden border-b">
        {/* Logo */}
        <div className="relative w-[80px] h-[50px] cursor-pointer">
          <Link href="/">
            <Image
              src="/home/onlyLogo.svg"
              fill
              alt="Logo de FlatMate"
              priority
            />
          </Link>
        </div>

        {/* Opciones según el rol */}
        <div className="flex items-center gap-2 md:gap-6">
          {user?.role === "CLIENT" && (
            <>{renderOptions(clientOptions)}
              {/* Logout visible solo para CLIENT */}
              <button
                onClick={handleLogOut}
                type="button"
                className="flex flex-col items-center justify-between gap-1"
              >
                <div className="relative w-[40px] h-[40px] ml-2">
                <Image className="size-10"
                  src="/nav_bar/cerrar-sesion.gif"
                  fill
                  alt="Cerrar Sesion"
                  priority
                />
                </div>
                <h2 className="text-xs text-center text-[#636574]">Salir</h2>
              </button>
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
            </>
          )}
          {user?.role === "OWNER" && renderOptions(ownerOptions)}
          {user?.role === "ADMIN" && renderOptions(adminOptions)}
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
