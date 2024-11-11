import React from "react";

const StaySectionCard = ({ title = "Llegada", date = "06/09/2024" }) => {
  return (
    <div className="min-w-20 max-w-40 w-full flex flex-col justify-center items-center p-2 shadow-profile shadow-black/20 rounded-lg gap-1">
      <h3 className="font-medium text-sm sm:text-lg">{title}</h3>
      <span className="text-xs sm:text-sm">{date}</span>
    </div>
  );
};

export default StaySectionCard;
