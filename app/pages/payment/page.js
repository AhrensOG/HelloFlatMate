import NavBar from "@/app/components/nav_bar/NavBar";
import Reserve from "@/app/components/payment/Reserve";

export default function Payment() {
    return (
        <>
            <header className="w-full flex justify-between items-center h-[7vh] px-1.5 pt-1.5">
                <NavBar />
            </header>
            <main className="flex flex-col items-center">
                <Reserve />
            </main>
        </>
    )
}