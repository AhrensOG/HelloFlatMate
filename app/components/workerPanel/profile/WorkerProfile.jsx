import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProfileCard from "../../user/profile/ProfileCard";
import Logout from "../../user/profile/Logout";
import ProfileWorkerOptions from "./ProfileWorkerOptions";

export default function WorkerProfile() {
  const route = useRouter();

  const handleRedirect = (url) => {
    route.push(url);
  };

  return (
    <main className="px-4 flex flex-col gap-4">
      <h1 className="pl-4 font-bold text-xl mt-4">Perfil de mantenimiento</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <ProfileCard
          name="Usuario"
          email="Correo@gmail.com"
          action={() => {
            handleRedirect("/pages/user/profile/service/info");
          }}
          image={"/profile/service/service-profile.png"}
        />
        <ProfileWorkerOptions />
        <Logout />
      </motion.div>
    </main>
  );
}
