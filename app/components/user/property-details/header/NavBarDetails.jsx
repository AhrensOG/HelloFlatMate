import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBarDetails({
  link = `/`,
  callBack = false,
  detailLink = "/",
}) {
  const route = useRouter();
  const handleBack = (link) => {
    if (callBack) return callBack();
    route.push(link);
  };
  return (
    <nav className="relative flex justify-center items-center py-3 px-4">
      <button className="absolute left-2" onClick={() => handleBack(link)}>
        <Image
          src={"/property_details/nav_bar_details/back-icon.svg"}
          width={24}
          height={24}
          alt="Boton para volver atras"
        />
      </button>
      <div>
        <Image
          src={"/home/new_home/newLogo.png"}
          width={125}
          height={39.06}
          alt="Logo de FlatMate"
        />
      </div>
      {/* <Link href={detailLink} target="_blank">
        <Image
          src={"/property_details/nav_bar_details/icon-share.svg"}
          width={24}
          height={24}
          alt="Boton para compartir"
        />
      </Link> */}
    </nav>
  );
}
