import React from "react";

const OwnerDashboardPaymentCard = ({ entry, t }) => {
  return (
    <div className="bg-white p-3 rounded border text-sm">
      <p>
        <strong>{t("p_3")}:</strong> {entry.clientName}
      </p>
      <p>
        <strong>{t("p_4")}:</strong> {entry.concept}
      </p>
      <p>
        <strong>{t("p_6")}:</strong> {entry.date}
      </p>
      <p>
        <strong>{t("p_7")}:</strong> {entry.amount.toFixed(2)} €
      </p>
    </div>
  );
};

export default OwnerDashboardPaymentCard;
