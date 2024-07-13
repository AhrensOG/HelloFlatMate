import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full grid place-items-center">
      <div className="relative w-full max-w-screen-sm h-60">
        <Image
          src={"/home/hero.svg"}
          fill
          alt="Main Image"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Hero;
