import React from "react";
import StaySectionCard from "./StaySectionCard";

const StaySection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 pt-2">
      <h2 className="text-lg font-medium">Estadía</h2>
      <div className="w-full flex justify-evenly items-center">
        <StaySectionCard />
        <StaySectionCard title="Retirada" date="06/08/2025" />
        <StaySectionCard title="Contrato" date="11 Meses" />
      </div>
    </div>
  );
};

export default StaySection;
