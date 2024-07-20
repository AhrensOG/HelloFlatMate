import Image from "next/image";

export default function NavBarDetails() {
  return (
    <nav className="flex justify-between items-center py-3 px-4">
      <button>
        <Image
          src={"/property_details/nav_bar_details/back-icon.svg"}
          width={24}
          height={24}
          alt="Boton para volver atras"
        />
      </button>
      <div>
        <Image
          src={"/nav_bar/nav-bar-logo.svg"}
          width={125}
          height={41}
          alt="Logo de FlatMate"
        />
      </div>
      <button>
        <Image
          src={"/property_details/nav_bar_details/icon-share.svg"}
          width={24}
          height={24}
          alt="Boton para compartir"
        />
      </button>
    </nav>
  );
}
