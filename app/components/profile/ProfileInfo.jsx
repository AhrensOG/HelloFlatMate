import ItemInfo from "./profile_info/ItemInfo";
import ProfilePicture from "./ProfilePicture";
import { motion } from "framer-motion";

export default function ProfileInfo({ action }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-4 justify-center items-center "
    >
      <h4 className="text-[#000000CC] font-medium text-base self-start pl-3">
        Tu informacion de perfil
      </h4>
      <ProfilePicture />
      <div className="flex flex-col gap-2 w-full px-3 mt-4">
        <h2 className="text-[#000000CC] font-bold text-lg">Nombre completo</h2>
        <ItemInfo title={"Nombres"} body={"Usuario"} />
        <ItemInfo title={"Apellidos"} body={"helloflatmate"} />
      </div>
      <div className="flex flex-col gap-2 w-full px-3">
        <h2 className="text-[#000000CC] font-bold text-lg">
          Correo de contacto
        </h2>
        <ItemInfo title={"Email"} body={"Usuariodehelloflatmate@gmail.com"} />
      </div>
    </motion.main>
  );
}
