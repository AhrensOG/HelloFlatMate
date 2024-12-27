import React from "react";
import TransactionCard from "./TransactionCard";
import ShowTransactionHistory from "./ShowTransactionHistory";

const TransactionSection = ({ id }) => {
  return (
    <div className="w-full flex flex-col justify-center items-start pt-2">
      <h2 className="text-lg font-medium">Transacciones</h2>
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <ShowTransactionHistory
          tittle={"Historial"}
          location={""}
          link={`/pages/owner/my-tenants/transactions?id=${id}`}
        />
      </div>
    </div>
  );
};

export default TransactionSection;
