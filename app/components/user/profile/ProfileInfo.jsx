import { useRouter } from "next/navigation";
import EditButton from "../../admin/property_magnament/shared/EditButton";
import ItemInfo from "./profile_info/ItemInfo";
import ProfilePicture from "./ProfilePicture";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { auth } from "@/app/firebase/config";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useTranslations } from "next-intl";
import ChangePasswordModal from "./ChangePasswordModal";
import { changePassword } from "@/app/firebase/changePassword";

export default function ProfileInfo({ action, image, name, lastName, email, data }) {
    const router = useRouter();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const t = useTranslations("user_profile.profile_info");

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.info(t("pass_not_match"));
            return;
        }
        const toastId = toast.loading(t("loading.loading"));

        try {
            await changePassword(newPassword);
            toast.success(t("success.pass_changed"), {
                id: toastId,
            });

            setShowChangePasswordModal(false);
        } catch (error) {
            toast.error(
                error.code === "auth/wrong-password" || error.code === "auth/invalid-credential"
                    ? t("error.incorrect_pass")
                    : t("error.error_change_pass"),
                {
                    id: toastId,
                }
            );
        }
    };

    const handleModal = () => {
        const user = auth.currentUser;
        const provider = user.providerData[0]?.providerId;

        if (provider !== "password") {
            return toast.info("No puedes cambiar la contraseña de un usuario que se registró con Google o Facebook");
        }

        setShowChangePasswordModal(true);
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
                <h4 className="text-[#000000CC] font-medium text-base self-start">{t("h4_1")}</h4>
                <EditButton
                    action={() => {
                        router.push("/pages/user/profile/update_client");
                    }}
                />
            </div>

            {/* Imagen de perfil */}
            <ProfilePicture image={image} />
            <button onClick={handleModal} className="text-blue-500 font-medium">
                {t("btn_change_pass")}
            </button>

            {/* Secciones en tarjetas */}
            <div className="w-full px-4 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tarjeta 1: Información Personal */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-[#000000CC] font-bold text-lg mb-4">{t("targ_1.h2")}</h2>
                    <ItemInfo title={t("targ_1.name")} body={name} />
                    <ItemInfo title={t("targ_1.last_name")} body={lastName} />
                    <ItemInfo title={t("targ_1.email")} body={email} />
                </div>

                {/* Tarjeta 2: Datos Personales */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-[#000000CC] font-bold text-lg mb-4">{t("targ_2.h2")}</h2>
                    <ItemInfo title={t("targ_2.birthday")} body={new Date(data?.birthDate).toLocaleDateString()} />
                    <ItemInfo
                        title={t("targ_2.gender")}
                        body={data?.genre === "MALE" ? t("targ_2.male") : data?.genre === "FEMALE" ? t("targ_2.female") : t("targ_2.not_defined")}
                    />
                    <ItemInfo title={t("targ_2.dni")} body={data?.idNum} />
                </div>

                {/* Tarjeta 3: Contacto */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-[#000000CC] font-bold text-lg mb-4">{t("targ_3.h2")}</h2>
                    <ItemInfo title={t("targ_3.phone")} body={data?.phone} />
                </div>

                {/* Tarjeta 4: Dirección */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-[#000000CC] font-bold text-lg mb-4">{t("targ_4.h2")}</h2>
                    <ItemInfo title={t("targ_4.city")} body={data?.city} />
                    <ItemInfo title={t("targ_4.street")} body={data?.street} />
                    <ItemInfo title={t("targ_4.number")} body={data?.streetNumber} />
                    <ItemInfo title={t("targ_4.zip")} body={data?.postalCode} />
                </div>

                {/* Tarjeta 5: Información de Emergencia */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-[#000000CC] font-bold text-lg mb-4">{t("targ_5.h2")}</h2>
                    <ItemInfo title={t("targ_5.name")} body={data?.emergencyName} />
                    <ItemInfo title={t("targ_5.phone")} body={data?.emergencyPhone} />
                    <ItemInfo title={t("targ_5.email")} body={data?.emergencyEmail} />
                </div>
            </div>

            {/* Modal para cambiar contraseña */}
            {showChangePasswordModal && (
                <ChangePasswordModal
                    currentPassword={currentPassword}
                    setCurrentPassword={setCurrentPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    showCurrentPassword={showCurrentPassword}
                    setShowCurrentPassword={setShowCurrentPassword}
                    showNewPassword={showNewPassword}
                    setShowNewPassword={setShowNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    setShowChangePasswordModal={setShowChangePasswordModal}
                    handleSave={handleChangePassword}
                />
            )}
        </motion.main>
    );
}
