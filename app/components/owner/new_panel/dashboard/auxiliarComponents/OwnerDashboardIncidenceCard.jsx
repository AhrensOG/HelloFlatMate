import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";
import { useTranslations } from "next-intl";
import React from "react";

const OwnerDashboardIncidenceCard = ({ inc }) => {
  const t = useTranslations("owner_panel.dashboard");

  const incidentLabels = {
    incidentSite: {
      LIVING_ROOM: "Sala de estar",
      KITCHEN: "Cocina",
      BATHROOM: "Baño",
      BEDROOM: "Habitación",
      OTHER: "Otro",
    },
    incidentType: {
      ELECTRICITY: "Electricidad",
      PLUMBING: "Fontanería",
      CARPENTRY: "Carpintería",
      APPLIANCE: "Electrodomésticos",
      OTHER: "Otro",
    },
  };
  console.log(inc);
  const site =
    incidentLabels.incidentSite[inc?.toDo?.incidentSite] ||
    inc?.toDo?.incidentSite;
  const type =
    incidentLabels.incidentType[inc?.toDo?.incidentType] ||
    inc?.toDo?.incidentType;
  return (
    <div className="mt-2 bg-white p-3 rounded border text-sm">
      <p>
        <strong>{t("p_4")}:</strong> {inc.title}
      </p>
      <p>
        <strong>{t("p_6")}:</strong> {formatDateToDDMMYYYY(inc.date)}
      </p>
      <p>
        <strong>{t("p_7")}:</strong> -{inc.amount.toFixed(2)} €
      </p>
      {inc?.toDo && (
        <>
          <p>
            <strong>{t("requested_by")}:</strong> {inc.toDo.client?.name}{" "}
            {inc.toDo.client?.lastName}
          </p>
          <p>
            <strong>{t("responsibility")}:</strong>{" "}
            {t(inc.toDo.responsibility.toLowerCase())}
          </p>
          <p>
            <strong>{t("location")}:</strong> {site}
          </p>
          <p>
            <strong>{t("repair_type")}:</strong> {type}
          </p>
        </>
      )}
      {inc.url && (
        <a
          href={inc.url}
          target="_blank"
          className="text-blue-500 text-xs underline">
          {t("view_bill")}
        </a>
      )}
    </div>
  );
};

export default OwnerDashboardIncidenceCard;
