import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const ShowTransactionHistory = ({ tittle, location, link = "/pages/owner/my-tenants/detail/transactions" }) => {
    const t = useTranslations("owner_panel.owner_tenant_detail.auxiliar_comp.show_trans_hist");
    return (
        <section className="w-full flex items-center justify-around gap-3 m-2">
            <div className="h-12 w-12 rounded-full bg-[#21ABCC4D] flex items-center justify-center text-[#0E155F]">
                <CurrencyEuroIcon className="h-10 w-10" />
            </div>
            <div className="grow flex flex-col gap-1 justify-center h-11 ">
                <h2 className="text-base">{tittle}</h2>
                <p className="text-sm text-[#A5A2A1]">{location}</p>
            </div>
            <div>
                <Link href={link}>
                    <button className="p-1 px-7 border border-resolution-blue text-sm text-resolution-blue rounded-lg">{t("show")}</button>
                </Link>
            </div>
        </section>
    );
};

export default ShowTransactionHistory;
