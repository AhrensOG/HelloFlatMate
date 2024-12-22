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

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        const toastId = toast.loading(t("loading.loading"));

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
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
            <button onClick={() => setShowChangePasswordModal(true)} className="text-blue-500 font-medium">
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-md">
                        <h2 className="text-lg font-bold mb-4">{t("modal_change_pass.title")}</h2>

                        {/* Contraseña actual */}
                        <div className="relative mb-4">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder={t("modal_change_pass.label_old_pass")}
                                className="border p-2 w-full"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <button
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-2 top-2 text-sm text-gray-500"
                            >
                                {showCurrentPassword ? t("modal_change_pass.show_off") : t("modal_change_pass.show_on")}
                            </button>
                        </div>

                        {/* Nueva contraseña */}
                        <div className="relative mb-4">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder={t("modal_change_pass.label_new_pass")}
                                className="border p-2 w-full"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2 top-2 text-sm text-gray-500">
                                {showNewPassword ? t("modal_change_pass.show_off") : t("modal_change_pass.show_on")}
                            </button>
                        </div>

                        {/* Confirmar nueva contraseña */}
                        <div className="relative mb-4">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder={t("modal_change_pass.conf_pass")}
                                className="border p-2 w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 text-sm text-gray-500"
                            >
                                {showConfirmPassword ? t("modal_change_pass.show_off") : t("modal_change_pass.show_on")}
                            </button>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button onClick={() => setShowChangePasswordModal(false)} className="text-gray-500">
                                {t("modal_change_pass.cancel")}
                            </button>
                            <button onClick={handleChangePassword} className="bg-blue-500 text-white px-4 py-2 rounded">
                                {t("modal_change_pass.ok")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.main>
    );
}
