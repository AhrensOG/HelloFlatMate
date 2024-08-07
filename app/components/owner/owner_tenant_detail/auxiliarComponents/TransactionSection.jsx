import React from "react";
import TransactionCard from "./TransactionCard";
import ShowTransactionHistory from "./ShowTransactionHistory";

const TransactionSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start pt-2">
      <h2 className="text-lg font-medium">Transacciones</h2>
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <TransactionCard
          tittle={"Pagos Recibidos"}
          price={400}
          date={"2 de Agosto"}
          location={"Villa Edén"}
        />
        <TransactionCard
          tittle={"Pago de Suministros"}
          price={35}
          date={"2 de Agosto"}
          location={"Villa Edén"}
        />
        <ShowTransactionHistory
          tittle={"Historial de pagos"}
          location={"Villa Edén"}
        />
      </div>
    </div>
  );
};

export default TransactionSection;
