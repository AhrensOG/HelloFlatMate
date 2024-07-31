import { useRouter } from "next/navigation";
import Logout from "../../profile/Logout";
import ProfileCard from "../../profile/ProfileCard";
import ProfileInfo from "../../profile/ProfileInfo";
import ProfileServiceOptions from "../../user_service/ProfileServiceOptions";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ServiceProfile() {
  const [showInfo, setShowInfo] = useState(false);
  const route = useRouter();

  const handleRedirect = (url) => {
    route.push(url);
  };

  const handlerShowInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <main className="px-4 flex flex-col gap-4">
      <h1 className="pl-4 font-bold text-xl mt-4">Perfil de mantenimiento</h1>
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
            image={"/profile/service/service-profile.png"}
          />
          <ProfileServiceOptions />
          <Logout />
        </motion.div>
      ) : (
        <ProfileInfo action={handlerShowInfo} />
      )}
    </main>
  );
}
