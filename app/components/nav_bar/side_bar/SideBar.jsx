"use client";
import Image from "next/image";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SideBarButton from "./SideBarButton";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import { logOut } from "@/app/firebase/logOut";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

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
  // {
  //   title: "Pagos",
  //   icon: "/nav_bar/side_bar/admin/payments.svg",
  //   link: "/pages/admin/payments",
  // },
  // {
  //   title: "Pago de suministros",
  //   icon: "/nav_bar/side_bar/admin/supplies-payment.svg",
  //   link: "/pages/admin/supplies",
  // },
  {
    title: "Chats",
    icon: "/nav_bar/side_bar/admin/chats.svg",
    link: "/pages/admin/chats_panel",
  },
  // {
  //   title: "Ayuda",
  //   icon: "/nav_bar/side_bar/admin/help.svg",
  //   link: "#",
  // },
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
  // {
  //   title: "Servicios",
  //   icon: "/nav_bar/side_bar/owner/services.svg",
  //   link: "/pages/admin/supplies",
  // },
];
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
  // {
  //   title: "Chats",
  //   icon: "/nav_bar/side_bar/client/chats.svg",
  //   link: "/pages/user/chats",
  // },
  // {
  //   title: "Mis Contratos",
  //   icon: "/nav_bar/side_bar/client/documents.svg",
  //   link: "/pages/user/contract/history",
  // },
  // {
  //   title: "Servicios",
  //   icon: "/nav_bar/side_bar/client/services.svg",
  //   link: "/pages/user/services",
  // },
  // {
  //   title: "Configuración",
  //   icon: "/nav_bar/side_bar/client/configuration.svg",
  //   link: "#",
  // },
];

export default function SideBar({
  handleClose,
  isOpen,
  client = true,
  owner = false,
  admin = false,
}) {
  const route = useRouter();
  const { state } = useContext(Context);
  const [user, setUser] = useState(state?.user || null);

  const handleRedirect = (url) => {
    route.push(url);
  };

  const handleLogOut = async () => {
    await logOut();
    handleRedirect("/pages/auth");
  };

  useEffect(() => {
    setUser(state?.user);
  }, [state.user]);
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.5 }}
          className={`  flex flex-col items-start fixed inset-0 z-50 w-full bg-white`}
        >
          <div className="flex p-3 w-full">
            <button onClick={handleClose} aria-label="Cerrar menú">
              <Image
                src={"/nav_bar/side_bar/btn-close.svg"}
                layout="responsive"
                width={24}
                height={24}
                alt="Botón para cerrar menú"
              />
            </button>
            <div className="w-full grid place-items-center">
              <Image
                src={"/nav_bar/nav-bar-logo.svg"}
                width={125}
                height={41}
                alt="Logo de FlatMate"
              />
            </div>
          </div>
          {(user?.role === "CLIENT" || !user) && (
            <nav className="flex flex-col w-full gap-4">
              <button
                onClick={() => handleRedirect("/")}
                type="button"
                className="flex gap-2 items-center px-5 w-full"
              >
                <div>
                  <Image
                    src={"/nav_bar/side_bar/black-house.svg"}
                    layout="responsive"
                    width={20}
                    height={20}
                    alt="Botón para ir al inicio"
                  />
                </div>
                <h2 className="text-xl font-medium text-licorice-black">
                  <Link href="#">Inicio</Link>
                </h2>
              </button>
              {clientOptions.map((e) => {
                return (
                  <SideBarButton
                    key={e.title}
                    title={e.title}
                    icon={e.icon}
                    redirect={() => handleRedirect(e.link)}
                  />
                );
              })}
              <button
                onClick={handleLogOut}
                type="button"
                className="flex items-center gap-3 px-3"
              >
                <div className="relative w-[40px] h-[40px] ml-2">
                  <Image
                    src="/nav_bar/cerrar-sesion.gif"
                    fill
                    alt="Cerrar Sesion"
                    priority
                  />
                </div>
                <h2 className="text-xl text-center text-gris-español">Salir</h2>
              </button>
            </nav>
          )}
          {user?.role === "OWNER" && (
            <nav className="flex flex-col w-full gap-4">
              <button
                onClick={() => handleRedirect("/")}
                type="button"
                className="flex gap-2 items-center px-5 w-full"
              >
                <div>
                  <Image
                    src={"/nav_bar/side_bar/black-house.svg"}
                    layout="responsive"
                    width={20}
                    height={20}
                    alt="Botón para ir al inicio"
                  />
                </div>
                <h2 className="text-xl font-medium text-licorice-black">
                  <Link href="#">Inicio</Link>
                </h2>
              </button>
              {ownerOptions.map((e) => {
                return (
                  <SideBarButton
                    key={e.title}
                    title={e.title}
                    icon={e.icon}
                    redirect={() => handleRedirect(e.link)}
                  />
                );
              })}
              <button
                onClick={handleLogOut}
                type="button"
                className="flex flex-col items-center justify-between gap-1"
              >
                <div className="relative w-[40px] h-[40px]">
                  <ArrowRightStartOnRectangleIcon className="size-10" />
                </div>
                <h2 className="text-xs text-center text-[#636574]">Salir</h2>
              </button>
            </nav>
          )}
          {user?.role === "ADMIN" && (
            <nav className="flex flex-col w-full gap-4">
              <button
                onClick={() => handleRedirect("/")}
                type="button"
                className="flex gap-2 items-center px-5 w-full"
              >
                <div>
                  <Image
                    src={"/nav_bar/side_bar/black-house.svg"}
                    layout="responsive"
                    width={20}
                    height={20}
                    alt="Botón para ir al inicio"
                  />
                </div>
                <h2 className="text-xl font-medium text-licorice-black">
                  <Link href="/pages/auth">Login</Link>
                </h2>
              </button>
              {adminOptions?.map((e) => {
                return (
                  <SideBarButton
                    key={e.title}
                    title={e.title}
                    icon={e.icon}
                    redirect={() => handleRedirect(e.link)}
                  />
                );
              })}
              <button
                onClick={handleLogOut}
                type="button"
                className="flex flex-col items-center justify-between gap-1"
              >
                <div className="relative w-[40px] h-[40px]">
                  <ArrowRightStartOnRectangleIcon className="size-10" />
                </div>
                <h2 className="text-xs text-center text-[#636574]">Salir</h2>
              </button>
            </nav>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
