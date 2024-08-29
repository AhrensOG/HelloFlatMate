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
    <div className="flex justify-between items-center w-full p-1.5">
      <button onClick={handleOpen}>
        <Image
          src="/nav_bar/burger-btn-nav-bar.svg"
          width={24}
          height={24}
          alt="Boton para abrir menu"
        />
      </button>
      <div className="h-full flex">
        {" "}
        <Image
          className="ml-[4%] self-center"
          src="/nav_bar/nav-bar-logo.svg"
          layout="responsive"
          width={125}
          height={41}
          alt="Logo de FlatMate"
        />
      </div>
      <div className="flex items-center gap-2 w-[87px] h-[34px]">
        <button
          onClick={() => handleRedirect("/pages/user/notification")}
          type="button"
        >
          <Image
            src="/nav_bar/notification-logo.svg"
            width={34}
            height={34}
            alt="Boton para notificaciones"
          />
        </button>
        <Dropdown p-0 />
      </div>

      <SideBar
        handleClose={handleClose}
        isOpen={isOpen}
        client={client}
        admin={admin}
        owner={owner}
      />
    </div>
  );
}
