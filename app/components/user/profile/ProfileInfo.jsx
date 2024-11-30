import { useRouter } from "next/navigation";
import EditButton from "../../admin/property_magnament/shared/EditButton";
import ItemInfo from "./profile_info/ItemInfo";
import ProfilePicture from "./ProfilePicture";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { auth } from "@/app/firebase/config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export default function ProfileInfo({
  action,
  image,
  name,
  lastName,
  email,
  data,
}) {
  const router = useRouter();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.info("Las contraseñas no coinciden");
      return;
    }

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    const toastId = toast.loading("Cambiando contraseña...");

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success("Contraseña cambiada exitosamente", {
        id: toastId,
      });

      setShowChangePasswordModal(false);
    } catch (error) {
      toast.error(
        error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
          ? "La contraseña actual es incorrecta"
          : "Ocurrió un error al cambiar la contraseña",
        {
          id: toastId,
        }
      );
    }
  };

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
      <button
        onClick={() => setShowChangePasswordModal(true)}
        className="text-blue-500 font-medium"
      >
        Cambiar contraseña
      </button>

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
            body={new Date(data?.birthDate).toLocaleDateString()}
          />
          <ItemInfo
            title={"Género"}
            body={
              data?.genre === "MALE"
                ? "Masculino"
                : data?.genre === "FEMALE"
                ? "Femenino"
                : "No definido"
            }
          />
          <ItemInfo title={"Número de Identificación"} body={data?.idNum} />
        </div>

        {/* Tarjeta 3: Contacto */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">Contacto</h2>
          <ItemInfo title={"Número de Teléfono"} body={data?.phone} />
        </div>

        {/* Tarjeta 4: Dirección */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">Dirección</h2>
          <ItemInfo title={"Ciudad"} body={data?.city} />
          <ItemInfo title={"Calle"} body={data?.street} />
          <ItemInfo title={"Número"} body={data?.streetNumber} />
          <ItemInfo title={"Código Postal"} body={data?.postalCode} />
        </div>

        {/* Tarjeta 5: Información de Emergencia */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-[#000000CC] font-bold text-lg mb-4">
            Información de Emergencia
          </h2>
          <ItemInfo title={"Nombre de Emergencia"} body={data?.emergencyName} />
          <ItemInfo
            title={"Teléfono de Emergencia"}
            body={data?.emergencyPhone}
          />
          <ItemInfo title={"Email de Emergencia"} body={data?.emergencyEmail} />
        </div>
      </div>

      {/* Modal para cambiar contraseña */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-md">
            <h2 className="text-lg font-bold mb-4">Cambiar Contraseña</h2>

            {/* Contraseña actual */}
            <div className="relative mb-4">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Contraseña actual"
                className="border p-2 w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-2 text-sm text-gray-500"
              >
                {showCurrentPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {/* Nueva contraseña */}
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                className="border p-2 w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-2 text-sm text-gray-500"
              >
                {showNewPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {/* Confirmar nueva contraseña */}
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar nueva contraseña"
                className="border p-2 w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-sm text-gray-500"
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangePassword}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Cambiar
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.main>
  );
}
