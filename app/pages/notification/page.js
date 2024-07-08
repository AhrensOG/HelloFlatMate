import Image from "next/image"
import { plus_jakarta } from "@/font"

export default function Notification() {
    return (
        <div className={`${plus_jakarta.className} notification-page w-screen h-screen flex flex-col justify-center items-center`}>
            <header className="notification-header w-full mt-10">
                <nav className="notification-nav w-full flex pl-3 items-center">
                    <button><Image src="/back-light.svg" width={20} height={20} alt="Boton para volver" /></button>
                    <h1 className="pl-5 text-xl font-bold text-black">Notificaciones</h1>
                </nav>
            </header>
            <main className="notification-main grow flex flex-col justify-center items-center gap-4">
                <Image className="notification-icon" src="/notification-big-icon.svg" alt="Icono de Notificación Grande" width={100} height={100} />
                <section className="notification-section text-center text-base">
                    <h2 className="notification-title font-semibold text-black">No tienes notificaciones ahora</h2>
                    <p className="notification-text pt-2 font-light text-gris-español">No tienes notificaciones aún. Aquí se <br />
                        mostrarán las<br />
                        notificaciones cuando tengas alguna.</p>
                </section>
            </main>
        </div>
    )
}