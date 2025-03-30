import React from "react";
import StaySectionCard from "./StaySectionCard";
import { useTranslations } from "next-intl";

const StaySection = ({ tenant }) => {
    const t = useTranslations("owner_panel.owner_tenant_detail.auxiliar_comp.stay_sec");
    const parseDate = (dateInput) => {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            return "-";
        }
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const calculateContractDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validamos si ambas fechas son válidas
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return t("nan");
        }

        // Calculamos la diferencia en meses
        const yearsDiff = end.getFullYear() - start.getFullYear();
        const monthsDiff = end.getMonth() - start.getMonth() + 1;
        const totalMonths = yearsDiff * 12 + monthsDiff;

        return totalMonths >= 0 ? totalMonths : "-";
    };

    return (
        <div className="w-full flex flex-col justify-center items-center gap-2 pt-2">
            <h2 className="text-lg font-medium">{t("h2")}</h2>
            <div className="w-full flex justify-evenly items-center">
                <StaySectionCard title={t("t_1")} date={parseDate(tenant.startDate)} />
                <StaySectionCard title={t("t_2")} date={parseDate(tenant.endDate)} />
                <StaySectionCard title={t("t_3")} date={`${calculateContractDuration(tenant.startDate, tenant.endDate)} ${t("months")}`} />
            </div>
        </div>
    );
};

export default StaySection;
