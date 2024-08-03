import EditButton from "../../shared/EditButton";
import RoomInfoTemplate from "./room_section/RoomInfoTemplate";

export default function RoomSectionTemplate({ data }) {
  return (
    <section className="flex flex-col gap-3 items-center w-full">
      <article className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[1.37rem] w-full text-start">
          Habitaciones
        </h2>
        <EditButton />
      </article>
      <article className="flex justify-evenly gap-1 w-full">
        {data ? (
          data.map((item, index) => (
            <RoomInfoTemplate
              key={index}
              data={item}
              room={`Habitacion ${" "} ${index + 1}`}
              bed={`${index + 1}${" "} Cama`}
            />
          ))
        ) : (
          <>
            <RoomInfoTemplate />
            <RoomInfoTemplate />
          </>
        )}
      </article>
    </section>
  );
}
