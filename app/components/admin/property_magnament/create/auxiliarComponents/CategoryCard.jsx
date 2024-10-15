import Image from "next/image";
import React from "react";

const CategoryCard = ({
  currentCategory,
  setCurrentCategory,
  title,
  image,
  categoryId,
  handleContinue,
}) => {
  return (
    <div
      onClick={() => {
        setCurrentCategory(categoryId);
        handleContinue();
      }}
      className={`${
        currentCategory === categoryId
          ? "scale-110 border-resolution-blue"
          : "border-[#D9D9D9]"
      } transition duration-300 flex flex-row justify-between items-center w-full max-w-72 gap-2 bg-[#D9D9D9] p-1 px-4 rounded-md border cursor-pointer min-h-[95px]`}
    >
      <Image src={image} width={85} height={78} alt="helloroom icon" />
      <h1 className={`w-full text-center text-lg font-medium`}>{title}</h1>
    </div>
  );
};

export default CategoryCard;
