import "../../../styles/notification.css"

export default function Notification() {
    return (
        <div className="notification-page w-screen h-screen flex flex-col justify-center items-center">
            <header className="notification-header w-full mt-10">
                <nav className="notification-nav w-full flex pl-3 items-center">
                    <button><img src="/back-light.svg"></img></button>
                    <h1 className="pl-5 text-xl font-bold text-black">Notificaciones</h1>
                </nav>
            </header>
            <main className="notification-main grow flex flex-col justify-center items-center gap-4">
                <img className="notification-icon" src="/notification-big-icon.svg"></img>
                <section className="notification-section text-center">
                    <h2 className="notification-title font-semibold">No tienes notificaciones ahora</h2>
                    <p className="notification-text pt-2 font-light">No tienes notificaciones aun, aqui se <br />
                        mostraran las<br />
                        notificaciones cuando tengas alguna.</p>
                </section>
            </main>
        </div>
    )
}