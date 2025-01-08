import React from "react";
import HelloColivingPage from "./HelloColivingPage";
import Wrapper from "@/app/components/public/main-pages/Wrapper";

export const metadata = {
  title: "Coliving en Valencia | Habitaciones para estudiantes y jóvenes",
  description:
    "Descubre el coliving en Valencia con helloflatmate. Habitaciones privadas, zonas comunes y servicios incluidos en pisos compartidos. ¡Reserva ahora!",
};

export default function HelloColiving() {
  return (
    <Wrapper>
      <HelloColivingPage />
    </Wrapper>
  );
}
