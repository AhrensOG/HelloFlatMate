import React from "react";
import AdviseButton from "./AdviseButton";
import { useTranslations } from "next-intl";

const AdviseSection = () => {
    const t = useTranslations("owner_panel.profile.advise_btn");
    return (
        <div className="w-full flex flex-col justify-center items-start space-y-2">
            <h2 className="font-medium">Avisos</h2>
            <div className="w-full flex flex-col justify-center items-center gap-5">
                <AdviseButton link="/pages/user/supplies" />
                <AdviseButton link="/pages/admin/payments" currency={true} title={t("t_1")} />
            </div>
        </div>
    );
};

export default AdviseSection;
