import { useRouter } from "next/navigation";
import EditButton from "../../admin/property_magnament/shared/EditButton";
import ItemInfo from "./profile_info/ItemInfo";
import ProfilePicture from "./ProfilePicture";
import { motion } from "framer-motion";

export default function ProfileInfo({
  action,
  image,
  name,
  lastName,
  email,
  data,
}) {
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-6 justify-center items-center w-full max-w-7xl mx-auto"
    >
      <div className="flex justify-between w-full px-4">
        <h4 className="text-[#000000CC] font-medium text-base self-start">
          Tu información de perfil
        </h4>
        <EditButton
          action={() => {
            router.push("/pages/user/profile/update_client");
          }}
        />
      </div>

      {/* Imagen de perfil */}
      <ProfilePicture image={image} />

      {/* Secciones en tarjetas */}
      <div className="w-full px-4 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1: Información Personal */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">
            Información Personal
          </h2>
          <ItemInfo title={"Nombres"} body={name} />
          <ItemInfo title={"Apellidos"} body={lastName} />
          <ItemInfo title={"Email"} body={email} />
        </div>

        {/* Tarjeta 2: Datos Personales */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">
            Datos Personales
          </h2>
          <ItemInfo
            title={"Fecha de Nacimiento"}
            body={new Date(data.birthDate).toLocaleDateString()}
          />
          <ItemInfo
            title={"Género"}
            body={data.genre === "MALE" ? "Masculino" : "Femenino"}
          />
          <ItemInfo title={"Número de Identificación"} body={data.idNum} />
        </div>

        {/* Tarjeta 3: Contacto */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">Contacto</h2>
          <ItemInfo title={"Número de Teléfono"} body={data.phone} />
        </div>

        {/* Tarjeta 4: Dirección */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">Dirección</h2>
          <ItemInfo title={"Ciudad"} body={data.city} />
          <ItemInfo title={"Calle"} body={data.street} />
          <ItemInfo title={"Número"} body={data.streetNumber} />
          <ItemInfo title={"Código Postal"} body={data.postalCode} />
        </div>

        {/* Tarjeta 5: Información de Emergencia */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">
            Información de Emergencia
          </h2>
          <ItemInfo title={"Nombre de Emergencia"} body={data.emergencyName} />
          <ItemInfo
            title={"Teléfono de Emergencia"}
            body={data.emergencyPhone}
          />
          <ItemInfo title={"Email de Emergencia"} body={data.emergencyEmail} />
        </div>
      </div>

      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
      >
        Volver
      </button>
    </motion.main>
  );
}
