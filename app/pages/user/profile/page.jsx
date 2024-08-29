"use client";
import Logout from "@/app/components/user/profile/Logout";
import NavBarProfile from "@/app/components/user/profile/NavBarProfile";
import ProfileCard from "@/app/components/user/profile/ProfileCard";
import ProfileOptions from "@/app/components/user/profile/ProfileOptions";
import { plus_jakarta } from "@/font";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileInfo from "@/app/components/user/profile/ProfileInfo";
import { useRouter } from "next/navigation";

export default function Profile() {
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
      <div className={`${plus_jakarta.className}`}>
        <header className="px-2">
          <NavBarProfile action={!showInfo ? null : handlerShowInfo} />
        </header>
        <main className="px-4 flex flex-col gap-4">
          <h1 className="pl-4 font-bold text-xl mt-4">Mi Perfil</h1>
          {!showInfo ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProfileCard
                name="Usuario"
                email="Correo@gmail.com"
                action={handlerShowInfo}
              />
              <ProfileOptions />
              <Logout />
            </motion.div>
          ) : (
            <ProfileInfo action={handlerShowInfo} />
          )}
        </main>
      </div>
    </AnimatePresence>
  );
}
