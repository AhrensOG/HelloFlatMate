import React from "react";

const Wallet = () => {
    const t = useTranslations("owner_panel.wallet");
    return (
        <div className="bg-[#21ABCC1A] p-2 rounded-3xl flex flex-col justify-center items-center py-6 gap-3 shadow-profile shadow-black/30">
            <div>
                <span className="font-light">{t("span_1")}</span>
                <span className="text-[#0C1660] text-log font-bold">$5046.57</span>
            </div>
            <div>
                <span className="font-light">{t("span_2")}</span>
                <span className="text-[#0C1660] text-log font-bold">24</span>
            </div>
        </div>
    );
};

export default Wallet;
