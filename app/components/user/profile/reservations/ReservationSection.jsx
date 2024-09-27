import { plus_jakarta } from "@/font";
import React from "react";
import TitleAdminPanel from "../../../admin/shared/TitleAdminPanel";
import ReservationPropertyCard from "./ReservationPropertyCard";

const ReservationSection = ({ data = false, leaseOrdersList = false }) => {
  return (
    <main
      className={`${plus_jakarta.className} w-full flex flex-col justify-center items-center p-2`}
    >
      <div className="w-full max-w-screen-lg flex flex-col justify-center items-center gap-4">
        <TitleAdminPanel title={"Mis Reservas"} />
        <div className="flex flex-col justify-center items-center gap-4 sm:flex-row w-full sm:justify-start sm:flex-wrap max-w-screen-lg">
          {leaseOrdersList !== false && leaseOrdersList.length > 0 ? (
            leaseOrdersList.map((l) => {
              const date = new Date(l.date);
              const readableDate = date.toLocaleString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const body =
                l?.status === "PENDING"
                  ? "Sube la informacion y documentación necesaria para que podamos aprobar tu solicitud de renta."
                  : l?.status === "APPROVED"
                  ? "¡Tu solicitud fue aprovada!"
                  : "";
              const status =
                l?.status === "PENDING"
                  ? "RESERVED"
                  : l?.status === "APPROVED"
                  ? "OCCUPIED"
                  : null;
              const id = l.id;
              console.log(l);
              return (
                <ReservationPropertyCard
                  key={l.id}
                  property={l.property || l.leaseOrderRoomRoom}
                  leaseOrder={l}
                />
              );
            })
          ) : (
            <span className="text-lg font-bold text-slate-300 py-10">
              Aun no tienes reservas
            </span>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReservationSection;
