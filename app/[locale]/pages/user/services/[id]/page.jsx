"use client";
import Services from "@/app/components/user/history/services/Services";
import NavBar from "@/app/components/nav_bar/NavBar";
import BotIcon from "@/app/components/public/chat-bot/BotIcon";

export default function ServicesPage({ params }) {
    const { id } = params;
    return (
        <>
            <header className="px-2 relative">
                <BotIcon />
                <NavBar />
            </header>
            <Services id={id} />
        </>
    );
}
