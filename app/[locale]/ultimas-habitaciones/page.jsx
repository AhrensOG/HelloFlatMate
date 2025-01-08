import React from "react";
import LastRoomsPage from "./LastRoomPage";
import Wrapper from "@/app/components/public/main-pages/Wrapper";

export const metadata = {
  title: "Últimas habitaciones en alquiler en Valencia | helloflatmate",
  description:
    "Descubre las últimas habitaciones en alquiler en Valencia. Pisos compartidos modernos, servicios incluidos y atención personalizada. ¡Reserva ahora antes de que se agoten!",
};

export default function LastRooms() {
  return (
    <Wrapper>
      <LastRoomsPage />
    </Wrapper>
  );
}
