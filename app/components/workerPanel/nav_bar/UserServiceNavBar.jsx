import Image from "next/image";
import Dropdown from "../../public/auth/Dropdown";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function UserSerivceNavBar() {
  const router = useRouter();
  return (
    <nav
      className={`flex w-full items-center justify-between p-3 max-h-[72px]`}>
      <button onClick={() => router.back()}>
        <ArrowLeftIcon className="size-8" />
      </button>
      <div className="relative w-32 h-14 flex m-auto">
        {" "}
        <Image src="/newlogohfm.png" fill alt="Logo de helloflatmate" className="object-cover object-center" />
      </div>
      <div className="flex items-center gap-2 w-[87px]">
        <Dropdown p-0 />
      </div>
    </nav>
  );
}
