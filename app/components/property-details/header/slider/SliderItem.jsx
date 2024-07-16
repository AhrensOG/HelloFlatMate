import React from "react";
import Image from "next/image"; // Asumiendo que estás utilizando Next.js

const SliderItem = ({ img }) => {
  return (
    <div className="w-full relative h-60">
      <Image
        className="object-cover object-center"
        src={img}
        alt="slider-img"
        loading="lazy"
        fill
      />
    </div>
  );
};

export default SliderItem;
