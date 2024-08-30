import { WifiIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Amenity({ name, icon }) {
  return (
    <div className="flex gap-5">
      <span className="w-[2.5rem] h-[2.5rem] bg-[#E8EDF2] self-center rounded-lg flex justify-center items-center">
        {icon}
      </span>
      <h5 className="text-base font-normal self-center">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h5>
    </div>
  );
}
