import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full grid place-items-center"
    >
      <div className="relative w-full max-w-screen-sm h-60">
        <Image
          src={"/home/hero.svg"}
          fill
          alt="Ilustracion principal del sitio web"
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
