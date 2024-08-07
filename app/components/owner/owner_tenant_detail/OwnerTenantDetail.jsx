import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import ContactCard from "./auxiliarComponents/ContactCard";
import StaySection from "./auxiliarComponents/StaySection";
import TransactionSection from "./auxiliarComponents/TransactionSection";
import { toast } from "sonner";

const OwnerTenantDetail = () => {
  return (
    <section className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-full max-w-screen-sm flex flex-col justify-center items-center p-4 space-y-4">
        <div className="w-full flex justify-start items-center gap-6">
          <Link href={"/pages/owner/my-tenants"}>
            <ArrowLeftIcon className="size-6" />
          </Link>
        </div>
        <div className="w-full divide-y divide-slate-300 space-y-2">
          <ContactCard />
          <StaySection />
        </div>
        <TransactionSection />
        <button onClick={() => toast.info("¡Link de pago copiado!")} className="w-full p-3 text-lg text-white bg-resolution-blue rounded-lg">Solicitar Pago</button>
      </div>
    </section>
  );
};

export default OwnerTenantDetail;
