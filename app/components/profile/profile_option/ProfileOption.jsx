import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function ProfileOption({ title, icon, action }) {
  return (
    <button
      onClick={action}
      type="button"
      className="flex gap-3 justify-between items-center p-1 text-[#000000CC]"
    >
      <div>
        <Image src={icon} width={24} height={24} alt={title} />
      </div>
      <h3 className="font-medium text-sm text-start grow pl-2">{title}</h3>
      <button type="button" className="h-8 w-8">
        <ChevronRightIcon />
      </button>
    </button>
  );
}
