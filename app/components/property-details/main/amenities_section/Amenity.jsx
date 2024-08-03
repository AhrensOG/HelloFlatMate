import Image from "next/image";

export default function Amenity({ name, image }) {
  return (
    <div className="flex gap-5">
      <span className="w-[2.5rem] h-[2.5rem] bg-[#E8EDF2] self-center rounded-lg">
        <Image src={image} alt={name} width={40} height={40} />
      </span>
      <h5 className="text-base font-normal self-center">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h5>
    </div>
  );
}
