import Auth from "@/app/components/public/auth/Auth";
import Dropdown from "@/app/components/public/auth/Dropdown";
import Image from "next/image";

export default function authPage() {
    return (
        <div className="flex flex-col h-screen">
            <header>
                <nav className="flex justify-between items-center px-5">
                    <button><Image src="/icon-left-arrow.svg" width={48} height={48} alt="Boton para volver"></Image></button>
                    <Dropdown />
                </nav>
            </header>
            <main className="flex justify-center items-center grow">
                <Auth />
            </main>
        </div>
    )
}