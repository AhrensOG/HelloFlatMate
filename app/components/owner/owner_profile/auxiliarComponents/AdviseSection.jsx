import React from "react";
import AdviseButton from "./AdviseButton";

const AdviseSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start space-y-2">
      <h2 className="font-medium">Avisos</h2>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <AdviseButton link="/pages/supplies" />
        <AdviseButton
          link="/pages/admin/payments"
          currency={true}
          title="Pagos"
        />
      </div>
    </div>
  );
};

export default AdviseSection;
