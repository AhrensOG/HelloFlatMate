import React from "react";
import TitleAdminPanel from "../../../admin/shared/TitleAdminPanel";
import ReservationPropertyCard from "./ReservationPropertyCard";

const ReservationSection = ({ data = false, leaseOrdersList = false }) => {
  return (
    <main
      className={`  grow w-full flex flex-col justify-center items-center p-2`}
    >
      <div className="h-full w-full max-w-screen-xl flex flex-col items-center gap-4">
        <TitleAdminPanel title={"Mis Reservas"} />
        <div className="flex flex-col justify-start items-center gap-4 sm:flex-row w-full sm:justify-start sm:flex-wrap sm:items-stretch max-w-screen-lg">
          {leaseOrdersList !== false && leaseOrdersList.length > 0 ? (
            leaseOrdersList
              .filter((l) => l.status !== "REJECTED") // Filtrar las órdenes con estado "REJECTED"
              .map((l) => {
                console.log(l);
                // Construir una clave única concatenando el tipo y el ID
                const uniqueKey = `${l.property ? "property" : "room"}-${l.id}`;
                return (
                  <ReservationPropertyCard
                    user={data}
                    key={uniqueKey}
                    property={l.property || l.room}
                    leaseOrder={l}
                  />
                );
              })
          ) : (
            <div className="grid place-items-center w-full h-full">
              <span className="text-lg font-bold text-slate-300 py-10">
                Aun no tienes reservas
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReservationSection;
