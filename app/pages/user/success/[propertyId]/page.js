"use client";
import ThankYou from "@/app/components/user/thank_you/ThankYou";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessPage = ({ params }) => {
  const router = useRouter();
  const propertyId = params.propertyId;
  return (
    <ThankYou
      title={"¡Felicitaciones!"}
      subTitle={"Gracias por confiar en HelloFLatMate"}
      body={
        "Completa tus datos y sube la documentación necesaria para que podamos confirmar tu reserva."
      }
      action={"Completar Información"}
      callback={() => router.push("/pages/user/contract/" + propertyId)}
    />
  );
};

export default SuccessPage;
