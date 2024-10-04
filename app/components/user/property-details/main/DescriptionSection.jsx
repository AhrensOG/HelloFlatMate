import DescriptionItem from "./description_section/DescriptionItem";

export default function DescriptionSection({
  data,
  title = "Descripción",
  category = "HELLO_STUDIO",
}) {
  // Función para manejar el parseo si es necesario
  const parseDescription = (item) => {
    try {
      // Si es HELLO_ROOM o HELLO_COLIVING, parseamos el JSON
      if (category === "HELLO_ROOM" || category === "HELLO_COLIVING") {
        return item;
      }
      // Si no es necesario parsear, simplemente devolvemos el item
      return item;
    } catch (error) {
      console.error("Error al parsear la descripción:", error);
      return item; // En caso de error, devolver el item tal como está
    }
  };

  return (
    <section>
      <h2 className="font-bold text-[1.37rem]">{title}</h2>
      <ul className="list-disc p-3 pl-[1.6rem]">
        {data.map((item, index) => (
          <DescriptionItem key={index} body={parseDescription(item)} />
        ))}
      </ul>
    </section>
  );
}
