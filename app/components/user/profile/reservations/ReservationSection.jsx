import { plus_jakarta } from "@/font";
import React from "react";
import TitleAdminPanel from "../../../admin/shared/TitleAdminPanel";
import PropertyCard from "../../property/PropertyCard";

const ReservationSection = ({ data = false, leaseOrdersList = false }) => {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center items-center p-2 gap-4`}
    >
      <TitleAdminPanel title={"Mis Reservas"} />
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
          return <PropertyCard key={l.id} property={l.property || l.leaseOrderRoomRoom} leaseOrder={l} />;
        })
      ) : (
        <span className="text-lg font-bold text-slate-300 py-10">
          Aun no tienes reservas
        </span>
      )}
    </main>
  );
};

export default ReservationSection;
