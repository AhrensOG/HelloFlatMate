import RoomInfo from "./room_section/RoomInfo";

export default function RoomSection({ data }) {
  console.log(data);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-[1.37rem]">Habitaciones</h2>
      <div className="flex gap-3">
        {data.map((item, index) => (
          <RoomInfo
            key={index}
            title={item.name}
            info={item.numberBeds}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}
