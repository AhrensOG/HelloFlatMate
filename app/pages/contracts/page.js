"use client";
import ContractForm from "@/app/components/contracts/ContractForm";
import NavBar from "@/app/components/nav_bar/NavBar";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Toaster } from "sonner";
import Head from "next/head";

const ContractsPage = () => {
  return (
    <div>
      <Head>
        <title>Contrato de Renta - HelloFlatMate</title>
        <meta
          name="description"
          content="Complete el formulario para el contrato de renta y reserve su lugar."
        />
      </Head>
      <Toaster richColors={true} duration={3000} />
      <header className="space-y-8">
        <NavBar />
        <div className="w-full grid place-items-center">
          <div className="px-2 flex w-full justify-center items-center gap-2 max-w-screen-sm">
            <ArrowLeftIcon className="size-6 text-black/70" />
            <h1 className="w-full text-center font-bold text-lg">
              Contrato de renta
            </h1>
          </div>
        </div>
      </header>
      <main>
        <ContractForm />
      </main>
    </div>
  );
};

export default ContractsPage;
