import MyBedroomCard from "./MyBedroomCard";

export default function MyBedroomsList({ action }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-semibold text-base text-[#000000CC]">Hola Usuario</h2>
      <p className="font-semibold text-base text-[#000000CC]">
        Rooms que actualmente rentas
      </p>
      <div className="flex flex-col gap-5 pt-5">
        <MyBedroomCard
          type={"HelloRoom"}
          location={"Direccion"}
          dueDate={"07/10"}
          price={128}
          amenities={"Wifi-Aire acondicionado-Bañera"}
          action={() => {
            action({
              title: "HelloRoom",
              location: "Direccion",
              dueDate: "07 Septiembre",
              price: 128,
              amenities: "Wifi-Aire acondicionado-Bañera",
            });
          }}
        />
        <MyBedroomCard
          type={"HelloStudio"}
          location={"Direccion"}
          dueDate={"07/10"}
          price={128}
          amenities={"Wifi-Aire acondicionado-Bañera"}
          action={() => {
            action({
              title: "HelloRoom",
              location: "Direccion",
              dueDate: "07 Septiembre",
              price: 128,
              amenities: "Wifi-Aire acondicionado-Bañera",
            });
          }}
        />
      </div>
    </section>
  );
}
