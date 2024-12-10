import Image from "next/image";
import Dropdown from "../../public/auth/Dropdown";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function UserSerivceNavBar() {
    const router = useRouter();
    return (
        <nav className={`  flex w-full items-center justify-between p-3 max-h-[72px]`}>
            <button onClick={() => router.back()}>
                <ArrowLeftIcon className="size-8" />
            </button>
            <div className="h-full flex m-auto">
                {" "}
                <Image
                    className="ml-[4%] self-center"
                    src="/nav_bar/nav-bar-logo.svg"
                    layout="responsive"
                    width={125}
                    height={41}
                    alt="Logo de FlatMate"
                />
            </div>
            <div className="flex items-center gap-2 w-[87px]">
                <button onClick={() => handleRedirect("/pages/notification")} type="button">
                    <Image src="/nav_bar/notification-logo.svg" width={34} height={34} alt="Boton para notificaciones" />
                </button>
                <Dropdown p-0 />
            </div>
        </nav>
    );
}
