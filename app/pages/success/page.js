"use client";
import ThankYou from "@/app/components/thank_you/ThankYou";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <ThankYou
      title={"¡Felicitaciones!"}
      subTitle={"Gracias por confiar en HelloFLatMate"}
      body={
        "Completa tus datos y sube la documentación necesaria para que podamos confirmar tu reserva."
      }
      action={"Completar Información"}
      callback={() => router.push("/pages/contract")}
    />
  );
};

export default SuccessPage;
