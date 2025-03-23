import { useTranslations } from "next-intl";

export default function ChangePasswordModal({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    confirmPassword,
    setShowConfirmPassword,
    setConfirmPassword,
    showChangePasswordModal,
    setShowChangePasswordModal,
    handleSave,
}) {
    const t = useTranslations("user_profile.profile_info");
    return (
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
                    <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-2 top-2 text-sm text-gray-500">
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
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2 text-sm text-gray-500">
                        {showConfirmPassword ? t("modal_change_pass.show_off") : t("modal_change_pass.show_on")}
                    </button>
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={() => setShowChangePasswordModal(false)} className="text-gray-500">
                        {t("modal_change_pass.cancel")}
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                        {t("modal_change_pass.ok")}
                    </button>
                </div>
            </div>
        </div>
    );
}
