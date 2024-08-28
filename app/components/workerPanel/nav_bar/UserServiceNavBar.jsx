import Image from "next/image";
import Dropdown from "../../auth/Dropdown";
import { plus_jakarta } from "@/font";

export default function UserSerivceNavBar() {
  return (
    <nav
      className={`${plus_jakarta.className} flex w-full justify-between p-1.5`}
    >
      <div className="h-full flex m-auto">
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
          onClick={() => handleRedirect("/pages/notification")}
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
    </nav>
  );
}
