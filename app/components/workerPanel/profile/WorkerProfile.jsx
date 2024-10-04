import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProfileCard from "../../user/profile/ProfileCard";
import Logout from "../../user/profile/Logout";
import ProfileWorkerOptions from "./ProfileWorkerOptions";
import BottomNavBar from "../bottomNavBar/BottomNavBar";
import { plus_jakarta } from "@/font";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import { Context } from "@/app/context/GlobalContext";
import { Suspense, useContext, useEffect, useState } from "react";

export default function WorkerProfile({ section }) {
  const route = useRouter();
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state?.user || null);

  const handleRedirect = (url) => {
    route.push(url);
  };

  useEffect(() => {
    setUser(state?.user || null);
  }, [state?.user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`${plus_jakarta.className} flex flex-col h-screen`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header>
          <UserSerivceNavBar />
        </header>
        <main className="px-4 flex flex-col gap-4 flex-grow lg:w-[30rem] self-center">
          <h1 className="pl-4 font-bold text-xl mt-4">
            Perfil de mantenimiento
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProfileCard
              name={user.name + " " + user.lastName}
              email={user.email}
              action={() => {
                handleRedirect("/pages/user/profile/service/info");
              }}
              image={user.profilePicture || "/profile/profile.jfif"}
            />
            <ProfileWorkerOptions />
            <Logout />
          </motion.div>
        </main>
        <footer>
          <BottomNavBar section={section} />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
