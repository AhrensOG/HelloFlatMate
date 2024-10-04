import { ChevronRightIcon } from "@heroicons/react/20/solid";
import CheckBadgeIconMini from "./check_icon/CheckBadgeIconMini";
import Image from "next/image";
import Link from "next/link";

export default function ProfileCard({
  name,
  email,
  action,
  image = "/profile/profile.jfif",
}) {
  return (
    <section
      onClick={action}
      className="cursor-pointer flex justify-between items-center rounded-3xl shadow-profile p-2 pt-3"
    >
      <div className="h-16 w-16 rounded-full relative bg-[#875252]">
        <Image
          className="rounded-full"
          src={image}
          fill
          alt="Ilustracion de perfil"
          objectPosition="top"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <h1 className="font-bold text-lg">{name}</h1>
        <p className="text-center font-normal text-sm flex gap-1 items-center text-[#919191]">
          {email}{" "}
          <span className="text-[#0C1660]">
            <CheckBadgeIconMini />
          </span>
        </p>
      </div>
      <button onClick={action} type="button" className="opacity-50 h-10 w-10">
        <ChevronRightIcon />
      </button>
    </section>
  );
}
