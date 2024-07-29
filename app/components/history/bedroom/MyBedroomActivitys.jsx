import ActivityItem from "./my_bedrooms_activity/ActivityItem";

export default function MyBedroomActivitys() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[#000000CC] text-base font-bold">
        Actividades de mi dormitorio
      </h2>
      <div className="flex flex-wrap gap-5 items-center justify-around">
        <ActivityItem
          title={"Mis contratos"}
          img={"/my_bedrooms/activitys/md-paper.svg"}
        />
        <ActivityItem
          title={"Pagos"}
          img={"/my_bedrooms/activitys/dollarsquare.svg"}
        />
        <ActivityItem
          title={"Chat propietario"}
          img={"/my_bedrooms/activitys/chat.svg"}
        />
        <ActivityItem
          title={"Servicios"}
          img={"/my_bedrooms/activitys/services.svg"}
        />
        <ActivityItem
          title={"Suministros"}
          img={"/my_bedrooms/activitys/flash.svg"}
        />
        <ActivityItem
          title={"Documentos"}
          img={"/my_bedrooms/activitys/document.svg"}
        />
      </div>
    </section>
  );
}
