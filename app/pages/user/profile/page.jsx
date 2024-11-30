"use client";
import Logout from "@/app/components/user/profile/Logout";
import NavBarProfile from "@/app/components/user/profile/NavBarProfile";
import ProfileCard from "@/app/components/user/profile/ProfileCard";
import ProfileOptions from "@/app/components/user/profile/ProfileOptions";
 
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileInfo from "@/app/components/user/profile/ProfileInfo";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import NavBar from "@/app/components/nav_bar/NavBar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import BotIcon from "@/app/components/public/chat-bot/BotIcon";

export default function Profile() {
    const { state } = useContext(Context);
    const [showInfo, setShowInfo] = useState(false);
    const route = useRouter();

    const handleRedirect = (url) => {
        route.push(url);
    };

    const handlerShowInfo = () => {
        setShowInfo(!showInfo);
    };

    return (
        <AnimatePresence>
            <div className={`  relative`}>
                <BotIcon />
                <header>
                    <NavBar />
                </header>
                <div className="w-full flex justify-center items-center p-6">
                    <div className="w-full max-w-screen-xl flex items-center justify-center relative">
                        <button
                            onClick={showInfo ? () => handlerShowInfo() : () => route.back()}
                            type="button"
                            className="w-6 h-6 opacity-90 ml-4 absolute left-0"
                        >
                            <ArrowLeftIcon />
                        </button>
                        <h1 className="text-xl font-bold">Mi perfil</h1>
                    </div>
                </div>
                <main className="w-full flex justify-center items-start">
                    <div className="px-4 flex flex-col gap-4 w-full max-w-screen-lg">
                        {/* <h1 className="pl-4 font-bold text-xl mt-4"></h1> */}
                        {!showInfo ? (
                            <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                                <ProfileCard
                                    image={state?.user?.profilePicture || "/profile/profile.svg"}
                                    name={state?.user?.name || "Usuario"}
                                    email={state?.user?.email || "Correo@gmail.com"}
                                    action={handlerShowInfo}
                                />
                                {/* <ProfileOptions /> */}
                                <Logout />
                            </motion.div>
                        ) : (
                            <ProfileInfo
                                image={state?.user?.profilePicture || "/profile/profile.svg"}
                                name={state?.user?.name || "Usuario"}
                                lastName={state?.user?.lastName || "Usuario"}
                                email={state?.user?.email || "Correo@gmail.com"}
                                action={handlerShowInfo}
                                data={state?.user}
                            />
                        )}
                    </div>
                </main>
            </div>
        </AnimatePresence>
    );
}
