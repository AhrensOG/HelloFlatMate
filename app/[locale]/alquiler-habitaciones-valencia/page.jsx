import React from "react";
import HelloRoomPage from "./HelloRoomPage";
import Wrapper from "@/app/components/public/main-pages/Wrapper";

export const metadata = {
  title:
    "Alquiler de habitaciones en Valencia para estudiantes | helloflatmate",
  description:
    "Encuentra el mejor alquiler de habitaciones en Valencia para estudiantes. Pisos compartidos, atención personalizada y ubicaciones ideales. ¡Reserva ya!",
};

export default function HelloRoom() {
  return (
    <Wrapper>
      <HelloRoomPage />
    </Wrapper>
  );
}
