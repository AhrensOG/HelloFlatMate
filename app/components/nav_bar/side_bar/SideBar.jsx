"use client";
import Image from "next/image";
import Link from "next/link";
import { plus_jakarta } from "@/font";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SideBarButton from "./SideBarButton";

export default function SideBar({ handleClose, isOpen }) {
  const route = useRouter();

  const handleRedirect = (url) => {
    route.push(url);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.5 }}
          className={`${plus_jakarta.className} flex flex-col items-start fixed inset-0 z-10 w-full bg-white`}
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
          <nav className="flex flex-col w-full gap-4">
            <button
              onClick={() => handleRedirect("/")}
              type="button"
              className="flex gap-2 items-center px-4 py-3 w-full h-[1.25rem]"
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
            <SideBarButton
              title={"Mi perfil"}
              icon={""}
              redirect={() => handleRedirect("/pages/profile")}
            />
            <SideBarButton
              title="Mi dormitorio"
              icon="/nav_bar/side_bar/ligth-house.svg"
              redirect={() => handleRedirect("/pages/my-bedrooms")}
            />
            <SideBarButton
              title="Mis contratos"
              icon="/nav_bar/side_bar/contract-icon.svg"
              redirect={() => handleRedirect("/pages/contract/history")}
            />
            <SideBarButton
              title="Mis viajes"
              icon="/nav_bar/side_bar/paper.svg"
              // redirect={handleRedirect("/pages/my-travels")}
            />
            <SideBarButton
              title="Chats"
              icon="/nav_bar/side_bar/chat-icon.svg"
              redirect={() => {
                handleRedirect("/pages/chats");
              }}
            />
            <SideBarButton
              title="Servicios"
              icon="/nav_bar/side_bar/question.svg"
              redirect={() => {
                handleRedirect("/pages/services");
              }}
            />
            <SideBarButton
              title="Configuración"
              icon="/nav_bar/side_bar/config-icon.svg"
              // redirect={handleRedirect("/pages/settings")}
            />
            <SideBarButton
              title="Soporte"
              icon="/nav_bar/side_bar/headphone-icon.svg"
              // redirect={handleRedirect("/pages/support")}
            />
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
