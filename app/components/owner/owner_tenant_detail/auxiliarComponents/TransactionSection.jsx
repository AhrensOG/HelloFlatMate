import React from "react";
import TransactionCard from "./TransactionCard";
import ShowTransactionHistory from "./ShowTransactionHistory";
import { useTranslations } from "next-intl";

const TransactionSection = ({ id }) => {
    const t = useTranslations("owner_panel.owner_tenant_detail.auxiliar_comp.trans_sec");
    return (
        <div className="w-full flex flex-col justify-center items-start pt-2">
            <h2 className="text-lg font-medium">{t("title")}</h2>
            <div className="w-full flex flex-col justify-start items-center gap-2">
                <ShowTransactionHistory tittle={t("t_1")} location={""} link={`/pages/owner/my-tenants/transactions?id=${id}`} />
            </div>
        </div>
    );
};

export default TransactionSection;
