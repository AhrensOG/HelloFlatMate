import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DesktopNavBarDetails({
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
    <nav className="flex justify-between items-center p-2">
      <button onClick={() => handleBack(link)} className="cursor-pointer">
        <Image
          src={"/property_details/nav_bar_details/back-icon.svg"}
          width={24}
          height={24}
          alt="Boton para volver atras"
        />
      </button>
    </nav>
  );
}
