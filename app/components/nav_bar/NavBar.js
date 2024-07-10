import Image from "next/image"

export default function NavBar() {
    return (
        <>
            <button><Image src="/nav_bar/burger-btn-nav-bar.svg" width={24} height={24} alt="Boton para abrir menu" /></button>
            <Image src="/nav_bar/nav-bar-logo.svg" width={100} height={100} alt="Logo de FlatMate" />
            <div>
                <button><Image src="/nav_bar/notification-logo.svg" width={34} height={34} alt="Boton para notificaciones" /></button>
                <button></button>
            </div>
        </>
    )
}