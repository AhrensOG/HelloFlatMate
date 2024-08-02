import MoreInfoItemTemplate from "./more_info_section/MoreInfoItemTemplate";

export default function MoreInfoSectionTemplate() {
  return (
    <section>
      <h2 className="font-bold text-[1.37rem]">Mas sobre este lugar</h2>
      <MoreInfoItemTemplate title={"Condicion del alquiler"} />
      <MoreInfoItemTemplate title={"Habitacion"} />
      <MoreInfoItemTemplate title={"Facturas"} />
      <MoreInfoItemTemplate title={"Mantenimiento"} />
      <MoreInfoItemTemplate title={"Sobre nuestra cocina"} />
      <MoreInfoItemTemplate title={"Normas de convivencia"} />
      <MoreInfoItemTemplate title={"Check-in"} />
      <MoreInfoItemTemplate title={"Check-out"} />
    </section>
  );
}
