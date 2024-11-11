import Link from "next/link";
import React from "react";
import ContactCard from "./auxiliarComponents/ContactCard";
import StaySection from "./auxiliarComponents/StaySection";
import TransactionSection from "./auxiliarComponents/TransactionSection";
import { toast } from "sonner";
import TitleAdminPanel from "../../admin/shared/TitleAdminPanel";

const OwnerTenantDetail = ({ tenant, action }) => {
  console.log(tenant);
  return (
    <section className="w-full flex flex-col justify-start items-center">
      <div className="w-full max-w-screen-xl flex flex-col justify-center items-center p-4 space-y-4">
        <div className="w-full flex justify-start items-center gap-6">
          <TitleAdminPanel title={"Detalle"} action={action} />
        </div>
        <div className="w-full divide-y divide-slate-300 space-y-2">
          <ContactCard
            name={`${tenant.name} ${tenant.lastName ? tenant.lastName : ""}`}
            location={`${tenant.street} ${tenant.streetNumber}, ${tenant.city} `}
            image={
              tenant.profilePicture === "" || !tenant.profilePicture
                ? "/profile/profile.png"
                : tenant.profilePicture
            }
            email={tenant.email}
            phoneNumber={tenant.phoneNumber || false}
          />
          <StaySection tenant={tenant} />
        </div>
        <TransactionSection />
        <button
          onClick={() => toast.info("¡Link de pago copiado!")}
          className="w-full p-3 text-lg text-white bg-resolution-blue rounded-lg"
        >
          Solicitar Pago
        </button>
      </div>
    </section>
  );
};

export default OwnerTenantDetail;
