import React from "react";
import Image from "next/image"; // Asumiendo que estás utilizando Next.js

const SliderItem = ({ img }) => {
  return (
    <div className="w-full">
      <Image
        className="object-cover object-center"
        src={img}
        alt="slider-img"
        width={390}
        height={218}
      />
    </div>
  );
};

export default SliderItem;
