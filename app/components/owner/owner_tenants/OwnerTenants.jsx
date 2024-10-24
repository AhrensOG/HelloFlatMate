import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import TenantCard from "./auxiliarComponents/TenantCard";
import Link from "next/link";

const OwnerTenants = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-screen-sm flex flex-col justify-start items-center p-4 space-y-6">
        <div className="w-full flex justify-start items-center gap-6">
          <Link href={"/pages/owner/"}>
            <ArrowLeftIcon className="size-6" />
          </Link>
          <h1 className="text-lg font-bold">Tus Inquilinos</h1>
        </div>
        <div className="w-full max-h-[75vh] max-w-80 flex flex-grow flex-col justify-start items-center gap-4 overflow-y-scroll scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 p-1">
          <TenantCard />
          <TenantCard />
          <TenantCard />
          <TenantCard />
        </div>
      </div>
    </section>
  );
};

export default OwnerTenants;
