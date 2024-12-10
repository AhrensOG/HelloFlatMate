import Image from "next/image";
import React from "react";

const CategoryCard = ({
  currentCategory,
  setCurrentCategory,
  title,
  image,
  categoryId,
}) => {
  return (
    <div
      onClick={() => setCurrentCategory(categoryId)}
      className={`${
        currentCategory === categoryId
          ? "bg-[#5ce0e5] border-[#5ce0e5] text-white scale-110"
          : "border-[#D9D9D9] bg-[#D9D9D9] "
      } hover:scale-110 hover:bg-[#5ce0e5] hover:text-white transition duration-300 flex flex-row justify-between items-center w-full max-w-48 gap-2 p-1 px-4 rounded-md border cursor-pointer min-h-[60px]`}
    >
      {/* <Image src={image} width={85} height={78} alt="helloroom icon" /> */}
      <h1 className={`w-full text-center text-lg font-bold`}>{title}</h1>
    </div>
  );
};

export default CategoryCard;
