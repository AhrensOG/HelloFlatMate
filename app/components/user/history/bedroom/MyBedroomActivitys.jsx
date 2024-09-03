import { useRouter } from "next/navigation";
import ActivityItem from "./my_bedrooms_activity/ActivityItem";

export default function MyBedroomActivitys({ data }) {
  console.log(data);

  const route = useRouter();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[#000000CC] text-base font-bold">
        Actividades de mi dormitorio
      </h2>
      <div className="flex flex-wrap gap-5 items-center justify-around">
        <ActivityItem
          title={"Mis contratos"}
          img={"/my_bedrooms/activitys/md-paper.svg"}
          action={() => {
            route.push("/pages/user/contract/history");
          }}
        />
        <ActivityItem
          title={"Pagos"}
          img={"/my_bedrooms/activitys/dollarsquare.svg"}
          action={() => {
            route.push("/pages/user/history/transactions");
          }}
        />
        <ActivityItem
          title={"Chat propietario"}
          img={"/my_bedrooms/activitys/chat.svg"}
          action={() => {
            route.push("/pages/user/chats");
          }}
        />
        <ActivityItem
          title={"Servicios"}
          img={"/my_bedrooms/activitys/services.svg"}
          action={() => {
            route.push("/pages/user/services/" + data.id);
          }}
        />
        <ActivityItem
          title={"Suministros"}
          img={"/my_bedrooms/activitys/flash.svg"}
          action={() => {
            route.push("/pages/user/supplies/" + data.id);
          }}
        />
        <ActivityItem
          title={"Documentos"}
          img={"/my_bedrooms/activitys/document.svg"}
          action={() => {
            route.push("/pages/user/contract/history");
          }}
        />
      </div>
    </section>
  );
}
