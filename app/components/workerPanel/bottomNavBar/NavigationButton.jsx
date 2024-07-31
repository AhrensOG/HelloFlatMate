import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavigationButton = ({ img, alt, title, link, gray = true }) => {
  return (
    <div className="w-full h-full grid place-items-center">
      <Link
        href={link}
        className="h-full flex flex-col justify-between items-center"
        style={{ filter: gray ? "grayscale(100%) opacity(0.5)" : "" }}
      >
        <Image src={img} width={30} height={30} alt={alt} />
        <span className="text-xs">{title}</span>
      </Link>
    </div>
  );
};

export default NavigationButton;
