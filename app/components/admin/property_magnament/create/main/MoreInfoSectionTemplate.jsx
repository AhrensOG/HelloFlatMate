import MoreInfoItemTemplate from "./more_info_section/MoreInfoItemTemplate";

export default function MoreInfoSectionTemplate({ data, setData }) {
  const handleBodyChange = (property, newBody) => {
    // Crea una copia del objeto data
    const updatedData = { ...data, [property]: newBody };

    // Actualiza el estado con los nuevos datos
    setData(updatedData);
  };

  return (
    <section>
      <h2 className="font-bold text-[1.2rem]">Más sobre este lugar</h2>
      <div className="lg:flex lg:flex-wrap">
        <MoreInfoItemTemplate
          property="habitacion"
          title="Características del piso"
          body={data.habitacion}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="condicionDeRenta"
          title="Condiciónes del alquiler"
          body={data.condicionDeRenta}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="facturas"
          title="Facturas"
          body={data.facturas}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="mantenimiento"
          title="Mantenimiento"
          body={data.mantenimiento}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="checkIn"
          title="Check-in / Check-out"
          body={data.checkIn}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="sobreNosotros"
          title="Opinión del agente"
          body={data.sobreNosotros}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="normasDeConvivencia"
          title="Normas de convivencia"
          body={data.normasDeConvivencia}
          onBodyChange={handleBodyChange}
        />
        <MoreInfoItemTemplate
          property="checkOut"
          title="Otros servicios"
          body={data.checkOut}
          onBodyChange={handleBodyChange}
        />
      </div>
    </section>
  );
}
