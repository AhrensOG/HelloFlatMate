import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SideBarButton({ title, icon, redirect }) {
  return (
    <button
      onClick={redirect}
      type="button"
      className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-4 text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <div className="flex gap-2 items-center w-full">
        {title === "Mi perfil" ? (
          <div className="w-6 h-6">
            <UserIcon />
          </div>
        ) : (
          <div className="mr-1">
            <Image
              src={icon}
              width={40}
              height={40}
              alt={`Boton ${title.toLowerCase()}`}
            />
          </div>
        )}
        <h5 className="text-gris-español font-medium text-xl">{title}</h5>
      </div>
      {/* <div>
        <Image
          className="self-end pb-[5px]"
          src={"/nav_bar/side_bar/item-side-bar-arrow.svg"}
          layout="res"
          width={10}
          height={8.03}
          alt={""}
        />
      </div> */}
    </button>
  );
}
