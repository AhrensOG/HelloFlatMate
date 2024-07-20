import React from "react";
import Image from "next/image";

const SliderItem = ({ img }) => {
  return (
    <div className="w-full relative">
      <div className="absolute w-full h-full z-10" />
      <Image
        className="object-cover object-center"
        src={img}
        alt="slider-img"
        layout="responsive"
        width={200}
        height={200}
        priority
      />
    </div>
  );
};

export default SliderItem;
