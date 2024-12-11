import React from "react";
import Image from "next/image";

const SliderItem = ({ img, rounded = "", height = "h-[12.5rem]" }) => {
  return (
    <div className={`w-full relative ${height}`}>
      <div className="absolute w-full h-full z-10" />
      <Image
        className={`object-contain ${rounded}`}
        src={img}
        alt="slider-img"
        unoptimized={true}
        fill
        priority
      />
    </div>
  );
};

export default SliderItem;
