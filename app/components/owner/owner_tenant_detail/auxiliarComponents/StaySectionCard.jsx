import React from "react";

const StaySectionCard = ({ title = "Llegada", date = "06/09/2024" }) => {
  return (
    <div className="min-w-20 flex flex-col justify-center items-center p-2 shadow-profile shadow-black/20 rounded-lg gap-1">
      <h3 className="font-medium text-sm">{title}</h3>
      <span className="text-xs">{date}</span>
    </div>
  );
};

export default StaySectionCard;
