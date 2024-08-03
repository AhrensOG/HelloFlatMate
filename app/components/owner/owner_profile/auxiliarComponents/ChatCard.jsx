import { poppins } from "@/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChatCard = ({
  image = "/profile/owner_profile/new_chat.svg",
  title = "New Chat",
  link = "#",
}) => {
  return (
    <Link href={link} className="w-full">
      <div className="min-w-20 w-20 h-32 shadow-profile rounded-md border flex flex-col justify-center items-center">
        <div className="h-11 w-11 rounded-full relative bg-[#875252]">
          <Image
            className="rounded-full"
            src={image}
            fill
            alt="Ilustracion de perfil"
            objectPosition="top"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-full p-2 grid place-items-center">
          <span
            className={`${poppins.className} text-center text-sm font-medium`}
          >
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
