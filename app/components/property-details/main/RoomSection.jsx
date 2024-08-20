import RoomInfo from "./room_section/RoomInfo";

export default function RoomSection({ data }) {
  return (
    <section className="flex flex-col gap-3 items-center w-full">
      <h2 className="font-bold text-[1.37rem] w-full text-start">
        Habitaciones
      </h2>
      <div className="flex justify-evenly gap-1 w-full overflow-x-auto">
        {data.map((item, index) => (
          <RoomInfo key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
}
