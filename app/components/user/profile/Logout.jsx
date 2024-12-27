import { logOut } from "@/app/firebase/logOut";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const t = useTranslations("logout");
    const handleLogOut = async () => {
        await logOut();
        router.push("/pages/auth");
    };
    return (
        <section
            onClick={() => handleLogOut()}
            className="cursor-pointer flex px-3 py-4 justify-between items-center text-[#FF0000CC] shadow-profile rounded-2xl"
        >
            <div className="h-8 w-8 relative">
                <Image src={"/profile/logout/logout.svg"} alt="Ilustracion de perfil" fill style={{ objectFit: "cover" }} />
            </div>
            <h3 className="font-medium text-sm text-start grow pl-3">{t("logout")}</h3>
            <div className="w-8 h-8">
                <ChevronRightIcon />
            </div>
        </section>
    );
}
