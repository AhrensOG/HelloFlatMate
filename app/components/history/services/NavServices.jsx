import {
  ArrowLeftIcon,
  ArrowTurnRightDownIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

export default function NavServices() {
  return (
    <nav className="flex justify-between h-[4.5rem] bg-[#F7FAFA]">
      <button className="h-7 w-7 m-3 cursor-pointer opacity-70">
        <ArrowLeftIcon />
      </button>

      <div className="w-[7.81rem] h-[2.56rem] m-auto relative">
        <Image
          src={"/nav_bar/nav-bar-logo.svg"}
          fill
          alt="Logo de FlatMate"
          style={{ objectFit: "contain" }}
        />
      </div>

      <button className="m-3 cursor-pointer">
        <Image
          src={"/services/rigth-arrow-box.svg"}
          alt="icon"
          width={24}
          height={24}
        />
      </button>
    </nav>
  );
}
