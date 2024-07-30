import { useState } from "react";
import MoreInfoItem from "./more_info_section/MoreInfoItem";
import rentalCondition from "./more_info_section/texts";

export default function MoreInfoSection() {
  const [info, setInfo] = useState("");

  const handleSetInfo = (info) => {
    setInfo(info);
  };
  return (
    <section>
      <h2 className="font-bold text-[1.37rem]">Mas sobre este lugar</h2>
      <MoreInfoItem
        title={"Condicion del alquiler"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Habitación"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Facturas"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Mantenimiento"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Sobre nuestra cocina"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Normas de convivencia"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Check in"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Check out"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Nuestro barrio"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Otros servicios"}
        body={rentalCondition}
        action={handleSetInfo}
      />
      <MoreInfoItem
        title={"Opiniones del agente"}
        body={rentalCondition}
        action={handleSetInfo}
      />
    </section>
  );
}
