import React from "react";
import Image from "next/image";

const SliderItem = ({ img, rounded = "", height = "h-[12.5rem]" }) => {
  return (
    <div className={`w-full relative ${height}`}>
      <div className="absolute w-full h-full z-10" />
      <Image
        className={`object-cover object-center ${rounded}`}
        src={img}
        alt="slider-img"
        fill
        priority
      />
    </div>
  );
};

export default SliderItem;
