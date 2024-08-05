import EditButton from "../../shared/EditButton";
import RoomInfoTemplate from "./room_section/RoomInfoTemplate";

export default function RoomSectionTemplate({
  data,
  setData,
  showModal,
  action,
}) {
  return (
    <section className="flex flex-col gap-3 items-center w-full">
      <article className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[1.37rem] w-full text-start">
          Habitaciones
        </h2>
        <EditButton action={showModal} />
      </article>
      <article className="flex justify-evenly gap-1 w-full">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <RoomInfoTemplate
              key={index}
              img={item?.image || "/property-details/stock-1.svg"}
              name={item.name}
              bedNumber={item.numberBeds}
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
