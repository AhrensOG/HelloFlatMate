import Image from "next/image";

const SliderItem = ({ img, isActive = false }) => {
  return (
    <div className="w-full aspect-[16/9] relative overflow-hidden bg-gray-100">
      {isActive && (
        <Image
          src={img}
          alt="slider-img"
          width={1280}
          height={720}
          className="w-full h-full object-fill"
          loading="eager"
        />
      )}
    </div>
  );
};

export default SliderItem;
